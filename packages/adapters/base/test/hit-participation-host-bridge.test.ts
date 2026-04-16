import { describe, expect, it } from 'vitest';
import {
  __HIT_PARTICIPATION_MODE_MARK,
  createWebHitParticipationHostBridge,
} from '@proto.ui/module-hit-participation';

describe('module-hit-participation: web host bridge', () => {
  it('HIT-ADAPTER-0100: disabled regions are projected to host pointer-events none', () => {
    const bridge = createWebHitParticipationHostBridge();
    const el = document.createElement('div') as unknown as HTMLElement & Record<symbol, unknown>;

    bridge.sync({
      config: { mode: 'disabled' },
      regions: [{ target: el, role: 'content' as any, mode: 'disabled' }],
    });

    expect(el.style.pointerEvents).toBe('none');
    expect(el[__HIT_PARTICIPATION_MODE_MARK]).toBe('disabled');
  });

  it('HIT-ADAPTER-0200: passthrough remains distinguishable from disabled at the host bridge layer', () => {
    const bridge = createWebHitParticipationHostBridge();
    const el = document.createElement('div') as unknown as HTMLElement & Record<symbol, unknown>;

    bridge.sync({
      config: { mode: 'passthrough' },
      regions: [{ target: el, role: 'content' as any, mode: 'passthrough' }],
    });

    expect(el.style.pointerEvents).toBe('none');
    expect(el[__HIT_PARTICIPATION_MODE_MARK]).toBe('passthrough');
  });

  it('HIT-ADAPTER-0300: participating restores the previous host pointer-events value', () => {
    const bridge = createWebHitParticipationHostBridge();
    const el = document.createElement('div') as unknown as HTMLElement & Record<symbol, unknown>;
    el.style.pointerEvents = 'auto';

    bridge.sync({
      config: { mode: 'disabled' },
      regions: [{ target: el, role: 'content' as any, mode: 'disabled' }],
    });
    bridge.sync({
      config: { mode: 'participating' },
      regions: [{ target: el, role: 'content' as any, mode: 'participating' }],
    });

    expect(el.style.pointerEvents).toBe('auto');
    expect(el[__HIT_PARTICIPATION_MODE_MARK]).toBe('participating');
  });

  it('HIT-ADAPTER-0400: removing a region clears the previously projected host state', () => {
    const bridge = createWebHitParticipationHostBridge();
    const el = document.createElement('div') as unknown as HTMLElement & Record<symbol, unknown>;

    bridge.sync({
      config: { mode: 'disabled' },
      regions: [{ target: el, role: 'content' as any, mode: 'disabled' }],
    });
    bridge.sync({
      config: { mode: 'participating' },
      regions: [],
    });

    expect(el.style.pointerEvents).toBe('');
    expect(el[__HIT_PARTICIPATION_MODE_MARK]).toBeUndefined();
  });

  it('HIT-ADAPTER-0500: non-host targets are ignored instead of crashing the bridge', () => {
    const bridge = createWebHitParticipationHostBridge();

    expect(() =>
      bridge.sync({
        config: { mode: 'disabled' },
        regions: [{ target: { opaque: true }, role: 'content' as any, mode: 'disabled' }],
      })
    ).not.toThrow();
  });
});
