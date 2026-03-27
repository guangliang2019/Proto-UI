// packages/adapters/web-component/test/contract/lifecycle-wc-adapter.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto.ui/core';
import { AdaptToWebComponent } from '@proto.ui/adapter-web-component';

describe('contract: adapter-web-component / lifecycle (v0)', () => {
  it('created before mounted; mounted scheduled by adapter.schedule', async () => {
    const calls: string[] = [];

    const P: Prototype = {
      name: 'x-wc-life-contract-1',
      setup(def) {
        def.lifecycle.onCreated(() => calls.push('created'));
        def.lifecycle.onMounted(() => calls.push('mounted'));
        return (r) => [r.el('div', 'ok')];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-wc-life-contract-1') as any;
    document.body.appendChild(el);

    // WC adapter default schedule is microtask, but keep it general:
    await Promise.resolve();

    expect(calls[0]).toBe('created');
    expect(calls[1]).toBe('mounted');
  });

  it('disconnected triggers unmounted (adapter must call invokeUnmounted)', async () => {
    const calls: string[] = [];

    const P: Prototype = {
      name: 'x-wc-life-contract-2',
      setup(def) {
        def.lifecycle.onUnmounted(() => calls.push('unmounted'));
        return (r) => [r.el('div', 'ok')];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-wc-life-contract-2') as any;
    document.body.appendChild(el);

    el.remove();
    await Promise.resolve();

    expect(calls.includes('unmounted')).toBe(true);
  });

  it('intra-document synchronous move must not trigger real unmounted/dispose', async () => {
    const calls: string[] = [];

    const P: Prototype = {
      name: 'x-wc-life-contract-3',
      setup(def) {
        def.feedback.style.use({ kind: 'tw', tokens: ['inline-flex'] } as any);
        def.lifecycle.onUnmounted(() => calls.push('unmounted'));
        return (r) => [r.el('div', 'ok')];
      },
    };

    AdaptToWebComponent(P);

    const hostA = document.createElement('div');
    const hostB = document.createElement('div');
    document.body.appendChild(hostA);
    document.body.appendChild(hostB);

    const el = document.createElement('x-wc-life-contract-3') as any;
    hostA.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    hostB.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    expect(calls).toEqual([]);
    expect(el.classList.contains('inline-flex')).toBe(true);

    el.remove();
    await Promise.resolve();
    await Promise.resolve();

    expect(calls).toEqual(['unmounted']);
  });

  it('register=false returns a usable custom element class without auto-defining it', async () => {
    const P: Prototype = {
      name: 'x-wc-life-contract-4',
      setup() {
        return (r) => [r.el('div', 'ok')];
      },
    };

    const tag = 'x-wc-life-contract-4-manual';
    const Ctor = AdaptToWebComponent(P, {
      register: false,
      registerAs: tag,
    });

    expect(customElements.get(tag)).toBeUndefined();

    customElements.define(tag, Ctor);

    const el = document.createElement(tag) as any;
    document.body.appendChild(el);

    await Promise.resolve();

    expect(el.tagName.toLowerCase()).toBe(tag);
  });
});
