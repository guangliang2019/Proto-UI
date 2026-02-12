import type { RunHandle } from "@proto-ui/core";
import type { PropsBaseType } from "@proto-ui/types";

export class RuntimeEventCallbacks<P extends PropsBaseType> {
  private map = new Map<string, (run: RunHandle<P>, ev: any) => void>();

  register(id: string, cb: (run: RunHandle<P>, ev: any) => void) {
    this.map.set(id, cb);
  }

  remove(id: string) {
    this.map.delete(id);
  }

  dispatch(run: RunHandle<P>, id: string, ev: any) {
    const cb = this.map.get(id);
    if (!cb) return; // unknown id => no-op
    cb(run, ev);
  }

  clear() {
    this.map.clear();
  }
}

export const __RT_EVENT_CALLBACKS = Symbol.for("__rt_event_callbacks");
