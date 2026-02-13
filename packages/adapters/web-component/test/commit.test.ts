// packages/adapters/web-component/test/commit.test.ts
import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { AdaptToWebComponent } from '@proto-ui/adapters.web-component';

describe('adapter-web-component v0', () => {
  it('renders basic string element and text', () => {
    const P: Prototype = {
      name: 'x-basic',
      setup(def) {
        return (r) => [r.el('div', 'hello')];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-basic') as any;
    document.body.appendChild(el);

    const root = el.shadowRoot ?? el;
    expect(root.innerHTML).toBe('<div>hello</div>');
  });

  it('supports array expansion', () => {
    const P: Prototype = {
      name: 'x-array',
      setup() {
        return (r) => [r.el('span', 'a'), r.el('span', 'b')];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-array') as any;
    document.body.appendChild(el);

    const root = el.shadowRoot ?? el;
    expect(root.innerHTML).toBe('<span>a</span><span>b</span>');
  });

  it('supports slot node', () => {
    const P: Prototype = {
      name: 'x-slot',
      setup() {
        return (r) => [r.r.slot()];
      },
    };

    AdaptToWebComponent(P, { shadow: true }); // ✅ 强制 shadow

    const el = document.createElement('x-slot') as any;
    document.body.appendChild(el);

    const root = el.shadowRoot ?? el;
    expect(root.innerHTML).toBe('<slot></slot>');
  });

  it('lifecycle created/mounted ordering: created before mounted', async () => {
    const calls: string[] = [];

    const P: Prototype = {
      name: 'x-life',
      setup(def) {
        def.lifecycle.onCreated(() => calls.push('created'));
        def.lifecycle.onMounted(() => calls.push('mounted'));
        return (r) => [r.el('div', 'ok')];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-life') as any;
    document.body.appendChild(el);

    // mounted is scheduled via microtask by default
    await Promise.resolve();

    expect(calls[0]).toBe('created');
    expect(calls[1]).toBe('mounted');
  });
});
