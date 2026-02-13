import { describe, it, expect } from 'vitest';
import type { Prototype, TemplateChildren } from '@proto-ui/core';
import { executeWithHost, RuntimeHost } from '../../src';

describe('contract: runtime / update strict order (v0)', () => {
  it('render happens before commit, and updated callbacks happen after commit', () => {
    const calls: string[] = [];

    const P: Prototype = {
      name: 'x-life-update-order',
      setup(def) {
        def.lifecycle.onUpdated(() => calls.push('updated'));
        return (_r) => {
          calls.push('render');
          return [{ type: 'div', children: ['x'] } as any];
        };
      },
    };

    const host: RuntimeHost<any> = {
      prototypeName: P.name,
      getRawProps: () => ({}),
      commit: (_children: TemplateChildren) => {
        calls.push('commit');
      },
      schedule: (_task) => {},
    };

    const { controller } = executeWithHost(P, host);

    // ignore initial; focus on update
    calls.length = 0;

    controller.update();

    const iRender = calls.indexOf('render');
    const iCommit = calls.indexOf('commit');
    const iUpdated = calls.indexOf('updated');

    expect(iRender).toBeGreaterThanOrEqual(0);
    expect(iCommit).toBeGreaterThanOrEqual(0);
    expect(iUpdated).toBeGreaterThanOrEqual(0);

    expect(iRender).toBeLessThan(iCommit);
    expect(iCommit).toBeLessThan(iUpdated);
  });
});
