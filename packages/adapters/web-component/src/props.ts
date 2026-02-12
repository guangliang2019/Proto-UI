// packages/adapters/web-component/src/props.ts
import type { RuntimeController } from "@proto-ui/runtime";

const rawMap = new WeakMap<HTMLElement, Record<string, any>>();
const ctrlMap = new WeakMap<HTMLElement, RuntimeController>();

export function setElementProps(el: HTMLElement, nextRaw: Record<string, any>) {
  rawMap.set(el, nextRaw ?? {});
  const ctrl = ctrlMap.get(el);
  if (ctrl) {
    ctrl.applyRawProps(nextRaw ?? {});
  }
}

export function getElementProps(el: HTMLElement) {
  return rawMap.get(el);
}

export function bindController(el: HTMLElement, ctrl: RuntimeController) {
  ctrlMap.set(el, ctrl);

  // if props already set before connected, apply once now
  const raw = rawMap.get(el);
  if (raw) ctrl.applyRawProps(raw);
}

export function unbindController(el: HTMLElement) {
  ctrlMap.delete(el);
}
