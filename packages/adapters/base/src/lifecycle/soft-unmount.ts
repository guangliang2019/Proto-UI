// packages/adapters/base/src/lifecycle/soft-unmount.ts

export function createSoftUnmountScheduler(
  getRootEl: () => HTMLElement | null,
  onApplyUnmount: () => void
): { schedule(): Promise<void>; cancel(): void } {
  let pending: { cancel: () => void } | null = null;

  const cancel = () => {
    const current = pending;
    pending = null;
    current?.cancel();
  };

  const schedule = (): Promise<void> => {
    cancel();

    return new Promise<void>((resolve) => {
      const rootEl = getRootEl();
      if (!rootEl) {
        onApplyUnmount();
        resolve();
        return;
      }

      let finished = false;
      let sawMotionSignal = false;
      let pendingTransitions = 0;
      let pendingAnimations = 0;
      let firstRaf: number | null = null;
      let secondRaf: number | null = null;

      const cleanup = () => {
        rootEl.removeEventListener('transitionrun', onTransitionRun, true);
        rootEl.removeEventListener('transitionend', onTransitionDone, true);
        rootEl.removeEventListener('transitioncancel', onTransitionDone, true);
        rootEl.removeEventListener('animationstart', onAnimationStart, true);
        rootEl.removeEventListener('animationend', onAnimationDone, true);
        rootEl.removeEventListener('animationcancel', onAnimationDone, true);
        if (firstRaf != null) {
          cancelAnimationFrame(firstRaf);
          firstRaf = null;
        }
        if (secondRaf != null) {
          cancelAnimationFrame(secondRaf);
          secondRaf = null;
        }
      };

      const finish = (applyUnmount: boolean) => {
        if (finished) return;
        finished = true;
        cleanup();
        if (pending === token) {
          pending = null;
        }
        if (applyUnmount) {
          onApplyUnmount();
        }
        resolve();
      };

      const isFromTree = (target: EventTarget | null) =>
        target instanceof Node && rootEl.contains(target);

      const tryFinishMotion = () => {
        if (sawMotionSignal && pendingTransitions <= 0 && pendingAnimations <= 0) {
          finish(true);
        }
      };

      const onTransitionRun = (e: Event) => {
        if (!isFromTree(e.target)) return;
        sawMotionSignal = true;
        pendingTransitions++;
      };

      const onTransitionDone = (e: Event) => {
        if (!isFromTree(e.target)) return;
        if (pendingTransitions > 0) pendingTransitions--;
        tryFinishMotion();
      };

      const onAnimationStart = (e: Event) => {
        if (!isFromTree(e.target)) return;
        sawMotionSignal = true;
        pendingAnimations++;
      };

      const onAnimationDone = (e: Event) => {
        if (!isFromTree(e.target)) return;
        if (pendingAnimations > 0) pendingAnimations--;
        tryFinishMotion();
      };

      const captureActiveAnimations = () => {
        const getAnimations = (
          rootEl as HTMLElement & { getAnimations?: (opt?: unknown) => Animation[] }
        ).getAnimations;
        if (typeof getAnimations !== 'function') return;

        let animations: Animation[] = [];
        try {
          animations = getAnimations.call(rootEl, { subtree: true });
        } catch {
          try {
            animations = getAnimations.call(rootEl);
          } catch {
            animations = [];
          }
        }

        for (const animation of animations) {
          if (animation.playState === 'finished' || animation.playState === 'idle') continue;
          sawMotionSignal = true;
          pendingAnimations++;
          animation.finished.then(
            () => {
              if (pendingAnimations > 0) pendingAnimations--;
              tryFinishMotion();
            },
            () => {
              if (pendingAnimations > 0) pendingAnimations--;
              tryFinishMotion();
            }
          );
        }
      };

      rootEl.addEventListener('transitionrun', onTransitionRun, true);
      rootEl.addEventListener('transitionend', onTransitionDone, true);
      rootEl.addEventListener('transitioncancel', onTransitionDone, true);
      rootEl.addEventListener('animationstart', onAnimationStart, true);
      rootEl.addEventListener('animationend', onAnimationDone, true);
      rootEl.addEventListener('animationcancel', onAnimationDone, true);

      // Capture already-running motions (e.g. interrupting entering -> leaving -> complete)
      // so unmount does not miss the tail animation if no new transitionrun is emitted.
      captureActiveAnimations();

      firstRaf = requestAnimationFrame(() => {
        firstRaf = null;
        secondRaf = requestAnimationFrame(() => {
          secondRaf = null;
          if (!sawMotionSignal) {
            finish(true);
            return;
          }
          tryFinishMotion();
        });
      });

      const token = { cancel: () => finish(false) };
      pending = token;
    });
  };

  return { schedule, cancel };
}
