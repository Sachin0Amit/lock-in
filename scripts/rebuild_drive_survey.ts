/**
 * rebuild_drive_survey.ts — rebuild temporary-references/inventory.json
 * (gitignored Drive survey metadata) after a sandbox recycle wipes it.
 * Same method as hourly run 2 (2026-11-03): parse the folder's
 * embeddedfolderview HTML for titles, folder markers and sizes.
 * Run: bun run scripts/rebuild_drive_survey.ts
 */
const FOLDER_ID = '1NI-VN0d6bUt_wciV6k0UCLN8qiqoCRO1'
const OUT = '/home/z/my-project/temporary-references/inventory.json'

const res = await fetch(
  `https://drive.google.com/embeddedfolderview?id=${FOLDER_ID}`,
  { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' } },
)
if (!res.ok) {
  console.error(`embeddedfolderview fetch failed: HTTP ${res.status}`)
  process.exit(1)
}
const html = await res.text()

// Each entry begins with <div class="flip-entry" id="entry-<id>" ...
const chunks = html.split('<div class="flip-entry" id="entry-').slice(1)
const rootItems: { name: string; size: string; id?: string }[] = []
for (const chunk of chunks) {
  const titleMatch = chunk.match(/flip-entry-title">([^<]+)</)
  if (!titleMatch) continue
  const isFolder = /drive-sprite-folder/.test(chunk)
  const sizeMatch = chunk.match(/>([0-9.]+[KMG])</)
  // entry id runs until the next quote; folders carry the subfolder id,
  // files carry the file id — both usable for targeted re-downloads
  const idMatch = chunk.match(/^([^"']+)/)
  const name = titleMatch[1].trim()
  rootItems.push({
    name: isFolder ? `${name} [folder]` : name,
    size: isFolder ? '' : sizeMatch ? sizeMatch[1] : '',
    ...(idMatch ? { id: idMatch[1] } : {}),
  })
}

await Bun.write(OUT, JSON.stringify({ captured: new Date().toISOString().slice(0, 10), source: `https://drive.google.com/drive/folders/${FOLDER_ID}`, rootItems }, null, 2))

const folders = rootItems.filter((i) => i.name.endsWith('[folder]'))
const files = rootItems.filter((i) => !i.name.endsWith('[folder]'))
const khattar = rootItems.find((i) => /khattar/i.test(i.name))
console.log(`entries: ${rootItems.length} (${folders.length} folders, ${files.length} files)`)
console.log(`folders: ${folders.map((f) => f.name.replace(' [folder]', '')).join(', ')}`)
console.log(`khattar: ${khattar ? `${khattar.name} (${khattar.size})` : 'NOT FOUND'}`)
if (rootItems.length !== 89) console.log('WARNING: expected 89 entries like the 2026-11-03 survey')

// mark as a module so tsc allows top-level await under the repo tsconfig
export {}
