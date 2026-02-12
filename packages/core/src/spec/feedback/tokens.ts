// packages/core/src/spec/feedback/tokens.ts

/**
 * Validate a Tailwind-flavored token for feedback v0.
 *
 * Forbidden:
 * - ':' (variants / pseudo / selector)
 * - '&', '>', '#', '.' (selector operators)
 *
 * Allowed:
 * - arbitrary values in brackets: `w-[2px]`, `h-[var(--x)]`
 *   with constraints:
 *   - bracket content MUST NOT contain ':' or whitespace
 */
export function assertTwTokenV0(token: string, ctx?: string): void {
  const where = ctx ? ` (${ctx})` : "";

  if (typeof token !== "string" || !token.trim()) {
    throw new Error(`[feedback] invalid tw token${where}: empty`);
  }

  // Token must be single token (no whitespace)
  if (/\s/.test(token)) {
    throw new Error(
      `[feedback] invalid tw token${where}: contains whitespace: "${token}"`
    );
  }

  // Forbid selector/variant syntax
  const forbidden = [":", "&", ">", "#", "."];
  for (const ch of forbidden) {
    if (token.includes(ch)) {
      throw new Error(
        `[feedback] invalid tw token${where}: forbidden character "${ch}" in "${token}"`
      );
    }
  }

  // Allow bracket arbitrary values with constraints
  const left = token.indexOf("[");
  const right = token.lastIndexOf("]");

  if (left !== -1 || right !== -1) {
    if (!(left !== -1 && right !== -1 && right > left)) {
      throw new Error(
        `[feedback] invalid tw token${where}: malformed bracket in "${token}"`
      );
    }

    const inside = token.slice(left + 1, right);

    if (!inside.length) {
      throw new Error(
        `[feedback] invalid tw token${where}: empty bracket value in "${token}"`
      );
    }

    if (/[\s]/.test(inside)) {
      throw new Error(
        `[feedback] invalid tw token${where}: bracket value contains whitespace in "${token}"`
      );
    }

    if (inside.includes(":")) {
      throw new Error(
        `[feedback] invalid tw token${where}: bracket value contains ":" in "${token}"`
      );
    }
  }
}
