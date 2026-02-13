import { describe, it, expect } from 'vitest';
import { createTeardown } from '../src/lifecycle/teardown';

describe('adapter-base: teardown', () => {
  it('run executes only once, isDone reflects state', () => {
    const td = createTeardown();

    expect(td.isDone()).toBe(false);

    let n = 0;
    td.run(() => n++);
    expect(n).toBe(1);
    expect(td.isDone()).toBe(true);

    td.run(() => n++);
    td.run(() => n++);
    expect(n).toBe(1);
    expect(td.isDone()).toBe(true);
  });
});
