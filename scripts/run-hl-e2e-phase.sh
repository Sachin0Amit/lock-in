#!/usr/bin/env bash
# run-hl-e2e-phase.sh <phase> — start the dev server if it is down, wait for
# readiness, run one bounded phase of e2e-hl-shelf.sh (the sandbox reaps
# background daemons, so server+checks must live in one invocation).
set -u
PHASE="${1:-all}"
cd /home/z/my-project
code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null)
if [ "$code" != "200" ]; then
  setsid nohup bun run dev > dev.log 2>&1 &
  for i in $(seq 1 60); do
    code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null)
    [ "$code" = "200" ] && break
    sleep 2
  done
fi
echo "server status: $code (phase $PHASE)"
PHASE="$PHASE" bash scripts/e2e-hl-shelf.sh
