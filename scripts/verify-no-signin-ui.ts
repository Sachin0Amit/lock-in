// verify-no-signin-ui.ts — browser-level proof that the sign-in walls are
// gone from the UI. Fresh profile (zero cookies), headless Chromium via CDP.
//
//   /revision  → hub tabs render, no "Sign in to start tracking" wall
//   /my-books  → shelf renders, no redirect to /signin
//   /builder   → compose desk renders, no "sign in to save" hints
//   /book/...  → "Mark studied" works for a guest: chapter chip appears
//   navbar     → no "Sign in" button anywhere
//
// Usage: node --experimental-strip-types scripts/verify-no-signin-ui.ts

import { spawn } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = process.env.CHROME_BIN ?? '/home/z/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome'
const PORT = 9555
const BASE = 'http://localhost:3000'

const userDir = mkdtempSync(join(tmpdir(), 'nosignin-'))
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

let failures = 0
function check(name: string, ok: boolean, detail = '') {
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
  if (!ok) failures++
}

async function waitUntil(send: (m: string, p?: Record<string, unknown>) => Promise<any>, expr: string, ms = 30000) {
  for (let i = 0; i < Math.ceil(ms / 750); i++) {
    await sleep(750)
    const { result } = await send('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: expr })
    if (result.value) return result.value
  }
  return null
}

async function main() {
  const ws = new WebSocket(await getWsUrl())
  await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej) })
  const send = cdp(ws)
  const viewport = (w = 1280, h = 900) => send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false })
  const nav = (path: string) => send('Page.navigate', { url: BASE + path })
  const ev = (expression: string) => send('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression }).then((r) => r.result.value)

  /* ---------- /revision ---------- */
  await viewport()
  await nav('/revision')
  const hub = await waitUntil(send, `(() => {
    const t = document.body.textContent || ''
    return document.querySelectorAll('[role="tab"]').length >= 3 && !t.includes('Sign in to start tracking') ? {
      tabs: Array.from(document.querySelectorAll('[role="tab"]')).map((el) => el.textContent.trim()),
      wall: t.includes('Sign in to start tracking'),
      url: location.pathname,
    } : null
  })()`)
  check('/revision renders the hub (tabs, no sign-in wall)', !!hub, JSON.stringify(hub ?? 'never rendered'))
  check('/revision stayed on /revision (no redirect)', hub?.url === '/revision', `url=${hub?.url}`)

  /* ---------- /my-books ---------- */
  await nav('/my-books')
  const shelf = await waitUntil(send, `(() => {
    const t = document.body.textContent || ''
    const h1 = document.querySelector('h1')?.textContent.trim() ?? ''
    return (h1.includes('My Custom Books') || t.includes('Your shelf is empty')) ? {
      h1, url: location.pathname, signinText: t.includes('Sign in'),
    } : null
  })()`)
  check('/my-books renders the shelf (no redirect)', !!shelf, JSON.stringify(shelf ?? 'never rendered'))
  check('/my-books stayed on /my-books', shelf?.url === '/my-books', `url=${shelf?.url}`)

  /* ---------- /builder ---------- */
  await nav('/builder')
  const builder = await waitUntil(send, `(() => {
    const t = document.body.textContent || ''
    return t.includes('Find matching library lessons') ? {
      url: location.pathname,
      signInToSave: t.includes('sign in to save') || t.includes('Sign in to save') || t.includes('to save books'),
    } : null
  })()`)
  check('/builder renders the compose desk', !!builder, builder ? '' : 'never rendered')
  check('/builder has no "sign in to save" hints', builder && !builder.signInToSave, JSON.stringify(builder))

  /* ---------- navbar: no Sign in button ---------- */
  const navbar = await ev(`(() => {
    const header = document.querySelector('header')
    const links = header ? Array.from(header.querySelectorAll('a, button')).map((el) => (el.textContent || '').trim()) : []
    return JSON.stringify({ hasSignIn: links.some((l) => /sign in/i.test(l)), links: links.filter(Boolean) })
  })()`)
  const navInfo = JSON.parse(navbar)
  check('navbar has no "Sign in" affordance', !navInfo.hasSignIn, JSON.stringify(navInfo.links))

  /* ---------- book page: guest marks a chapter studied ---------- */
  /* clean state first (repeatable runs): unmark via an in-page guest fetch */
  await ev(`fetch('/api/revision/mark', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ items: [{ scope: 'chapter', refId: 'foundation-mathematics:1' }], action: 'unmark' }) }).then(() => true).catch(() => false)`)
  await nav('/book/foundation-mathematics')
  const bookReady = await waitUntil(send, `!!document.querySelector('button') && (document.body.textContent || '').includes('Table of contents')`)
  check('book page renders', !!bookReady)
  /* give hydration time — clicking a pre-hydration button is a silent no-op */
  await sleep(3000)
  const markBtn = await ev(`(() => {
    const b = Array.from(document.querySelectorAll('button')).find((el) => (el.textContent || '').includes('Mark studied'))
    return b ? 'found' : 'missing'
  })()`)
  check('"Mark studied" visible for a guest', markBtn === 'found', `button=${markBtn}`)
  /* the old guest-mode sign-in "sync" link must be gone */
  const syncLink = await ev(`(() => {
    const t = document.body.textContent || ''
    return t.includes('sign in to track') || t.includes('Saved on this device')
  })()`)
  check('no device-local "sync / sign in" fallback text', syncLink === false)

  if (markBtn === 'found') {
    await send('Runtime.evaluate', {
      expression: `(() => {
        const b = Array.from(document.querySelectorAll('button')).find((el) => (el.textContent || '').includes('Mark studied'))
        b.click()
        return true
      })()`,
    })
    /* the authoritative proof: an in-page guest fetch sees the new ledger entry */
    const landed = await waitUntil(send, `fetch('/api/revision/overview').then(r => r.json()).then(j => (j.entries || []).some(e => e.refId === 'foundation-mathematics:1')).catch(() => false)`, 25000)
    check('guest mark lands in the ledger (server-visible entry)', landed === true)
    const chip = await waitUntil(send, `(() => {
      const t = document.body.textContent || ''
      return t.includes('Revise') && t.includes('\\u00d7') ? 'chip' : null
    })()`, 15000)
    check('state chip + Revise control appear on the chapter', chip === 'chip')
  }

  /* ---------- /revision again: guest ledger has entries ---------- */
  await nav('/revision')
  const ledger = await waitUntil(send, `fetch('/api/revision/overview').then(r => r.json()).then(j => Array.isArray(j.entries) && j.entries.length > 0).catch(() => false)`, 25000)
  const hubClean = await waitUntil(send, `(() => {
    const t = document.body.textContent || ''
    return t.includes('Knowledge graph') && !t.includes('Sign in to start tracking') ? true : null
  })()`, 20000)
  check('Revision Hub reflects the guest-marked chapter (server ledger)', ledger === true)
  check('Revision Hub renders for the guest (no wall)', hubClean === true)

  /* ---------- screenshots for the record ---------- */
  await send('Page.captureScreenshot', { format: 'jpeg', quality: 60 })
    .then((r) => {
      writeFileSync('/tmp/render/nosignin-revision.jpg', Buffer.from(r.data, 'base64'))
      console.log('  saved /tmp/render/nosignin-revision.jpg')
    })
    .catch(() => undefined)

  ws.close()
  chrome.kill()
  console.log(failures === 0 ? '\nALL NO-SIGNIN UI CHECKS PASS' : `\n${failures} UI CHECK(S) FAILED`)
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((e) => { console.error(e); chrome.kill(); process.exit(1) })
