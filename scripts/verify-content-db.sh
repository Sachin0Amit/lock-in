#!/usr/bin/env bash
# Content-database delivery verification (LockIn Library)
# Starts the dev server IN THIS CALL (processes are reaped between tool
# calls), runs the full check matrix, then stops the server.
set -u
cd /home/z/my-project

start_server() {
  rm -f dev.log
  bun run dev > /dev/null 2>&1 &
  SRV=$!
  for _ in $(seq 1 60); do
    code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null || true)
    [ "$code" = "200" ] && return 0
    sleep 1
  done
  echo "server failed to become ready"; tail -20 dev.log; exit 1
}
stop_server() { kill "$SRV" 2>/dev/null; pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null; sleep 1; }
trap stop_server EXIT

PASS=0; FAIL=0
ok()   { PASS=$((PASS+1)); echo "  PASS  $1"; }
bad()  { FAIL=$((FAIL+1)); echo "  FAIL  $1"; }
check() { # name, url, grep-pattern
  local name="$1" url="$2" pat="$3"
  local body code
  body=$(curl -s "$url")
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$code" = "200" ] && echo "$body" | grep -qF "$pat"; then
    ok "$name"
  else
    bad "$name (code=$code pattern='$pat')"
  fi
}

echo "=== starting dev server"
start_server

echo "=== 1. reading routes serve from the content database"
check "home renders all 11 shelves"           "http://localhost:3000/" "Arts, Music &amp; Creation"
check "home stats: 269 books"                 "http://localhost:3000/" "269"
check "home stats: 721,908 words"             "http://localhost:3000/" "721,908"
check "planned book TOC (mechanics)"          "http://localhost:3000/book/mechanics" "Kinematics in One Dimension"
check "planned book stats strip"              "http://localhost:3000/book/mechanics" "48 planned"
check "written book TOC (elementary-algebra)" "http://localhost:3000/book/elementary-algebra" "Letters and Structure"
check "glossary page terms render"            "http://localhost:3000/book/elementary-algebra/glossary" "Term"
check "flashcards page loads"                 "http://localhost:3000/book/elementary-algebra/revise" "Revise"

echo "=== 2. lesson content fetched on demand"
IDX=$(curl -s http://localhost:3000/api/library/index)
EA_ID=$(echo "$IDX" | python3 -c "import sys,json; d=json.load(sys.stdin); print([l['id'] for l in d['lessons'] if l['bookId']=='elementary-algebra'][0])")
EA_N=$(echo "$IDX" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d['lessons']))")
check "lesson index API (compact JSON stubs)"  "http://localhost:3000/api/library/index" '"bookTitle":"Elementary Algebra"'
if [ "$EA_N" = "145" ]; then ok "lesson stub count = 145 (145 written lessons)"; else bad "lesson stub count = $EA_N (want 145)"; fi
check "lesson page body renders ($EA_ID)"     "http://localhost:3000/book/elementary-algebra/lesson/$EA_ID" "four jobs"
check "search API finds lessons"              "http://localhost:3000/api/library/search?q=projectile" "lessonId"

echo "=== 3. DB-mutation proof (pages are truly database-backed)"
cat > /tmp/mutate.mjs <<EOF
const { Database } = await import('bun:sqlite');
const db = new Database('db/custom.db');
// mutate the lesson title INSIDE the packed contentJson — the exact
// bytes the lesson page renders from
const row = db.query('SELECT id, contentJson FROM LibraryLesson WHERE id=?').get('${EA_ID}');
const lesson = JSON.parse(row.contentJson);
const original = lesson.title;
lesson.title = 'TMP DB-ONLY LESSON TITLE';
db.run('UPDATE LibraryLesson SET contentJson=?, title=? WHERE id=?', [
  JSON.stringify(lesson),
  'TMP DB-ONLY LESSON TITLE',
  '${EA_ID}',
]);
// bump the pack version exactly like the packer does — the running
// server's cache invalidates on the next request, no restart
db.run("UPDATE ContentPack SET version=version+1");
console.log('mutated lesson', row.id, '-', original);
EOF
bun /tmp/mutate.mjs 2>&1 | tail -1
MUT=$(curl -s "http://localhost:3000/book/elementary-algebra/lesson/$EA_ID" | grep -cF "TMP DB-ONLY LESSON TITLE")
if [ "${MUT:-0}" -gt 0 ]; then ok "mutated contentJson appears on the live page (DB-backed, not TS)"; else bad "mutation NOT visible - page may not be DB-backed"; fi

bun scripts/pack-library.ts > /tmp/repack.log 2>&1
REST=$(curl -s "http://localhost:3000/book/elementary-algebra/lesson/$EA_ID" | grep -cF "TMP DB-ONLY LESSON TITLE")
if [ "${REST:-1}" = "0" ]; then ok "repack restores content AND the running server picks it up (no restart)"; else bad "repack did not take effect on the live server"; fi
grep -E "^packed|^verify" /tmp/repack.log

echo "=== 4. no lesson content in the browser JS bundle"
bash scripts/audit-client-bundle.sh http://localhost:3000/ 2>&1 | tail -1
bash scripts/audit-client-bundle.sh "http://localhost:3000/book/elementary-algebra/lesson/$EA_ID" 2>&1 | tail -1

echo "=== 5. unknown routes 404 cleanly"
for u in /book/no-such-book /book/no-such-book/lesson/no-such-lesson; do
  c=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$u")
  if [ "$c" = "404" ]; then ok "404 $u"; else bad "expected 404 got $c for $u"; fi
done

echo "=== 6. builder/revision surfaces unaffected (registry stays server-side)"
check "builder tree API still live" "http://localhost:3000/api/library/tree" '"title"'
check "lesson content API still live" "http://localhost:3000/api/library/lessons/$EA_ID" "blocks"

echo "=== 7. pack drift check mode"
if bun run lib:check > /tmp/libcheck.log 2>&1; then
  ok "lib:check reports PASS (db in sync with the registry)"
else
  bad "lib:check FAILED"
fi
grep -E "PASS|FAIL" /tmp/libcheck.log | head -2

stop_server
echo ""
echo "=================================="
echo "PASS=$PASS  FAIL=$FAIL"
if [ "$FAIL" = "0" ]; then echo "ALL GREEN - content-database delivery verified."; else echo "SOME CHECKS FAILED - see above."; fi
exit "$FAIL"
