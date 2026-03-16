/**
 * prototypeId -> 框架组件的映射配置
 * 用于 DemoSpec 代码生成时，将 proto 节点映射为 Vue/React 组件
 */
export type ComponentMapping = {
  component: string;
  importPath: string;
  /** 图标类组件使用不同的 lucide 包 */
  iconPackage?: 'lucide-vue-next' | 'lucide-react';
};

export type PrototypeMapping = {
  vue: ComponentMapping;
  react: ComponentMapping;
};

export const prototypeMappings: Record<string, PrototypeMapping> = {
  'demo-inline': {
    vue: {
      component: 'Button',
      importPath: '@/components/ui/button',
    },
    react: {
      component: 'Button',
      importPath: '@/components/ui/button',
    },
  },
  'demo-button': {
    vue: {
      component: 'Button',
      importPath: '@/components/ui/button',
    },
    react: {
      component: 'Button',
      importPath: '@/components/ui/button',
    },
  },
  // 可扩展更多 prototype -> 框架组件的映射
};

/** 获取默认的图标导入（按需可扩展） */
export const defaultIconMappings = {
  vue: { ArrowUpIcon: 'lucide-vue-next' },
  react: { ArrowUpIcon: 'lucide-react' },
};
