// packages/adapters/web-component/test/slot-light-dom.test.ts
import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { AdaptToWebComponent } from '@proto-ui/adapters.web-component';

describe('adapter-web-component light DOM slot (v0)', () => {
  it('projects initial light children into slot position; <slot> must not exist in DOM', () => {
    const P: Prototype = {
      name: 'x-light-slot-1',
      setup() {
        return (r) => [r.el('div', [r.r.slot()])];
      },
    };

    AdaptToWebComponent(P); // default: shadow=false (light DOM)

    const el = document.createElement('x-light-slot-1') as any;

    // ✅ initial light children BEFORE connected
    el.innerHTML = `<span>a</span><span>b</span>`;

    document.body.appendChild(el);

    // slot marker must not be rendered as <slot>
    expect(el.querySelector('slot')).toBeNull();

    // projected into template
    expect(el.innerHTML).toBe(`<div><span>a</span><span>b</span></div>`);
  });

  it('keeps correct order around slot (prefix/suffix siblings remain in place)', () => {
    const P: Prototype = {
      name: 'x-light-slot-2',
      setup() {
        return (r) => [r.el('div', [r.el('span', 'prefix'), r.r.slot(), r.el('span', 'suffix')])];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-light-slot-2') as any;
    el.innerHTML = `<em>x</em><strong>y</strong>`;
    document.body.appendChild(el);

    expect(el.querySelector('slot')).toBeNull();
    expect(el.innerHTML).toBe(
      `<div><span>prefix</span><em>x</em><strong>y</strong><span>suffix</span></div>`
    );
  });

  it('supports text nodes in light children pool (not only elements)', () => {
    const P: Prototype = {
      name: 'x-light-slot-3',
      setup() {
        return (r) => [r.el('div', [r.r.slot()])];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-light-slot-3') as any;

    // create a mixed pool: text + element
    el.appendChild(document.createTextNode('hello'));
    el.appendChild(document.createElement('span'));
    el.querySelector('span')!.textContent = 'world';

    document.body.appendChild(el);

    expect(el.querySelector('slot')).toBeNull();
    expect(el.innerHTML).toBe(`<div>hello<span>world</span></div>`);
  });

  it('update() must not duplicate or drop projected light children', async () => {
    const P: Prototype = {
      name: 'x-light-slot-4',
      setup(def) {
        // no props needed; we only test update semantics
        return (r) => [r.el('div', [r.r.slot()])];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-light-slot-4') as any;
    el.innerHTML = `<span>x</span>`;
    document.body.appendChild(el);

    expect(el.innerHTML).toBe(`<div><span>x</span></div>`);

    // call update explicitly
    el.update();
    await Promise.resolve();

    // ✅ must remain exactly one 'x' (no duplication)
    // ✅ must not become empty (no dropping)
    expect(el.innerHTML).toBe(`<div><span>x</span></div>`);
  });

  it('projects new children appended after connected', async () => {
    const P: Prototype = {
      name: 'x-light-slot-mo',
      setup() {
        return (r) => [r.el('div', [r.r.slot()])];
      },
    };

    AdaptToWebComponent(P);
    const el = document.createElement('x-light-slot-mo') as any;
    document.body.appendChild(el);

    // 初始为空：<div></div>
    expect(el.innerHTML).toBe('<div></div>');

    // runtime append
    const s = document.createElement('span');
    s.textContent = 'k';
    el.appendChild(s);

    // MO 是异步触发，等一个 microtask（在 jsdom/vitest 通常够）
    await new Promise<void>((r) => setTimeout(r, 0));

    expect(el.innerHTML).toBe('<div><span>k</span></div>');
  });
});
