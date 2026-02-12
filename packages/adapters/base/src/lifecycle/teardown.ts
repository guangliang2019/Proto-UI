// packages/adapters/base/src/lifecycle/teardown.ts
export function createTeardown() {
  let done = false;
  return {
    run(fn: () => void) {
      if (done) return;
      done = true;
      fn();
    },
    isDone() {
      return done;
    },
  };
}
