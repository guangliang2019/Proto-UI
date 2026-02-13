import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { tw } from '@proto-ui/core';
import { executeWithHost, RuntimeHost } from '../../src';

describe('runtime: feedback.style.setup-only v0', () => {
  it('throws if calling def.feedback.style.use outside setup', () => {
    const proto: Prototype = {
      name: 'test-feedback-setup-only-use-v0',
      setup(def: any) {
        def.lifecycle.onMounted((run: any) => {
          def.feedback.style.use(tw('opacity-50'));
          void run;
        });
        return (r: any) => [r.r.slot()];
      },
    } as any;

    const host = makeTestHost(proto.name);
    expect(() => executeWithHost(proto, host)).toThrow();
  });

  it('throws if calling unUse outside setup', () => {
    let capturedUnUse: null | (() => void) = null;

    const proto: Prototype = {
      name: 'test-feedback-setup-only-unuse-v0',
      setup(def: any) {
        capturedUnUse = def.feedback.style.use(tw('opacity-50'));

        def.lifecycle.onMounted((run: any) => {
          // illegal: calling unUse in callback phase
          capturedUnUse?.();
          void run;
        });

        return (r: any) => [r.r.slot()];
      },
    } as any;

    const host = makeTestHost(proto.name);
    expect(() => executeWithHost(proto, host)).toThrow();
  });
});

function makeTestHost(prototypeName: string): RuntimeHost<any> {
  return {
    prototypeName,
    getRawProps: () => ({}),
    getRenderRead: () =>
      ({
        props: {
          get: () => ({}),
          getRaw: () => ({}),
          isProvided: () => false,
        },
        context: { read: () => undefined, tryRead: () => undefined },
        state: { read: () => undefined },
      }) as any,
    getRunHandle: () =>
      ({
        update: () => {},
        props: {
          get: () => ({}),
          getRaw: () => ({}),
          isProvided: () => false,
        },
        context: { read: () => undefined, tryRead: () => undefined },
        state: { read: () => undefined },
      }) as any,
    commit: () => {},
    schedule: (task) => task(), // run mounted synchronously for contract
  };
}
