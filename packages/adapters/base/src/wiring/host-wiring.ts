// packages/adapters/base/src/wiring/host-wiring.ts
import type { HostWiring, WiringSpec } from '../types';
import type { ModuleWiring } from '@proto-ui/runtime';

export function createHostWiring(args: { prototypeName: string; modules: WiringSpec }): HostWiring {
  const { prototypeName, modules } = args;

  const wired = new Set<string>();
  let wiringApi: ModuleWiring | null = null;

  return {
    onRuntimeReady(wiring: ModuleWiring) {
      wiringApi = wiring;
      for (const [name, provide] of Object.entries(modules)) {
        const entries = provide({ prototypeName });
        const ok = wiring.attach(name, entries);
        if (ok) wired.add(name);
      }
    },

    afterUnmount() {
      if (!wiringApi) return;
      for (const name of wired) {
        try {
          wiringApi.reset(name);
        } catch {
          // ignore v0
        }
      }
      wired.clear();
      wiringApi = null;
    },
  };
}
