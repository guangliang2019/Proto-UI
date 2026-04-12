import { describe, expect, it } from 'vitest';
import { definePrototype, type OverlayHandle } from '@proto.ui/core';
import { asOverlay } from '@proto.ui/hooks';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import { BOUNDARY_HOST_BRIDGE_CAP, type BoundaryPort } from '@proto.ui/module-boundary';
import type { OverlayPort } from '@proto.ui/module-overlay';
import type { PropsBaseType } from '@proto.ui/types';

const createHost = <P extends PropsBaseType>(
  name: string,
  options?: {
    onRuntimeReady?: (wiring: {
      attach(moduleName: string, entries: readonly unknown[]): void;
    }) => void;
  }
) => {
  const host: RuntimeHost<P> = {
    prototypeName: name,
    getRawProps: () => ({}) as any,
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      task();
    },
    onRuntimeReady: options?.onRuntimeReady as any,
  };

  return { host };
};

describe('runtime contract: overlay (v0)', () => {
  it('OVERLAY-0100: repeated asOverlay calls reuse one handle and merge configuration', () => {
    let a!: OverlayHandle<any>;
    let b!: OverlayHandle<any>;

    const P = definePrototype({
      name: 'x-overlay-0100',
      setup() {
        a = asOverlay({ placement: 'bottom', defaultOpen: true });
        b = asOverlay({ placement: 'top', closeOnOutsidePress: false });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<OverlayPort>('overlay');

    expect(a).toBe(b);
    expect(port?.isOpen()).toBe(true);
    expect(port?.getConfig()).toMatchObject({
      defaultOpen: true,
      placement: 'top',
      closeOnOutsidePress: false,
      align: 'start',
      restore: 'trigger',
    });
    expect(port?.getWarnings()).toEqual(
      expect.arrayContaining([expect.stringContaining('placement overridden')])
    );
    expect((P as any).__asHooks).toEqual([
      { name: 'asOverlay', order: 0, privileged: true, mode: 'configurable' },
    ]);
  });

  it('OVERLAY-0200: configure is setup-only on overlay handles', () => {
    let overlay!: OverlayHandle<any>;
    let thrown: unknown;

    const P = definePrototype({
      name: 'x-overlay-0200',
      setup(def) {
        overlay = asOverlay();
        def.lifecycle.onCreated(() => {
          try {
            overlay.configure({ placement: 'right' });
          } catch (error) {
            thrown = error;
          }
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);

    expect(thrown).toBeTruthy();
    expect(String(thrown)).toMatch(/setup/i);
  });

  it('OVERLAY-0300: imperative open close toggle updates state and last reason', () => {
    let overlay!: OverlayHandle<any>;

    const P = definePrototype({
      name: 'x-overlay-0300',
      setup(def) {
        overlay = asOverlay();
        def.lifecycle.onCreated(() => {
          overlay.openOverlay('trigger.press');
          overlay.toggle('item.commit');
          overlay.openOverlay('controlled.sync');
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<OverlayPort>('overlay');

    expect(port?.isOpen()).toBe(true);
    expect(port?.getLastReason()).toBe('controlled.sync');
  });

  it('OVERLAY-0400: registration methods retain trigger anchor and content references', () => {
    let overlay!: OverlayHandle<any>;
    const trigger = { id: 'trigger' };
    const anchor = { id: 'anchor' };
    const content = { id: 'content' };

    const P = definePrototype({
      name: 'x-overlay-0400',
      setup() {
        overlay = asOverlay();
        overlay.registerTrigger(trigger);
        overlay.registerAnchor(anchor);
        overlay.registerContent(content);
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<OverlayPort>('overlay');

    expect(port?.getRegistration()).toEqual({
      trigger,
      anchor,
      content,
    });
  });

  it('OVERLAY-0500: boundary outside notifications close an open overlay when closeOnOutsidePress is enabled', () => {
    let overlay!: OverlayHandle<any>;
    const outsider = document.createElement('button');

    const P = definePrototype({
      name: 'x-overlay-0500',
      setup(def) {
        overlay = asOverlay({ closeOnOutsidePress: true, defaultOpen: true });
        def.lifecycle.onMounted(() => {
          overlay.registerTrigger(document.createElement('button'));
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name, {
      onRuntimeReady(wiring) {
        wiring.attach('boundary', [
          [
            BOUNDARY_HOST_BRIDGE_CAP,
            {
              classify({ sample }: any) {
                return sample?.target === outsider ? 'outside' : 'unknown';
              },
            },
          ],
        ]);
      },
    });
    const result = executeWithHost(P as any, host as any);
    const overlayPort = result.caps.getPort<OverlayPort>('overlay');
    const boundaryPort = result.caps.getPort<BoundaryPort>('boundary');

    expect(overlayPort?.isOpen()).toBe(true);
    expect(boundaryPort?.notify({ target: outsider })).toBe('outside');
    expect(overlayPort?.isOpen()).toBe(false);
    expect(overlayPort?.getLastReason()).toBe('outside.press');
  });
});
