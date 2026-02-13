// packages/adapters/web-component/test/event-gate.effectiveness.test.ts
// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { AdaptToWebComponent } from '../src/adapt';

// 1) mock commitChildren：在 commit 期间触发一次 click（此时 gate 还没 enable）
//    commit 返回后，再由测试触发一次 click（此时 gate 应已 enable）
const commitSpy = vi.fn();

vi.mock('../src/commit', () => {
  return {
    commitChildren: (root: any, children: any, opt: any) => {
      commitSpy();

      // 在 commit 执行中、enable 之前，触发一次 click
      // root 可能是 shadowRoot 或 element；这里用 root.host 或 root 自身兜底
      const hostEl: any = (root && (root.host ?? root)) as any;
      if (hostEl && typeof hostEl.dispatchEvent === 'function') {
        hostEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }

      return { hasSlot: false, slotStart: null, slotEnd: null };
    },
  };
});

describe('WC adapter: events become effective only after commit (CP4 boundary)', () => {
  it('native click before enable does NOT invoke proto callback; after commit does', async () => {
    commitSpy.mockClear();

    const calls: string[] = [];

    const tag = `t-event-effective-${Math.random().toString(16).slice(2)}`;

    AdaptToWebComponent(
      {
        name: tag,
        setup(def: any) {
          def.event.on('press.commit', () => calls.push('press.commit'));
          return (r: any) => r.el('div', {}, ['hi']);
        },
      } as any,
      { shadow: false }
    );

    const el = document.createElement(tag);
    document.body.appendChild(el);

    // commit 必须发生
    expect(commitSpy).toHaveBeenCalled();

    // commit 期间那次 click 不应生效
    expect(calls).toEqual([]);

    // commit 完成后再触发一次 click，应生效
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual(['press.commit']);

    document.body.removeChild(el);
  });
});
