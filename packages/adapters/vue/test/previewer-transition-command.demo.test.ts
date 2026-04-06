import { describe, expect, it, vi } from 'vitest';
import { VueAny } from './utils/vue';

import { loadPrototypes } from '../../../../apps/www/src/components/PrototypePreviewer/prototype-modules';
import commandDemo from '../../../../apps/www/src/content/docs/zh-cn/demo-base-transition-command.demo';

vi.mock('../../../../apps/www/src/components/PrototypePreviewer/runtimes/vue-runtime', () => ({
  loadVue: vi.fn(async () => VueAny),
}));

async function flushFrames(times = 2) {
  for (let i = 0; i < times; i++) {
    await Promise.resolve();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
  await Promise.resolve();
}

function clickRef(host: HTMLElement, ref: string) {
  const el = host.querySelector(`[data-demo-ref="${ref}"]`) as HTMLElement | null;
  expect(el).not.toBeNull();
  el?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

function getStateLabel(host: HTMLElement) {
  const label = host.querySelector('[data-demo-ref="stateLabel"]') as HTMLElement | null;
  return label?.textContent?.trim() ?? '';
}

describe('PrototypePreviewer demo-renderer / vue command transition', () => {
  it('re-enters from closed with one Enter click', async () => {
    await loadPrototypes(['base-transition']);

    const { renderDemo } =
      await import('../../../../apps/www/src/components/PrototypePreviewer/demo-renderer');

    const host = document.createElement('div');
    document.body.appendChild(host);

    const session = await renderDemo({
      runtime: 'vue',
      demo: commandDemo as any,
      host,
    });

    try {
      await flushFrames(4);

      // Normalize initial appear/open flow: entering -> entered.
      clickRef(host, 'completeBtn');
      await flushFrames(3);
      expect(getStateLabel(host)).toBe('entered');

      // entered -> leaving -> closed, then wait for soft-unmount to settle.
      clickRef(host, 'leaveBtn');
      await flushFrames(3);
      expect(getStateLabel(host)).toBe('leaving');

      clickRef(host, 'completeBtn');
      await flushFrames(6);
      expect(getStateLabel(host)).toBe('closed');

      // A single Enter click should be enough to reach entering.
      clickRef(host, 'enterBtn');

      for (let i = 0; i < 8 && getStateLabel(host) !== 'entering'; i++) {
        await flushFrames(2);
      }

      expect(getStateLabel(host)).toBe('entering');
      expect(host.querySelector('[data-demo-ref="transition"]')).not.toBeNull();
    } finally {
      await session.destroy();
      host.remove();
    }
  });
});
