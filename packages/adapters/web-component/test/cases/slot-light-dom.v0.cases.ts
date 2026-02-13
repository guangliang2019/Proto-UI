// packages/adapters/web-component/test/cases/slot-light-dom.v0.cases.ts

import type { Prototype } from '@proto-ui/core';
import { AdaptToWebComponent } from '@proto-ui/adapters.web-component';

export type LightSlotCase = {
  name: string;
  run: () => Promise<void> | void;
};

function flushMacroTask(): Promise<void> {
  return new Promise((r) => setTimeout(r, 0));
}

export const LIGHT_SLOT_V0_CASES: LightSlotCase[] = [
  {
    name: 'G1: projects initial light children into slot; no <slot> in DOM',
    run: () => {
      const P: Prototype = {
        name: 'x-contract-light-slot-1',
        setup() {
          return (r) => [r.el('div', [r.r.slot()])];
        },
      };

      AdaptToWebComponent(P);

      const el = document.createElement('x-contract-light-slot-1') as any;
      el.innerHTML = `<span>a</span><span>b</span>`;
      document.body.appendChild(el);

      if (el.querySelector('slot')) {
        throw new Error('Expected no <slot> element in Light DOM.');
      }

      const got = el.innerHTML;
      const expected = `<div><span>a</span><span>b</span></div>`;
      if (got !== expected) {
        throw new Error(`Expected ${expected}, got ${got}`);
      }
    },
  },

  {
    name: 'G2: keeps correct order around slot (prefix/suffix)',
    run: () => {
      const P: Prototype = {
        name: 'x-contract-light-slot-2',
        setup() {
          return (r) => [r.el('div', [r.el('span', 'prefix'), r.r.slot(), r.el('span', 'suffix')])];
        },
      };

      AdaptToWebComponent(P);

      const el = document.createElement('x-contract-light-slot-2') as any;
      el.innerHTML = `<em>x</em><strong>y</strong>`;
      document.body.appendChild(el);

      const expected =
        `<div><span>prefix</span>` + `<em>x</em><strong>y</strong>` + `<span>suffix</span></div>`;

      if (el.innerHTML !== expected) {
        throw new Error(`Expected ${expected}, got ${el.innerHTML}`);
      }
    },
  },

  {
    name: 'G3: supports text nodes in light children pool',
    run: () => {
      const P: Prototype = {
        name: 'x-contract-light-slot-3',
        setup() {
          return (r) => [r.el('div', [r.r.slot()])];
        },
      };

      AdaptToWebComponent(P);

      const el = document.createElement('x-contract-light-slot-3') as any;
      el.appendChild(document.createTextNode('hello'));
      const s = document.createElement('span');
      s.textContent = 'world';
      el.appendChild(s);

      document.body.appendChild(el);

      const expected = `<div>hello<span>world</span></div>`;
      if (el.innerHTML !== expected) {
        throw new Error(`Expected ${expected}, got ${el.innerHTML}`);
      }
    },
  },

  {
    name: 'G4: update() must not duplicate or drop projected children',
    run: async () => {
      const P: Prototype = {
        name: 'x-contract-light-slot-4',
        setup() {
          return (r) => [r.el('div', [r.r.slot()])];
        },
      };

      AdaptToWebComponent(P);

      const el = document.createElement('x-contract-light-slot-4') as any;
      el.innerHTML = `<span>x</span>`;
      document.body.appendChild(el);

      const expected = `<div><span>x</span></div>`;
      if (el.innerHTML !== expected) {
        throw new Error(`Expected ${expected}, got ${el.innerHTML}`);
      }

      el.update();
      // update scheduling is adapter-defined; still we wait a microtask to be safe
      await Promise.resolve();

      if (el.innerHTML !== expected) {
        throw new Error(`Expected ${expected} after update, got ${el.innerHTML}`);
      }
    },
  },

  {
    name: 'G5: projects new direct children appended after connected (MO; macro task)',
    run: async () => {
      const P: Prototype = {
        name: 'x-contract-light-slot-5',
        setup() {
          return (r) => [r.el('div', [r.r.slot()])];
        },
      };

      AdaptToWebComponent(P);

      const el = document.createElement('x-contract-light-slot-5') as any;
      document.body.appendChild(el);

      // after connected: user appends a new node to host element
      const k = document.createElement('span');
      k.textContent = 'k';
      el.appendChild(k);

      // MO callback is not guaranteed to run in microtask; use macro task flush
      await flushMacroTask();

      const expected = `<div><span>k</span></div>`;
      if (el.innerHTML !== expected) {
        throw new Error(`Expected ${expected}, got ${el.innerHTML}`);
      }
    },
  },
];
