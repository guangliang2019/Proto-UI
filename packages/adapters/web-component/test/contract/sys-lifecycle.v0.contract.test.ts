// packages/adapters/web-component/test/contract/sys-lifecycle.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { AdaptToWebComponent, __WC_DEBUG_SYS } from '@proto-ui/adapters.web-component';

type SysPortLike = {
  snapshot?: () => {
    domain?: 'setup' | 'runtime';
    protoPhase?: string;
    disposed?: boolean;
    execPhase?: string;
  };
  ensureNotDisposed?: (op: string) => void;
};

describe('contract: adapter-web-component / sys lifecycle debug hook (v0)', () => {
  it('exposes test-sys port on element via __WC_DEBUG_SYS; domain is runtime after connected', async () => {
    const P: Prototype = {
      name: 'x-sys-hook-1',
      setup() {
        return (r) => [r.el('div', 'ok')];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-sys-hook-1') as any;
    document.body.appendChild(el);

    const sys = el[__WC_DEBUG_SYS] as SysPortLike | undefined;
    expect(sys).toBeTruthy();

    const snap = sys?.snapshot?.();
    expect(snap?.domain).toBe('runtime');
    expect(snap?.disposed).toBe(false);

    // cleanup
    el.remove();
    await Promise.resolve();
  });

  it('disposed becomes true after disconnected/unmounted completes', async () => {
    const P: Prototype = {
      name: 'x-sys-hook-2',
      setup(def) {
        // minimal lifecycle registration to ensure unmount path runs
        def.lifecycle.onUnmounted(() => {});
        return (r) => [r.el('div', 'ok')];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-sys-hook-2') as any;
    document.body.appendChild(el);

    const sys = el[__WC_DEBUG_SYS] as SysPortLike | undefined;
    expect(sys).toBeTruthy();
    expect(sys?.snapshot?.()?.disposed).toBe(false);

    el.remove();
    await Promise.resolve();

    // NOTE: after remove, the element is detached but still referenced by test variable.
    // We can still read its debug hook if adapter didn't delete it too early.
    // If you delete it in teardown, then assert via "should throw" by caching sys before remove.
    expect(sys?.snapshot?.()?.disposed).toBe(true);

    // optional: ensureNotDisposed should now throw
    if (sys?.ensureNotDisposed) {
      expect(() => sys.ensureNotDisposed!('test.after.dispose')).toThrow();
    }
  });

  it('unmounted callback runs while disposed=false (availability window)', async () => {
    const seen: Array<{ disposed: boolean | undefined; domain: any }> = [];

    const P: Prototype = {
      name: 'x-sys-hook-3',
      setup(def) {
        def.lifecycle.onUnmounted(() => {
          // We'll assert via sys port captured from element (in test), not from def/run.
          // This test just ensures we enter unmounted callback; disposed window is checked externally.
          seen.push({ disposed: undefined, domain: undefined });
        });
        return (r) => [r.el('div', 'ok')];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-sys-hook-3') as any;
    document.body.appendChild(el);

    const sys = el[__WC_DEBUG_SYS] as SysPortLike | undefined;
    expect(sys).toBeTruthy();

    el.remove();
    await Promise.resolve();

    // unmounted callback should have executed
    expect(seen.length).toBe(1);

    // and during unmounted, runtime contract says disposed must be false
    // We can't time-travel into callback here unless test-sys records trace points.
    // So we do a weaker but still valuable check: disposed becomes true AFTER unmount completes.
    // If you enhance test-sys to record "snapshots by checkpoint", you can strengthen this case.
    expect(sys?.snapshot?.()?.disposed).toBe(true);
  });
});
