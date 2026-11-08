// verify-nav-cdp.ts — CDP check of the symbol navbar at 3 viewports.
// Usage: node scripts/verify-nav-cdp.ts
// Launches its own Chromium (playwright cache) with CDP, then for each
// viewport: navigates, waits, and inspects the primary nav DOM + computed
// styles (icon svg count, label visibility, aria-current on active route).

import { spawn } from 'node:child_process'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = process.env.CHROME_BIN ?? '/home/z/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome'
const PORT = 9333
const BASE = 'http://localhost:3000'

interface Case { name: string; width: number; height: number; path: string }
const CASES: Case[] = [
  { name: 'lg 1280 home', width: 1280, height: 800, path: '/' },
  { name: 'md 800 home', width: 800, height: 800, path: '/' },
  { name: 'lg 1280 revision', width: 1280, height: 800, path: '/revision' },
  { name: 'lg 1280 my-books', width: 1280, height: 800, path: '/my-books' },
  { name: 'lg 1280 builder', width: 1280, height: 800, path: '/builder' },
  { name: 'lg 1280 book page', width: 1280, height: 800, path: '/book/foundation-mathematics' },
]

const userDir = mkdtempSync(join(tmpdir(), 'nav-cdp-'))
const chrome = spawn(CHROME, [
  '--headless=new', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${userDir}`, 'about:blank',
], { stdio: 'ignore' })

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function getWsUrl(): Promise<string> {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const targets = (await res.json()) as Array<{ type: string; webSocketDebuggerUrl: string }>
      const page = targets.find((t) => t.type === 'page')
      if (page) return page.webSocketDebuggerUrl
    } catch { /* retry */ }
    await sleep(250)
  }
  throw new Error('CDP never came up')
}

function cdp(ws: WebSocket) {
  let id = 0
  const pending = new Map<number, { resolve: (v: any) => void; reject: (e: Error) => void }>()
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(String(ev.data))
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)!
      pending.delete(msg.id)
      if (msg.error) reject(new Error(msg.error.message))
      else resolve(msg.result)
    }
  })
  return (method: string, params: Record<string, unknown> = {}) =>
    new Promise<any>((resolve, reject) => {
      const mid = ++id
      pending.set(mid, { resolve, reject })
      ws.send(JSON.stringify({ id: mid, method, params }))
    })
}

async function main() {
  const wsUrl = await getWsUrl()
  const ws = new WebSocket(wsUrl)
  await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej) })
  const send = cdp(ws)
  let failures = 0

  for (const c of CASES) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: c.width, height: c.height, deviceScaleFactor: 1, mobile: false,
    })
    await send('Page.navigate', { url: BASE + c.path })

    // poll until the app header + primary nav actually exist (dev first-compile is slow)
    let rows: any[] = []
    for (let i = 0; i < 40; i++) {
      await sleep(750)
      const { result } = await send('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
          const links = Array.from(document.querySelectorAll('nav[aria-label="Primary"] a'))
          if (links.length === 0) return null
          return links.map((a) => {
            const labelSpan = a.querySelector('span')
            const ls = labelSpan ? getComputedStyle(labelSpan).display : 'none'
            return {
              ariaLabel: a.getAttribute('aria-label'),
              ariaCurrent: a.getAttribute('aria-current'),
              visibleText: a.innerText.trim(),
              labelDisplay: ls,
              hasSvgIcon: !!a.querySelector('svg'),
              cls: a.className.slice(0, 90),
            }
          })
        })()`,
      })
      if (result.value) { rows = result.value; break }
    }
    const navVisible = rows.length === 4
    const allIcons = rows.every((r) => r.hasSvgIcon)
    const labelShown = c.width >= 1024 ? rows.every((r) => r.labelDisplay !== 'none') : rows.every((r) => r.labelDisplay === 'none')
    const active = rows.find((r) => r.ariaCurrent === 'page')
    console.log(`\n== ${c.name} (${c.width}px) ==`)
    for (const r of rows) {
      console.log(`  [${r.ariaCurrent ? '*' : ' '}] ${r.ariaLabel} | text="${r.visibleText}" | label(${r.labelDisplay}) | icon=${r.hasSvgIcon}`)
    }
    console.log(`  navItems=4:${navVisible ? 'PASS' : 'FAIL'} icons:${allIcons ? 'PASS' : 'FAIL'} labelRule(${c.width >= 1024 ? 'shown' : 'hidden'}):${labelShown ? 'PASS' : 'FAIL'} active="${active?.ariaLabel ?? 'NONE'}"`)
    if (!navVisible || !allIcons || !labelShown) failures++
    // expected active per route
    const expectMap: Record<string, string> = {
      '/': 'Academic Library', '/revision': 'Revision Hub', '/my-books': 'My Custom Books',
      '/builder': 'Custom Book Builder', '/book/foundation-mathematics': 'Academic Library',
    }
    const expected = expectMap[c.path]
    const okActive = active?.ariaLabel === expected
    console.log(`  activeCheck(${expected}):${okActive ? 'PASS' : 'FAIL'}`)
    if (!okActive) failures++
  }

  // mobile: nav hidden, hamburger present, menu items have icons
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 800, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: BASE + '/' })
  let mob: any = null
  for (let i = 0; i < 40; i++) {
    await sleep(750)
    const { result } = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const nav = document.querySelector('nav[aria-label="Primary"]')
        const burger = document.querySelector('button[aria-label="Open navigation menu"]')
        if (!burger) return null
        return { navHidden: nav ? getComputedStyle(nav).display === 'none' : true, burger: true }
      })()`,
    })
    if (result.value) { mob = result.value; break }
  }
  mob = mob ?? { navHidden: false, burger: false }
  console.log(`\n== mobile 375 == navHidden:${mob.navHidden ? 'PASS' : 'FAIL'} burger:${mob.burger ? 'PASS' : 'FAIL'}`)
  if (!mob.navHidden || !mob.burger) failures++

  ws.close()
  chrome.kill()
  console.log(failures === 0 ? '\nALL NAV CHECKS PASS' : `\n${failures} CHECK GROUPS FAILED`)
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((e) => { console.error(e); chrome.kill(); process.exit(1) })
