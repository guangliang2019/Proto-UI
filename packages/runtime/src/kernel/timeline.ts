// packages/runtime/src/kernel/timeline.ts
export type RuntimeCheckpoint =
  | 'setup:end'
  | 'host:ready'
  // cycle-level (repeatable per commit)
  | 'tree:logical-ready'
  | 'commit:begin'
  | 'commit:done'
  | 'instance:reachable'
  | 'afterRenderCommit'
  // instance-level
  | 'proto:mounted'
  | 'mounted:callbacks'
  | 'unmount:begin'
  | 'unmounted:callbacks'
  | 'dispose:done';

export type RuntimeTimeline = {
  mark(cp: RuntimeCheckpoint): void;
};

export function createTimeline(): RuntimeTimeline {
  // instance-level monotonic order
  const instOrder: RuntimeCheckpoint[] = [
    'setup:end',
    'host:ready',
    'proto:mounted',
    'mounted:callbacks',
    'unmount:begin',
    'unmounted:callbacks',
    'dispose:done',
  ];

  // cycle-level order (repeatable)
  const cycleOrder: RuntimeCheckpoint[] = [
    'tree:logical-ready',
    'commit:begin',
    'commit:done',
    'instance:reachable',
    'afterRenderCommit',
  ];

  const instIndex = new Map(instOrder.map((k, i) => [k, i]));
  const cycleIndex = new Map(cycleOrder.map((k, i) => [k, i]));

  let instLast = -1;
  let cycleLast = -1; // -1 means "not started"; 3 means "cycle completed"

  const unmountBeginI = instIndex.get('unmount:begin')!;

  return {
    mark(cp: RuntimeCheckpoint) {
      // disallow any cycle marks after unmount begins
      if (cycleIndex.has(cp)) {
        if (instLast >= unmountBeginI) {
          throw new Error(`[Lifecycle] cycle checkpoint after unmount: ${cp}`);
        }

        const i = cycleIndex.get(cp)!;

        // starting a new cycle must happen only when previous cycle finished (or no cycle yet)
        if (cp === 'tree:logical-ready') {
          if (!(cycleLast === -1 || cycleLast === cycleOrder.length - 1)) {
            throw new Error(
              `[Lifecycle] new cycle started before previous cycle finished: ${cp} after ${cycleOrder[cycleLast]}`
            );
          }
          cycleLast = -1; // reset for new cycle
        }

        if (i <= cycleLast) {
          throw new Error(
            `[Lifecycle] checkpoint out of order (cycle): ${cp} after ${cycleOrder[cycleLast]}`
          );
        }

        cycleLast = i;
        return;
      }

      // instance-level marks
      if (instIndex.has(cp)) {
        const i = instIndex.get(cp)!;

        if (i <= instLast) {
          throw new Error(
            `[Lifecycle] checkpoint out of order (instance): ${cp} after ${instOrder[instLast]}`
          );
        }

        instLast = i;
        return;
      }

      // unknown checkpoint
      throw new Error(`[Lifecycle] unknown checkpoint: ${cp}`);
    },
  };
}
