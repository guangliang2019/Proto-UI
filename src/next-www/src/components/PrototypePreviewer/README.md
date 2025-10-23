# PrototypePreviewer 使用指南

## 🎯 解决的问题

PrototypePreviewer 是一个用于在文档中展示原型组件的预览器，支持多运行时（Web Components、React、Vue）切换。

**核心特性：**
- ✅ **按需加载**：只加载当前页面需要的原型，支持代码分割
- ✅ **SSR 友好**：完美兼容 Astro 的 SSR 渲染
- ✅ **自动管理**：无需手动导入，声明式使用

## 🚀 快速开始（推荐方式）

### 1. 创建原型定义文件

在你的内容目录下创建原型定义，例如 `demo-inline.ts`：

```typescript
import { definePrototype } from '@/core';
import { registerPrototype } from '../../../components/PrototypePreviewer/registry';

const DemoInline = definePrototype({
  name: 'demo-inline',
  setup(p) {
    return (h) => {
      const r = (h as any).createElement ? (h as any).createElement : h;
      return r('div', { class: 'text-red-500' }, 'Hello World');
    };
  },
});

registerPrototype('demo-inline', DemoInline);
```

### 2. 在 `prototype-modules.ts` 中注册加载器

打开 `src/components/PrototypePreviewer/prototype-modules.ts`，添加你的原型：

```typescript
export const prototypeModules: Record<string, PrototypeModuleLoader> = {
  'demo-inline': () => import('../../content/docs/zh-cn/demo-inline'),
  
  // 添加你的新原型
  'button-demo': () => import('../../content/docs/zh-cn/components/button-demo'),
};
```

### 3. 在 MDX 中使用

```mdx
---
title: 你的页面
---
import { PrototypePreviewer } from '../../../components/PrototypePreviewer';

{/* 原型会自动按需加载！ */}
<PrototypePreviewer 
  prototypeId="demo-inline" 
  initialRuntime="wc" 
  runtimes={['wc', 'react']}
/>
```

就这么简单！🎉 原型模块会在需要时自动加载。

## 🔧 技术细节

### 按需加载架构

```
MDX 页面
  └─> <PrototypePreviewer prototypeId="demo-inline" />
        └─> previewer-client.ts
              └─> loadPrototype("demo-inline")
                    └─> prototype-modules.ts 查找加载器
                          └─> 动态 import('./demo-inline')
                                └─> registerPrototype() 执行
                                      └─> getPrototype() 获取原型 ✅
```

**关键优势：**
- 📦 **代码分割**：每个原型都是独立的 chunk，按需加载
- 🚀 **首屏优化**：页面初始 bundle 不包含未使用的原型
- 🔄 **并行加载**：多个原型可以并行加载
- 🎯 **精确控制**：通过 `prototype-modules.ts` 集中管理所有原型

### Registry 环境感知

`registry.ts` 会自动检测运行环境：
- **SSR 环境**：`registerPrototype()` 静默跳过，不会报错
- **客户端环境**：正常注册到 Map 中
- 提供友好的中文错误提示和调试信息

### 加载流程

1. `PrototypePreviewer` 初始化
2. `ensurePrototypeLoaded()` 检查是否需要加载
3. `loadPrototype(id)` 查找并执行动态导入
4. 原型模块自动执行 `registerPrototype()`
5. `getPrototype(id)` 获取已注册的原型
6. 挂载到对应的运行时

## 🐛 调试工具

在浏览器控制台中：

```javascript
import { listPrototypes } from './registry';

// 查看已注册的原型
console.log('已注册原型:', listPrototypes());
```

## ⚠️ 常见问题

### Q: 为什么不能直接在 MDX 中 import 原型？

A: Astro 会在 SSR 阶段执行顶层 import，此时注册到的是服务端的 Map 实例。客户端会创建新的 Map 实例，导致找不到原型。因此我们使用动态加载机制。

### Q: 如何添加新原型？

A: 
1. 创建原型定义文件（如 `my-demo.ts`）
2. 在 `prototype-modules.ts` 中注册：`'my-demo': () => import('路径')`
3. 在 MDX 中使用：`<PrototypePreviewer prototypeId="my-demo" />`

### Q: 原型会重复加载吗？

A: 不会。每个原型模块只会加载一次，后续使用同一原型会复用已加载的实例。

### Q: 可以预加载多个原型吗？

A: 可以使用 `loadPrototypes(['id1', 'id2'])` 批量预加载。

### Q: 如何调试加载问题？

A: 
```javascript
import { getAvailablePrototypes } from './prototype-modules';
console.log('可用原型:', getAvailablePrototypes());
```

## 📝 Props 说明

### PrototypePreviewer

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `prototypeId` | `string` | *必填* | 原型 ID，需要提前注册 |
| `initialRuntime` | `'wc' \| 'react' \| 'vue'` | `'wc'` | 初始运行时 |
| `props` | `Record<string, unknown>` | `{}` | 传递给原型的 props |
| `toolbar` | `boolean` | `true` | 是否显示运行时切换工具栏 |
| `runtimes` | `RuntimeId[]` | `['wc', 'react']` | 可用的运行时列表 |
| `class` | `string` | `''` | 自定义 CSS 类 |

## 🎨 样式定制

预览器使用 CSS 变量进行样式控制：

```css
.proto-previewer {
  --border-color: var(--sl-color-gray-5);
  --border-radius: 12px;
  --padding: 12px;
}
```

## 🚀 最佳实践

1. **集中管理**：所有原型在 `prototype-modules.ts` 中统一注册
2. **命名规范**：原型 ID 使用 kebab-case，如 `demo-inline`
3. **按功能分组**：可以按章节/功能组织原型文件
4. **懒加载优先**：让系统自动按需加载，避免手动管理
5. **错误处理**：预览器会自动显示错误信息，便于调试

**文件组织示例：**
```
content/docs/zh-cn/
├── components/
│   ├── button-demo.ts
│   └── input-demo.ts
├── examples/
│   ├── form-demo.ts
│   └── dashboard-demo.ts
└── getting-started/
    └── hello-world.ts
```

在 `prototype-modules.ts` 中：
```typescript
export const prototypeModules = {
  // 组件示例
  'button-demo': () => import('../../content/docs/zh-cn/components/button-demo'),
  'input-demo': () => import('../../content/docs/zh-cn/components/input-demo'),
  
  // 完整示例
  'form-demo': () => import('../../content/docs/zh-cn/examples/form-demo'),
  'dashboard-demo': () => import('../../content/docs/zh-cn/examples/dashboard-demo'),
  
  // 入门示例
  'hello-world': () => import('../../content/docs/zh-cn/getting-started/hello-world'),
};
```

## 📊 性能对比

| 方案 | Bundle 大小 | 首屏加载 | 扩展性 |
|------|------------|---------|--------|
| 全量导入 | ❌ 大 | ❌ 慢 | ❌ 差 |
| 按需加载（新方案） | ✅ 小 | ✅ 快 | ✅ 优 |

## 🔄 更新日志

- **v3.0**: 🎉 按需动态加载，支持代码分割和并行加载
- **v2.0**: 添加环境感知和自动重试机制
- **v1.0**: 初始版本，支持基本的原型预览功能

---

## 🔧 高级用法

### 预加载多个原型

如果你知道页面会用到多个原型，可以提前批量加载：

```astro
---
// 在 Astro 组件的 script 标签中
---
<script>
  import { loadPrototypes } from './prototype-modules';
  
  // 页面加载时预加载
  loadPrototypes(['demo1', 'demo2', 'demo3']);
</script>
```

### 条件加载

```typescript
// 根据用户偏好动态加载不同原型
const prototypeId = userPrefersDarkMode ? 'dark-theme-demo' : 'light-theme-demo';
```

```mdx
<PrototypePreviewer prototypeId={prototypeId} />
```

### 自定义加载器

如果需要更复杂的加载逻辑：

```typescript
// prototype-modules.ts
export const prototypeModules = {
  'advanced-demo': async () => {
    // 可以添加额外的逻辑
    const [module, config] = await Promise.all([
      import('./advanced-demo'),
      fetch('/api/demo-config').then(r => r.json())
    ]);
    
    // 动态配置
    module.configure(config);
    return module;
  }
};
```

