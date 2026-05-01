export const ADAPTER_REGISTRY = {
  react: {
    id: 'react',
    label: 'React',
    aliases: ['react'],
    packageName: '@proto.ui/adapter-react',
    runtimePackages: ['react'],
    createImport: `import { createReactAdapter } from '@proto.ui/adapter-react';`,
    runtimeImport: `import * as React from 'react';`,
    adapterStatement: `const adapt = createReactAdapter(React);`,
    rootAliasPrefix: 'React',
  },
  vue: {
    id: 'vue',
    label: 'Vue',
    aliases: ['vue'],
    packageName: '@proto.ui/adapter-vue',
    runtimePackages: ['vue'],
    createImport: `import { createVueAdapter } from '@proto.ui/adapter-vue';`,
    runtimeImport: `import * as Vue from 'vue';`,
    adapterStatement: `const adapt = createVueAdapter(Vue);`,
    rootAliasPrefix: 'Vue',
  },
  wc: {
    id: 'wc',
    label: 'Web Components',
    aliases: ['wc', 'web-component', 'web-components'],
    packageName: '@proto.ui/adapter-web-component',
    runtimePackages: [],
    createImport: `import { AdaptToWebComponent } from '@proto.ui/adapter-web-component';`,
    runtimeImport: null,
    adapterStatement: null,
    rootAliasPrefix: null,
  },
};

const ALIAS_TO_ADAPTER = new Map();
for (const adapter of Object.values(ADAPTER_REGISTRY)) {
  for (const alias of adapter.aliases) {
    ALIAS_TO_ADAPTER.set(alias, adapter);
  }
}

export function normalizeHost(input) {
  if (!input) return null;
  return ALIAS_TO_ADAPTER.get(String(input).toLowerCase())?.id ?? null;
}

export function getAdapter(host) {
  return ADAPTER_REGISTRY[host] ?? null;
}

export function listAdapterChoices() {
  return Object.values(ADAPTER_REGISTRY).map((adapter) => ({
    title: adapter.label,
    value: adapter.id,
  }));
}
