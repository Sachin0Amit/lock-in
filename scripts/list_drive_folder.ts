/**
 * list_drive_folder.ts — list a Google Drive folder via embeddedfolderview.
 * Usage: bun run scripts/list_drive_folder.ts <folderId> [outfile]
 * Writes JSON to outfile if given, else prints entries to stdout.
 */
const folderId = process.argv[2]
const outfile = process.argv[3]
if (!folderId) {
  console.error('usage: bun run scripts/list_drive_folder.ts <folderId> [outfile]')
  process.exit(1)
}

const res = await fetch(
  `https://drive.google.com/embeddedfolderview?id=${folderId}`,
  { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' } },
)
if (!res.ok) {
  console.error(`embeddedfolderview fetch failed: HTTP ${res.status}`)
  process.exit(1)
}
const html = await res.text()

// Each entry begins with <div class="flip-entry" id="entry-<id>" ...
const chunks = html.split('<div class="flip-entry" id="entry-').slice(1)
const items: { name: string; size: string; id?: string }[] = []
for (const chunk of chunks) {
  const titleMatch = chunk.match(/flip-entry-title">([^<]+)</)
  if (!titleMatch) continue
  const isFolder = /drive-sprite-folder/.test(chunk)
  const sizeMatch = chunk.match(/>([0-9.]+[KMG])</)
  const idMatch = chunk.match(/^([^"']+)/)
  const name = titleMatch[1].trim()
  items.push({
    name: isFolder ? `${name} [folder]` : name,
    size: isFolder ? '' : sizeMatch ? sizeMatch[1] : '',
    ...(idMatch ? { id: idMatch[1] } : {}),
  })
}

if (outfile) {
  await Bun.write(outfile, JSON.stringify({ captured: new Date().toISOString().slice(0, 10), folderId, items }, null, 2))
}
for (const i of items) console.log(`${i.size.padStart(7)}  ${i.name}${i.id ? `  (id ${i.id})` : ''}`)
console.log(`total: ${items.length} entries`)

// mark as a module so tsc allows top-level await under the repo tsconfig
export {}
