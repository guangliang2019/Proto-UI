import { describe, expect, it } from 'vitest';
import type { RuntimeHost } from '@proto-ui/runtime';
import { executeWithHost } from '@proto-ui/runtime';
import { EVENT_GLOBAL_TARGET_CAP, EVENT_ROOT_TARGET_CAP } from '@proto-ui/modules.event';
import {
  AS_TRIGGER_GET_PROTO_CAP,
  AS_TRIGGER_INSTANCE_CAP,
  AS_TRIGGER_PARENT_CAP,
} from '@proto-ui/modules.as-trigger';
import button from '../src/button';

describe('prototype-libs/shadcn: button', () => {
  it('maps variant/size/disabled props to rule style tokens', () => {
    let rawProps: Record<string, unknown> = {
      variant: 'default',
      size: 'default',
      disabled: false,
    };

    const rootTarget = new EventTarget();
    const globalTarget = new EventTarget();

    const host: RuntimeHost<any> = {
      prototypeName: 'x-shadcn-button-style',
      getRawProps() {
        return rawProps as any;
      },
      commit(_children, signal) {
        signal?.done();
      },
      schedule(task) {
        task();
      },
      onRuntimeReady(wiring) {
        wiring.attach('event', [
          [EVENT_ROOT_TARGET_CAP, () => rootTarget],
          [EVENT_GLOBAL_TARGET_CAP, () => globalTarget],
        ]);
        wiring.attach('as-trigger', [
          [AS_TRIGGER_INSTANCE_CAP, rootTarget],
          [AS_TRIGGER_PARENT_CAP, () => null],
          [AS_TRIGGER_GET_PROTO_CAP, () => null],
        ]);
      },
    };

    const { controller } = executeWithHost(button as any, host as any);

    let tokens = controller.getRuleStyleTokens();
    expect(tokens).toContain('bg-black');
    expect(tokens).toContain('h-9');
    expect(tokens).not.toContain('opacity-50');

    rawProps = { variant: 'destructive', size: 'lg', disabled: true };
    controller.applyRawProps(rawProps as any);
    tokens = controller.getRuleStyleTokens();
    expect(tokens).toContain('bg-red-600');
    expect(tokens).toContain('h-10');
    expect(tokens).toContain('opacity-50');
  });
});
