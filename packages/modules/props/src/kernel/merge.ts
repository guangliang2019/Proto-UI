// packages/modules/props/src/kernel/merge.ts
import type {
  EmptyBehavior,
  PropsBaseType,
  PropSpec,
  PropsSpecMap,
} from "@proto-ui/types";

export type MergeDiagLevel = "warning" | "error";

export type MergeDiag = {
  level: MergeDiagLevel;
  key?: string;
  message: string;
};

export type MergeResult<P extends PropsBaseType> = {
  specs: PropsSpecMap<P>;
  diags: MergeDiag[];
};

function hasOwn(obj: any, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function isNumberOrUndef(x: any) {
  return x === undefined || (typeof x === "number" && !Number.isNaN(x));
}

function isValidEmptyBehavior(x: any): x is EmptyBehavior {
  return x === "accept" || x === "fallback" || x === "error";
}

function isSupersetEnum(next?: readonly any[], prev?: readonly any[]) {
  if (!prev || prev.length === 0) return true;
  if (!next) return false;
  const set = new Set(next.map(String));
  return prev.every((x) => set.has(String(x)));
}

/**
 * NOTE:
 * The current merge strategy is "incoming must not be stricter".
 * - enum: incoming must be a superset of prev (or equal), else error.
 * - range: incoming must be wider/equal (or omit), else error.
 */
function rangeWider(
  next?: { min?: number; max?: number },
  prev?: { min?: number; max?: number }
) {
  if (!prev) return true;
  if (!next) return false;

  const prevMin = prev.min ?? -Infinity;
  const prevMax = prev.max ?? Infinity;
  const nextMin = next.min ?? -Infinity;
  const nextMax = next.max ?? Infinity;

  // wider/equal means allowing <= prevMin and >= prevMax
  return nextMin <= prevMin && nextMax >= prevMax;
}

function rangeNarrower(
  next?: { min?: number; max?: number },
  prev?: { min?: number; max?: number }
) {
  if (!next) return true; // no next range => not stricter
  if (!prev) return false;

  const prevMin = prev.min ?? -Infinity;
  const prevMax = prev.max ?? Infinity;
  const nextMin = next.min ?? -Infinity;
  const nextMax = next.max ?? Infinity;

  return nextMin > prevMin || nextMax < prevMax;
}

export function mergeSpecs<A extends PropsBaseType, B extends PropsBaseType>(
  base: PropsSpecMap<A>,
  incoming: PropsSpecMap<B>
): MergeResult<A & B> {
  const out: PropsSpecMap<A & B> = { ...base } as PropsSpecMap<A & B>;
  const diags: MergeDiag[] = [];

  for (const key of Object.keys(incoming)) {
    const next = (incoming as any)[key] as PropSpec | undefined;
    const prev = (out as any)[key] as PropSpec | undefined;

    if (!next) continue;

    // -----------------------------
    // v0 minimal spec shape checks
    // -----------------------------
    if (hasOwn(next as any, "empty")) {
      const e = (next as any).empty;
      // explicit undefined is treated as invalid shape
      if (e === undefined || !isValidEmptyBehavior(e)) {
        diags.push({
          level: "error",
          key,
          message: `empty must be one of "fallback" | "accept" | "error"`,
        });
        continue;
      }
    }

    if ((next as any).range) {
      const r = (next as any).range;
      if (!isNumberOrUndef(r.min)) {
        diags.push({
          level: "error",
          key,
          message: `range.min must be a number`,
        });
        continue;
      }
      if (!isNumberOrUndef(r.max)) {
        diags.push({
          level: "error",
          key,
          message: `range.max must be a number`,
        });
        continue;
      }
    }

    // new key => just copy
    if (!prev) {
      (out as any)[key] = { ...(next as any) };
      continue;
    }

    // -----------------------------
    // kind conflict
    // -----------------------------
    const prevKind = (prev as any).kind ?? "any";
    const nextKind = (next as any).kind ?? "any";
    if (prevKind !== nextKind) {
      diags.push({
        level: "error",
        key,
        message: `kind conflict: ${prevKind} vs ${nextKind}`,
      });
      continue;
    }

    // -----------------------------
    // empty behavior merge:
    // - stricter => error
    // - looser => warning + KEEP prev stricter
    // - omit => no-op
    // -----------------------------
    const prevEmpty: EmptyBehavior = ((prev as any).empty ?? "fallback") as any;
    const nextEmpty: EmptyBehavior = ((next as any).empty ?? "fallback") as any;

    const rank = (e: EmptyBehavior) =>
      e === "accept" ? 0 : e === "fallback" ? 1 : 2;

    let mergedEmpty: EmptyBehavior = prevEmpty;

    if (hasOwn(next as any, "empty")) {
      const pr = rank(prevEmpty);
      const nr = rank(nextEmpty);

      if (nr > pr) {
        diags.push({
          level: "error",
          key,
          message: `empty behavior becomes stricter (${prevEmpty} -> ${nextEmpty})`,
        });
        continue;
      }

      if (nr < pr) {
        diags.push({
          level: "warning",
          key,
          message: `empty behavior becomes looser (${prevEmpty} -> ${nextEmpty})`,
        });
        mergedEmpty = prevEmpty; // keep stricter
      } else {
        mergedEmpty = nextEmpty; // equal
      }
    }

    // -----------------------------
    // enum:
    // - require incoming to be superset/equal, else error
    // - if widened => warning
    // -----------------------------
    if ((prev as any).enum || (next as any).enum) {
      const prevEnum = (prev as any).enum as readonly any[] | undefined;
      const nextEnum = (next as any).enum as readonly any[] | undefined;

      if (!isSupersetEnum(nextEnum, prevEnum)) {
        diags.push({
          level: "error",
          key,
          message: `enum becomes stricter (subset)`,
        });
        continue;
      }

      // warn if next strictly wider than prev
      // (i.e. prev is not a superset of next)
      if (!isSupersetEnum(prevEnum, nextEnum)) {
        diags.push({
          level: "warning",
          key,
          message: `enum widened (superset)`,
        });
      }
    }

    // -----------------------------
    // range:
    // - narrower => error
    // - wider => warning
    // -----------------------------
    if ((prev as any).range || (next as any).range) {
      const prevRange = (prev as any).range as
        | { min?: number; max?: number }
        | undefined;
      const nextRange = (next as any).range as
        | { min?: number; max?: number }
        | undefined;

      if (rangeNarrower(nextRange, prevRange)) {
        diags.push({
          level: "error",
          key,
          message: `range becomes stricter (narrower)`,
        });
        continue;
      }

      // warn if next is wider than prev (not just equal)
      if (prevRange && nextRange && !rangeWider(prevRange, nextRange)) {
        diags.push({
          level: "warning",
          key,
          message: `range widened`,
        });
      }
      // If prevRange exists but nextRange omitted, that is not "widened".
      // If prevRange missing and nextRange provided, that's a "new constraint".
      // Current v0 policy does not warn; adjust if you want.
    }

    // -----------------------------
    // validator:
    // - allow add (prev missing, next present)
    // - replacing/removing => error
    // -----------------------------
    const prevHasValidator = !!(prev as any).validator;
    const nextHasValidator = !!(next as any).validator;

    if (!prevHasValidator && nextHasValidator) {
      // allow add
    } else if (prevHasValidator && !nextHasValidator) {
      diags.push({
        level: "error",
        key,
        message: `validator removal is disallowed in merge`,
      });
      continue;
    } else if (
      prevHasValidator &&
      nextHasValidator &&
      (prev as any).validator !== (next as any).validator
    ) {
      diags.push({
        level: "error",
        key,
        message: `validator replacement is disallowed in merge`,
      });
      continue;
    }

    // -----------------------------
    // default:
    // - first-time default allowed
    // - changing default => warning + KEEP prev
    // -----------------------------
    const hasPrevDefault = "default" in (prev as any);
    const hasNextDefault = "default" in (next as any);

    let mergedDefault = (prev as any).default;

    if (!hasPrevDefault && hasNextDefault) {
      mergedDefault = (next as any).default;
    } else if (
      hasPrevDefault &&
      hasNextDefault &&
      (prev as any).default !== (next as any).default
    ) {
      diags.push({
        level: "warning",
        key,
        message: `default overridden in define(); prefer setDefaults()`,
      });
      mergedDefault = (prev as any).default; // keep prev
    }

    // -----------------------------
    // merge output (deterministic)
    // -----------------------------
    const merged: any = {
      ...prev,
      ...next,

      // keep kind stable
      kind: (prev as any).kind,

      // enforced merges
      empty: mergedEmpty,
      enum: (next as any).enum ?? (prev as any).enum,
      range: (next as any).range ?? (prev as any).range,
      validator: (prev as any).validator ?? (next as any).validator,
    };

    // override default deterministically (avoid being overridden by spread)
    if (hasPrevDefault || hasNextDefault) {
      merged.default = mergedDefault;
    }

    (out as any)[key] = merged satisfies PropSpec;
  }

  return { specs: out, diags };
}
