// packages/core/src/spec/feedback/tokens.ts

/**
 * Validate a Tailwind-flavored token for feedback v0.
 *
 * Forbidden:
 * - ':' (variants / pseudo / selector)
 *
 * Allowed:
 * - arbitrary values in brackets: `w-[2px]`, `h-[var(--x)]`
 * - decimals / slash tokens / css functions / css variables
 *   as long as token stays a single whitespace-free token and does not
 *   introduce `:` variant syntax.
 */
export function assertTwTokenV0(token: string, ctx?: string): void {
  const where = ctx ? ` (${ctx})` : '';

  if (typeof token !== 'string' || !token.trim()) {
    throw new Error(`[feedback] invalid tw token${where}: empty`);
  }

  // Token must be single token (no whitespace)
  if (/\s/.test(token)) {
    throw new Error(`[feedback] invalid tw token${where}: contains whitespace: "${token}"`);
  }

  // Keep host-selector / variant syntax out of prototype authoring.
  if (token.startsWith('.') || token.startsWith('#')) {
    throw new Error(
      `[feedback] invalid tw token${where}: selector-like token is forbidden in "${token}"`
    );
  }

  if (token.includes(':')) {
    throw new Error(`[feedback] invalid tw token${where}: forbidden character ":" in "${token}"`);
  }

  // Allow bracket arbitrary values with the same "no variant syntax / no
  // whitespace" rule applied to the bracket payload.
  const left = token.indexOf('[');
  const right = token.lastIndexOf(']');

  if (left !== -1 || right !== -1) {
    if (!(left !== -1 && right !== -1 && right > left)) {
      throw new Error(`[feedback] invalid tw token${where}: malformed bracket in "${token}"`);
    }

    const inside = token.slice(left + 1, right);

    if (!inside.length) {
      throw new Error(`[feedback] invalid tw token${where}: empty bracket value in "${token}"`);
    }

    if (/[\s]/.test(inside)) {
      throw new Error(
        `[feedback] invalid tw token${where}: bracket value contains whitespace in "${token}"`
      );
    }

    if (inside.includes(':')) {
      throw new Error(
        `[feedback] invalid tw token${where}: bracket value contains ":" in "${token}"`
      );
    }
  }
}
