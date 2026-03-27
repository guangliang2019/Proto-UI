import { defineAsHook, type AnatomyPartView, type RunHandle } from '@proto.ui/core';
import { registerSwitchFamily, SWITCH_FAMILY } from './shared';
import type { SwitchThumbAsHookContract, SwitchThumbExposes, SwitchThumbProps } from './types';

export const asSwitchThumb = defineAsHook<
  SwitchThumbProps,
  SwitchThumbExposes,
  SwitchThumbAsHookContract
>({
  name: 'as-switch-thumb',
  mode: 'once',
  setup(def) {
    registerSwitchFamily(def as any);
    def.anatomy.claim(SWITCH_FAMILY, { role: 'thumb' });
    const checked = def.state.fromAccessibility('checked');

    let rootPart: AnatomyPartView | null = null;
    let rootCheckedOff: (() => void) | null = null;

    def.expose.state('checked', checked);

    def.expose.method('isChecked', () => {
      const rootChecked = rootPart?.getExpose('checked') as { get?: () => boolean } | null;
      if (!rootChecked || typeof rootChecked.get !== 'function') return null;
      return rootChecked.get();
    });

    const syncRoot = (run: RunHandle<SwitchThumbProps>) => {
      rootCheckedOff?.();
      rootCheckedOff = null;
      rootPart = run.anatomy.partsOf(SWITCH_FAMILY, 'root')[0] ?? null;
      const rootChecked = rootPart?.getExpose('checked') as {
        get?: () => boolean;
        subscribe?: (cb: (e: { next: boolean }) => void) => () => void;
        unsubscribe?: (off: () => void) => void;
      } | null;
      checked.set(!!rootChecked?.get?.(), 'reason: switch thumb sync => checked');
      if (rootChecked && typeof rootChecked.subscribe === 'function') {
        const off = rootChecked.subscribe((e) => {
          checked.set(!!e.next, 'reason: switch thumb root checked subscription');
        });
        rootCheckedOff = () => {
          if (typeof rootChecked.unsubscribe === 'function') {
            rootChecked.unsubscribe(off);
            return;
          }
          off();
        };
      }
    };

    def.lifecycle.onMounted((run) => {
      syncRoot(run);
    });

    def.lifecycle.onUpdated((run) => {
      syncRoot(run);
    });

    def.lifecycle.onUnmounted(() => {
      rootCheckedOff?.();
      rootCheckedOff = null;
      rootPart = null;
    });
  },
});
