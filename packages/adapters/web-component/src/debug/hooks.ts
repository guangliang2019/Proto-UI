import type { TestSysPort } from '@proto.ui/module-test-sys';

export const __WC_DEBUG_SYS = Symbol.for('@proto.ui/adapter-web-component/__debug_sys');

export function installDebugHooks(el: HTMLElement, capsHub: any) {
  try {
    const sysPort = capsHub.getPort?.('test-sys');
    (el as any)[__WC_DEBUG_SYS] = sysPort;
  } catch {}

  Object.defineProperty(el, '__debugTestSysTrace', {
    enumerable: false,
    configurable: true,
    get: () => {
      const port = capsHub.getPort?.('test-sys') as TestSysPort;
      return port?.getTrace?.() ?? [];
    },
  });

  Object.defineProperty(el, '__debugClearTestSysTrace', {
    enumerable: false,
    configurable: true,
    value: () => {
      const port = capsHub.getPort?.('test-sys') as TestSysPort;
      port?.clearTrace?.();
    },
  });
}

export function removeDebugHooks(el: HTMLElement) {
  try {
    delete (el as any)[__WC_DEBUG_SYS];
  } catch {}
}
