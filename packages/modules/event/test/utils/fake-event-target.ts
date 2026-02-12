// packages/modules/event/test/utils/fake-event-target.ts
export class FakeEventTarget {
  private map = new Map<string, Set<Function>>();

  addEventListener(type: string, cb: any) {
    const set = this.map.get(type) ?? new Set();
    set.add(cb);
    this.map.set(type, set);
  }

  removeEventListener(type: string, cb: any) {
    this.map.get(type)?.delete(cb);
  }

  dispatch(type: string, ev: any) {
    for (const cb of this.map.get(type) ?? []) cb(ev);
  }

  count(type: string) {
    return this.map.get(type)?.size ?? 0;
  }
}
