/** lib-gcd.ts — the Euclidean algorithm, shared by the chapter verifiers
 *  (ch. 7 needs it for the canonical reduced representatives of ℚ). */
export function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b > 0) {
    const r = a % b
    a = b
    b = r
  }
  return a === 0 ? 1 : a // gcd(0,0) → 1 by this book's convention (1 divides everything)
}
