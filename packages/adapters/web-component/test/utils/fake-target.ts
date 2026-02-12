// packages/adapters/web-component/test/utils/fake-target.ts
// FakeEventTarget: enough for add/remove/dispatch + call order
export class FakeEventTarget implements EventTarget {
  public addCalls: Array<{ type: string; listener: any; options: any }> = [];
  public removeCalls: Array<{ type: string; listener: any; options: any }> = [];
  private map = new Map<string, Set<any>>();

  addEventListener(type: string, listener: any, options?: any): void {
    this.addCalls.push({ type, listener, options });
    if (!this.map.has(type)) this.map.set(type, new Set());
    this.map.get(type)!.add(listener);
  }

  removeEventListener(type: string, listener: any, options?: any): void {
    this.removeCalls.push({ type, listener, options });
    this.map.get(type)?.delete(listener);
  }

  dispatch(type: string, ev: any = { type }) {
    const set = this.map.get(type);
    if (!set) return;
    for (const fn of [...set]) fn(ev);
  }

  // EventTarget requires this signature, but TS allows missing dispatchEvent in structural typing sometimes.
  dispatchEvent(_event: Event): boolean {
    return true;
  }
}
