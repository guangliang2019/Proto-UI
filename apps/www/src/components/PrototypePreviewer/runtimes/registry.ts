// src/components/PrototypePreviewer/runtimes/registry.ts
export type RuntimeId = 'wc' | 'react';

export type RuntimeAPI = {
  id: RuntimeId;
  label: string;
  mount(
    host: HTMLElement,
    prototype: any,
    options?: { props?: Record<string, unknown> }
  ): Promise<void> | void;
  unmount(host: HTMLElement): Promise<void> | void;
};

export const runtimeLoaders: Record<RuntimeId, () => Promise<RuntimeAPI>> = {
  wc: async () => (await import('./wc-runtime')).runtime,
  react: async () => (await import('./react-runtime')).runtime,
};
