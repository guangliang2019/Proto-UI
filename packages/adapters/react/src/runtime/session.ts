import { createAdapterHost, createHostWiring } from '@proto-ui/adapters.base';
import type { CommitSignal } from '@proto-ui/runtime';
import type { Prototype } from '@proto-ui/core';
import type { RawPropsSource } from '@proto-ui/modules.props';
import type { PropsBaseType } from '@proto-ui/types';

export function createReactHostSession<Props extends PropsBaseType>(args: {
  proto: Prototype<Props>;
  schedule: (task: () => void) => void;
  rawPropsSource: RawPropsSource<Props>;
  wiring: ReturnType<typeof createHostWiring>;
  eventGate: {
    disable(): void;
    dispose(): void;
  };
  router: {
    dispose(): void;
  };
  onCommit: (children: any, signal: CommitSignal | null) => void;
  onAfterUnmount?: () => void;
}) {
  const { proto, schedule, rawPropsSource, wiring, eventGate, router, onCommit, onAfterUnmount } =
    args;

  return createAdapterHost(
    proto,
    {
      getRawProps: () => rawPropsSource.get() as Readonly<Props & PropsBaseType>,
      schedule,
      commit: (children, signal) => {
        eventGate.disable();
        onCommit(children, signal ?? null);
      },
    },
    {
      onRuntimeReady: (wiringApi) => {
        wiring.onRuntimeReady(wiringApi);
      },
      onUnmountBegin: () => {
        eventGate.disable();
      },
      afterUnmount: () => {
        wiring.afterUnmount();
        eventGate.dispose();
        router.dispose();
        onAfterUnmount?.();
      },
    }
  );
}
