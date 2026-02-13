import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { executeWithHost, RuntimeHost } from '../../src';
import { __RUN_TEST_SYS } from '@proto-ui/modules.test-sys';
import type { TestSysPort } from '@proto-ui/modules.test-sys';

describe('contract: runtime / domain switch at CP0 (v0)', () => {
  it('created callback runs in domain=runtime (setup already exited)', () => {
    const P: Prototype = {
      name: 'x-domain-cp0',
      setup(def) {
        def.lifecycle.onCreated((run: any) => {
          const sys = run[__RUN_TEST_SYS] as TestSysPort | undefined;
          expect(sys).toBeTruthy();
          const snap = sys!.snapshot('created');
          expect(snap.domain).toBe('runtime');
        });
        return () => [{ type: 'div', children: ['x'] } as any];
      },
    };

    const host: RuntimeHost<any> = {
      prototypeName: P.name,
      getRawProps: () => ({}),
      commit: () => {},
      schedule: () => {},
    };

    expect(() => executeWithHost(P, host)).not.toThrow();
  });
});
