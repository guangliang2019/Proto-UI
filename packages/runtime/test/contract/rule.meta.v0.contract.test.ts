import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto.ui/core';
import { tw } from '@proto.ui/core';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import { RULE_META_GET_CAP } from '@proto.ui/module-rule-meta';

describe('runtime contract: rule meta (v0)', () => {
  it('evaluates when.meta using host-provided meta getter', () => {
    const proto: Prototype = {
      name: 'rule-meta-dark-contract',
      setup(def: any) {
        def.rule({
          when: (w: any) => w.meta('colorScheme').eq('dark'),
          intent: (i: any) => i.feedback.style.use(tw('bg-zinc-950')),
        });
        return (r: any) => [r.el('div', {}, ['ok'])];
      },
    } as any;

    let colorScheme: 'light' | 'dark' = 'light';
    const host: RuntimeHost<any> = {
      prototypeName: proto.name,
      getRawProps() {
        return {};
      },
      commit(_children, signal) {
        signal?.done();
      },
      schedule(task) {
        task();
      },
      onRuntimeReady(wiring) {
        wiring.attach('rule-meta', [
          [RULE_META_GET_CAP, (key: string) => (key === 'colorScheme' ? colorScheme : undefined)],
        ]);
      },
    };

    const { controller } = executeWithHost(proto as any, host as any);

    let tokens = controller.getRuleStyleTokens();
    expect(tokens).toEqual([]);

    colorScheme = 'dark';
    tokens = controller.getRuleStyleTokens();
    expect(tokens).toContain('bg-zinc-950');
  });
});
