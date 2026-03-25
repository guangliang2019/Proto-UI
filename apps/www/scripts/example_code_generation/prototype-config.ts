/**
 * prototypeId -> 框架组件的映射配置（由 generate-code 根据 .demo.ts 自动生成）
 * 用于 DemoSpec 代码生成时，将 proto 节点映射为 Vue/React 组件
 */
export type ComponentMapping = {
  component: string;
  importPath: string;
  iconPackage?: 'lucide-vue-next' | 'lucide-react';
};

export type WebComponentMapping = {
  tag: string;
};

export type PrototypeMapping = {
  component: string;
  importPath: string;
  webComponent?: WebComponentMapping;
};

export const prototypeMappings: Record<string, PrototypeMapping> = {
  'shadcn-button': { component: 'ShadcnButton', importPath: '@prototype-libs/shadcn' },
  'shadcn-tabs-content': { component: 'ShadcnTabsContent', importPath: '@prototype-libs/shadcn' },
  'shadcn-tabs-list': { component: 'ShadcnTabsList', importPath: '@prototype-libs/shadcn' },
  'shadcn-tabs-root': { component: 'ShadcnTabsRoot', importPath: '@prototype-libs/shadcn' },
  'shadcn-tabs-trigger': { component: 'ShadcnTabsTrigger', importPath: '@prototype-libs/shadcn' },
};

export const defaultIconMappings = {
  vue: { ArrowUpIcon: 'lucide-vue-next' },
  react: { ArrowUpIcon: 'lucide-react' },
};
