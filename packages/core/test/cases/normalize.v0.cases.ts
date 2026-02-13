// packages/core/test/cases/normalize.v0.cases.ts
import { normalizeChildren } from '../../src/spec/template';

export type NormalizeCase = {
  name: string;
  run: () => void;
};

export const NORMALIZE_V0_CASES: NormalizeCase[] = [
  {
    name: 'N1: undefined input canonicalizes to null',
    run: () => {
      const out = normalizeChildren(undefined);
      if (out !== null) throw new Error(`Expected null, got ${String(out)}`);
    },
  },

  {
    name: 'N2: null input stays null',
    run: () => {
      const out = normalizeChildren(null);
      if (out !== null) throw new Error(`Expected null, got ${String(out)}`);
    },
  },

  {
    name: 'N3: deep flatten arrays by default',
    run: () => {
      const out = normalizeChildren(['a', ['b', ['c']]]);
      const expected = ['a', 'b', 'c'];
      if (JSON.stringify(out) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(out)}`);
      }
    },
  },

  {
    name: 'N4: null is removed by default (keepNull=false)',
    run: () => {
      const out = normalizeChildren(['a', null, 'b']);
      const expected = ['a', 'b'];
      if (JSON.stringify(out) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(out)}`);
      }
    },
  },

  {
    name: 'N5: all-null array becomes null',
    run: () => {
      const out = normalizeChildren([null, null]);
      if (out !== null) throw new Error(`Expected null, got ${JSON.stringify(out)}`);
    },
  },

  {
    name: 'N6: single child returns that child (not array)',
    run: () => {
      const out = normalizeChildren(['a']);
      if (out !== 'a') throw new Error(`Expected "a", got ${JSON.stringify(out)}`);
    },
  },

  {
    name: 'N7: boolean child throws',
    run: () => {
      let threw = false;
      try {
        normalizeChildren([true as any]);
      } catch {
        threw = true;
      }
      if (!threw) throw new Error(`Expected normalizeChildren([true]) to throw`);
    },
  },

  {
    name: 'N8: undefined child throws',
    run: () => {
      let threw = false;
      try {
        normalizeChildren(['a', undefined as any]);
      } catch {
        threw = true;
      }
      if (!threw) throw new Error(`Expected normalizeChildren(["a", undefined]) to throw`);
    },
  },

  {
    name: 'N9: shallow flatten rejects nested arrays beyond depth=1',
    run: () => {
      let threw = false;
      try {
        normalizeChildren(['a', ['b', ['c']]] as any, { flatten: 'shallow' });
      } catch {
        threw = true;
      }
      if (!threw) throw new Error(`Expected shallow flatten to throw on nested arrays`);
    },
  },

  {
    name: 'N10: flatten=none rejects array children',
    run: () => {
      let threw = false;
      try {
        normalizeChildren(['a'] as any, { flatten: 'none' });
      } catch {
        threw = true;
      }
      if (!threw) throw new Error(`Expected flatten=none to throw on array input`);
    },
  },

  {
    name: 'N11: keepNull=true preserves null inside arrays',
    run: () => {
      const out = normalizeChildren(['a', null, 'b'], { keepNull: true });
      const expected = ['a', null, 'b'];
      if (JSON.stringify(out) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(out)}`);
      }
    },
  },

  {
    name: 'B1: preserves non-null object children (no TemplateNode validation in v0)',
    run: () => {
      const obj = { any: 'thing' };
      const out = normalizeChildren([obj]);
      // @ts-expect-error - v0 does not validate TemplateNode shape
      if (out !== obj) {
        throw new Error(`Expected the same object reference to be preserved.`);
      }
    },
  },

  {
    name: 'B2: preserves object even when it looks like a TemplateNode-ish shape',
    run: () => {
      const nodeLike = { type: 'div', children: 'x' };
      const out = normalizeChildren([nodeLike]);
      if (out !== nodeLike) {
        throw new Error(`Expected the same object reference to be preserved.`);
      }
    },
  },
];
