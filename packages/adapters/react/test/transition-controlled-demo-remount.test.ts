import { describe, expect, it, vi } from 'vitest';

import controlledDemo from '../../../../apps/www/src/content/docs/zh-cn/demo-base-transition-controlled.demo';

function mountTransitionNode(host: HTMLElement, state: string) {
  const transition = document.createElement('div');
  transition.className = 'transition-wrapper';
  transition.setAttribute('data-demo-ref', 'transition');
  transition.setAttribute('data-transition-state', state);

  const box = document.createElement('div');
  box.className = 'transition-box';
  transition.appendChild(box);

  host.appendChild(transition);
  return { transition, box };
}

describe('transition controlled demo setup', () => {
  it('keeps autocomplete working after presence remount', async () => {
    const host = document.createElement('div');

    const toggleBtn = document.createElement('div');
    toggleBtn.setAttribute('data-demo-ref', 'toggleBtn');
    host.appendChild(toggleBtn);

    const stateLabel = document.createElement('div');
    stateLabel.setAttribute('data-demo-ref', 'stateLabel');
    host.appendChild(stateLabel);

    const first = mountTransitionNode(host, 'closed');

    document.body.appendChild(host);

    let transitionState: 'closed' | 'entering' | 'entered' | 'leaving' = 'closed';

    const setProps = vi.fn((ref: string, next: Record<string, unknown>) => {
      if (ref !== 'transition') return;
      if (next.open === true) transitionState = 'entering';
      if (next.open === false) transitionState = 'leaving';

      const current = host.querySelector('[data-demo-ref="transition"]') as HTMLElement | null;
      current?.setAttribute('data-transition-state', transitionState);
    });

    const complete = vi.fn(() => {
      if (transitionState === 'entering') transitionState = 'entered';
      else if (transitionState === 'leaving') transitionState = 'closed';

      const current = host.querySelector('[data-demo-ref="transition"]') as HTMLElement | null;
      current?.setAttribute('data-transition-state', transitionState);
    });

    const api = {
      call: vi.fn((ref: string, path: string) => {
        if (ref === 'transition' && path === 'controls.complete') {
          complete();
        }
      }),
      getExposes: vi.fn(() => ({
        transitionState: {
          get: () => transitionState,
        },
      })),
      setProps,
    };

    const cleanup = (controlledDemo as any).setup?.({
      host,
      refs: {
        toggleBtn,
        stateLabel,
        transition: first.transition,
        box: first.box,
      },
      api,
    });

    expect(typeof cleanup).toBe('function');

    toggleBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(setProps).toHaveBeenCalledWith('transition', { open: true });
    expect(transitionState).toBe('entering');

    first.transition.remove();
    const second = mountTransitionNode(host, 'entering');

    second.box.dispatchEvent(new Event('transitionend', { bubbles: true }));
    await Promise.resolve();

    expect(api.call).toHaveBeenCalledWith('transition', 'controls.complete');
    expect(complete).toHaveBeenCalledTimes(1);
    expect(transitionState).toBe('entered');

    (cleanup as () => void)();
    host.remove();
  });
});
