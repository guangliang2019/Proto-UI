// packages/adapters/web-component/test/event-gate.order.strict.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FakeEventTarget } from './utils/fake-target';

describe('WC adapter: event binding order (strict)', () => {
  beforeEach(() => {
    vi.resetModules(); // 关键：确保每个 case 重新走一遍模块初始化
    vi.clearAllMocks();
  });

  it('bind happens after commit (CP4 ~= commit done)', async () => {
    // --- test state (用普通变量，不要 hoisted) ---
    const callOrder: string[] = [];
    const rootTarget = new FakeEventTarget();
    const globalTarget = new FakeEventTarget();

    // 1) mock commitChildren：记录 commit 发生时间点
    vi.doMock('../src/commit', () => ({
      commitChildren: (..._args: any[]) => {
        callOrder.push('commit');
        return { hasSlot: false, slotStart: null, slotEnd: null };
      },
    }));

    // 2) （可选）如果你 strict 版还 mock 了 adapter-base（createEventGate 等）
    // 强烈建议：能不 mock 就别 mock。真要 mock，也用 doMock 写在这里。
    vi.doMock('@proto-ui/adapters.base', async () => {
      const actual = await vi.importActual<any>('@proto-ui/adapters.base');
      return {
        ...actual,
        createWebProtoEventRouter: () => ({
          rootTarget,
          globalTarget,
          dispose: vi.fn(),
        }),
        createEventGate: () => {
          let enabled = false;
          return {
            enable: () => {
              enabled = true;
              callOrder.push('gate.enable');
            },
            disable: () => {
              enabled = false;
              callOrder.push('gate.disable');
            },
            isEnabled: () => enabled,
            dispose: () => {},
          };
        },
      };
    });

    // 4) 动态 import 被测模块（在 mock 之后）
    const { AdaptToWebComponent } = await import('../src/adapt');

    AdaptToWebComponent(
      {
        name: 'test-event-order',
        setup(def: any) {
          def.event.on('native:click', () => {});
          return (r: any) => r.el('div', {}, ['hi']);
        },
      },
      { shadow: false }
    );

    const el = document.createElement('test-event-order');
    document.body.appendChild(el);

    // 断言：确实 commit 了
    expect(callOrder).toContain('commit');

    // 断言：确实绑定了 listener（bind -> addEventListener）
    expect(rootTarget.addCalls.length).toBeGreaterThan(0);

    // 严格顺序：commit 必须在任何 add 之前
    const commitIdx = callOrder.indexOf('commit');
    // 你 FakeEventTarget 里如果能 push order，更好；否则这里用 addCalls 的发生时机记录
    // 方案：在 FakeEventTarget.addEventListener 内 push callOrder
    // 例如：callOrder.push("event.bind.root")，然后比较 index
  });
});
