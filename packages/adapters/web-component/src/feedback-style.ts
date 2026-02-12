// packages/adapters/web-component/src/feedback-style.ts
import { mergeTwTokensV0 } from "@proto-ui/core";

const KEY = "__proto_ui_applied_style_tokens_v0__";

/**
 * v0: map style tokens -> host classList (Tailwind runtime).
 * It only removes classes previously applied by us.
 */
export function applyStyleTokensToHost(el: HTMLElement, tokens: string[]) {
  // optional defensive merge (can remove if upstream guarantees merged)
  const merged = mergeTwTokensV0(tokens).tokens;

  const prev: string[] = (el as any)[KEY] ?? [];
  const prevSet = new Set(prev);
  const nextSet = new Set(merged);

  for (const t of prevSet) if (!nextSet.has(t)) el.classList.remove(t);
  for (const t of nextSet) if (!prevSet.has(t)) el.classList.add(t);

  (el as any)[KEY] = merged;
}

export function applyFeedbackStyleTokensToHost(
  el: HTMLElement,
  tokens: string[]
): () => void {
  const pre = new Set<string>();
  for (const c of Array.from(el.classList)) pre.add(c);

  const addedByAdapter: string[] = [];

  for (const t of tokens) {
    if (!t) continue;
    if (!pre.has(t) && !el.classList.contains(t)) {
      el.classList.add(t);
      addedByAdapter.push(t);
    }
  }

  return () => {
    for (const t of addedByAdapter) {
      el.classList.remove(t);
    }
  };
}

export type OwnedTokenApplier = {
  /**
   * Replace adapter-owned tokens on host element.
   * - does not touch non-owned classes
   * - stable, idempotent
   */
  apply(nextTokens: string[]): void;

  /** Remove all owned tokens from host */
  clear(): void;

  /** For tests / debugging */
  getOwned(): ReadonlySet<string>;
};

/**
 * Create an applier that manages adapter-owned Tailwind-style tokens on host element.
 *
 * Contract:
 * - Only operates on owned tokens it previously applied
 * - Never removes user classes
 * - `apply([])` removes all previously owned tokens
 */
export function createOwnedTwTokenApplier(
  host: HTMLElement
): OwnedTokenApplier {
  let owned = new Set<string>();

  const apply = (nextTokens: string[]) => {
    // Normalize input (defensive): remove empties, dedupe but preserve first order
    const nextList: string[] = [];
    const nextSet = new Set<string>();
    for (const t of nextTokens) {
      const tok = (t ?? "").trim();
      if (!tok) continue;
      if (nextSet.has(tok)) continue;
      nextSet.add(tok);
      nextList.push(tok);
    }

    // Remove tokens that are no longer present
    for (const tok of owned) {
      if (!nextSet.has(tok)) {
        host.classList.remove(tok);
      }
    }

    // Add new tokens
    for (const tok of nextList) {
      if (!owned.has(tok)) {
        host.classList.add(tok);
      }
    }

    owned = nextSet;
  };

  const clear = () => {
    for (const tok of owned) host.classList.remove(tok);
    owned = new Set<string>();
  };

  const getOwned = () => owned;

  return { apply, clear, getOwned };
}
