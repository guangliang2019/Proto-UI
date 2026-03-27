import { createAdapterHost, createHostWiring } from '@proto.ui/adapter-base';
import type { Prototype, TemplateChildren } from '@proto.ui/core';
import { type RawPropsSource } from '@proto.ui/module-props';
import { type PropsBaseType } from '@proto.ui/types';

import { commitChildren } from '../commit';
import { SlotProjector } from '../slot-projector';

export function createWebComponentHostSession<Props extends PropsBaseType>(args: {
  proto: Prototype<Props>;
  tagName: string;
  shadow: boolean;
  host: HTMLElement;
  root: Element | ShadowRoot;
  schedule: (task: () => void) => void;
  rawPropsSource: RawPropsSource<Props>;
  wiring: ReturnType<typeof createHostWiring>;
  eventGate: {
    enable(): void;
    disable(): void;
    dispose(): void;
  };
  router: {
    dispose(): void;
  };
  getSlotProjector: () => SlotProjector | null;
  ensureSlotProjector: () => SlotProjector;
  clearSlotProjector: () => void;
  onAfterUnmount?: () => void;
}) {
  const {
    proto,
    tagName,
    shadow,
    root,
    schedule,
    rawPropsSource,
    wiring,
    eventGate,
    router,
    getSlotProjector,
    ensureSlotProjector,
    clearSlotProjector,
    onAfterUnmount,
  } = args;

  let capsHub: any = null;

  const hostSession = createAdapterHost(
    { ...proto, name: tagName },
    {
      getRawProps: () => rawPropsSource.get() as Readonly<Props & PropsBaseType>,
      schedule,
      commit: (children, signal) => {
        commitWebComponentChildren({
          root,
          children,
          shadow,
          eventGate,
          getSlotProjector,
          ensureSlotProjector,
          clearSlotProjector,
        });
        signal?.done();
      },
    },
    {
      onRuntimeReady: (wiringApi) => {
        wiring.onRuntimeReady(wiringApi);
      },
      onUnmountBegin: () => {
        eventGate.disable();
        clearSlotProjector();
      },
      afterUnmount: () => {
        try {
          const port = (capsHub as any).getPort?.('test-sys');
          port?.trace?.('after-unmount');
        } catch {}

        wiring.afterUnmount();
        eventGate.dispose();
        router.dispose();
        clearSlotProjector();
        onAfterUnmount?.();
      },
    }
  );

  capsHub = hostSession.caps;
  return hostSession;
}

function commitWebComponentChildren(args: {
  root: Element | ShadowRoot;
  children: TemplateChildren;
  shadow: boolean;
  eventGate: { enable(): void };
  getSlotProjector: () => SlotProjector | null;
  ensureSlotProjector: () => SlotProjector;
  clearSlotProjector: () => void;
}) {
  const {
    root,
    children,
    shadow,
    eventGate,
    getSlotProjector,
    ensureSlotProjector,
    clearSlotProjector,
  } = args;

  if (shadow) {
    commitChildren(root as any, children, { mode: 'shadow' });
    clearSlotProjector();
    eventGate.enable();
    return;
  }

  if (isSlotOnly(children)) {
    clearSlotProjector();
    eventGate.enable();
    return;
  }

  const projector = getSlotProjector() ?? ensureSlotProjector();
  const slotPool = projector.collectSlotPoolBeforeCommit();
  const owned = new WeakSet<Node>();

  const result = commitChildren(root as any, children, {
    mode: 'light',
    slotPool,
    owned,
  });

  projector.afterCommit({
    owned,
    slotStart: result.slotStart,
    slotEnd: result.slotEnd,
    projected: slotPool,
    enableMO: result.hasSlot,
  });

  if (!result.hasSlot) {
    clearSlotProjector();
  }

  eventGate.enable();
}

function isSlotOnly(children: TemplateChildren): boolean {
  if (children == null) return false;

  const one = Array.isArray(children) ? (children.length === 1 ? children[0] : null) : children;
  if (!one || typeof one !== 'object') return false;

  const type = (one as any).type;
  return !!type && typeof type === 'object' && type.kind === 'slot';
}
