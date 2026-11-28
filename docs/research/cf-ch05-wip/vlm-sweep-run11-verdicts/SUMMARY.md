# CS RUN 11 — ch.5 VLM light+dark sweep verdicts (68 crops, 34 figures x 2 themes)

Method: sweep_vlm_cs11c.sh (reload + hydration-stability wait + show-solution
buttons clicked ONCE — the run-11 discovery that the button label does not
toggle, so a re-query loop re-collapses the solutions; then ALL figure svgs
tagged, body + solution figures both render inside <figure>). Audit executed
by four vision-model subagents (the sandbox z-ai vision endpoint 404s and the
SDK chat route 409s "no active turn" — the sanctioned fallback), one per
lesson; lesson 5.3's seat died on the context wall and was retried SPLIT on
the fast tier (A3a light + A3b dark) per the staged-seats law.

- 5.1 cf-system-software-the-manager-layer: 18/18 PASS — OVERALL PASS.
- 5.2 cf-application-software-the-worker-families: 30/32 PASS — OVERALL FAIL.
  Real defects (theme-independent, same rendering both themes), figure index 1
  (cf52UniformsSvg, the device-uniforms figure):
  D1 mobile panel: caption "a worker in your pocket" (~110px at 9.5px font)
    overflows the ~61px phone body ~25px each side; both phone outline strokes
    cross the words "worker" and "pocket".
  D2 desktop panel: caption "a window of your own" fills the 100px monitor
    screen edge-to-edge; final "n" of "own" overlaps the right border stroke.
  Source: ch-05.ts cf52UniformsSvg + the part-cf52.ts twin.
- 5.3 cf-installing-updating-and-licensing-honestly: 18/18 PASS (light 9/9,
  dark 9/9) — OVERALL PASS.
- 5.R cf-unit-5-completion-review: 16/16 PASS — OVERALL PASS.

Fix duty: FIX_QUEUE_11A (run 11, in-run): fix cf52UniformsSvg at part level +
mirror into the ch-05.ts twin, re-assemble, re-verify, re-audit the one figure.
