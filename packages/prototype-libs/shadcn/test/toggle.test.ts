import { describe, expect, it } from 'vitest';
import type { RuntimeHost } from '@proto-ui/runtime';
import { executeWithHost } from '@proto-ui/runtime';
import { EVENT_GLOBAL_TARGET_CAP, EVENT_ROOT_TARGET_CAP } from '@proto-ui/modules.event';
import {
  AS_TRIGGER_GET_PROTO_CAP,
  AS_TRIGGER_INSTANCE_CAP,
  AS_TRIGGER_PARENT_CAP,
} from '@proto-ui/modules.as-trigger';
import toggle from '../src/toggle';

describe('prototype-libs/shadcn: toggle', () => {
  it('maps variant, size, checked and disabled to style tokens', () => {
    let rawProps: Record<string, unknown> = {
      variant: 'default',
      size: 'default',
      defaultChecked: false,
      disabled: false,
    };

    const rootTarget = new EventTarget();
    const globalTarget = new EventTarget();

    const host: RuntimeHost<any> = {
      prototypeName: 'x-shadcn-toggle-style',
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

    const { controller } = executeWithHost(toggle as any, host as any);

    let tokens = controller.getRuleStyleTokens();
    expect(tokens).toContain('h-9');
    expect(tokens).toContain('bg-transparent');

    rootTarget.dispatchEvent(new CustomEvent('press.commit'));
    tokens = controller.getRuleStyleTokens();
    expect(tokens).toContain('bg-muted');

    rawProps = { variant: 'outline', size: 'sm', defaultChecked: false, disabled: true };
    controller.applyRawProps(rawProps as any);
    tokens = controller.getRuleStyleTokens();
    expect(tokens).toContain('border-border');
    expect(tokens).toContain('h-8');
    expect(tokens).toContain('opacity-50');
  });
});
