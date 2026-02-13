# 迁移指南：从 v2 到 v3（按需加载）

## 🎯 为什么迁移？

v3 引入了按需动态加载机制，带来以下优势：

| 特性        | v2 (PrototypeLoader) | v3 (按需加载)       |
| ----------- | -------------------- | ------------------- |
| Bundle 大小 | 加载所有原型         | 只加载使用的原型 ✅ |
| 代码分割    | ❌                   | ✅                  |
| 开发体验    | 需要手动管理加载器   | 自动加载 ✅         |
| 性能        | 一般                 | 优秀 ✅             |

## 📋 迁移步骤

### 步骤 1: 更新原型定义（无需改动）

原型定义文件保持不变：

```typescript
// demo-inline.ts
import { definePrototype } from '@proto-ui/core';
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

### 步骤 2: 注册到 `prototype-modules.ts`

打开 `src/components/PrototypePreviewer/prototype-modules.ts`，添加你的原型：

```typescript
export const prototypeModules: Record<string, PrototypeModuleLoader> = {
  // 从 prototypes.ts 中的每个导入转换为一个条目
  'demo-inline': () => import('../../content/docs/zh-cn/demo-inline'),

  // 添加更多...
};
```

### 步骤 3: 更新 MDX 文件

**之前（v2）：**

```mdx
---
title: 你的页面
---

import { PrototypePreviewer } from '../../../components/PrototypePreviewer';
import PrototypeLoader from '../../../components/PrototypeLoader.astro';

{/* 需要手动加载 */}

<PrototypeLoader />

<PrototypePreviewer prototypeId="demo-inline" />
```

**现在（v3）：**

```mdx
---
title: 你的页面
---

import { PrototypePreviewer } from '../../../components/PrototypePreviewer';

{/* 自动按需加载，无需 PrototypeLoader */}

<PrototypePreviewer prototypeId="demo-inline" />
```

### 步骤 4: 删除 `prototypes.ts`（可选）

如果你使用的是集中式的 `prototypes.ts` 文件，现在可以删除它了。所有的导入已经移到 `prototype-modules.ts` 中。

**之前的 `prototypes.ts`：**

```typescript
import './demo-inline';
import './button-demo';
import './form-demo';
```

**现在的 `prototype-modules.ts`：**

```typescript
export const prototypeModules = {
  'demo-inline': () => import('../../content/docs/zh-cn/demo-inline'),
  'button-demo': () => import('../../content/docs/zh-cn/button-demo'),
  'form-demo': () => import('../../content/docs/zh-cn/form-demo'),
};
```

## 🔄 批量迁移脚本

如果你有很多页面需要迁移，可以使用这个简单的 grep 命令：

```bash
# 查找所有使用 PrototypeLoader 的文件
grep -r "PrototypeLoader" src/content --include="*.mdx"

# 移除 PrototypeLoader 导入和使用
# 手动或使用脚本编辑每个文件
```

## ✅ 迁移检查清单

- [ ] 所有原型已在 `prototype-modules.ts` 中注册
- [ ] MDX 文件中移除了 `import PrototypeLoader`
- [ ] MDX 文件中移除了 `<PrototypeLoader />` 组件
- [ ] 测试每个原型是否正常加载
- [ ] （可选）删除旧的 `prototypes.ts` 文件

## 🐛 常见问题

### Q: 迁移后出现 "未找到原型" 错误

**原因**: 原型未在 `prototype-modules.ts` 中注册

**解决**:

```typescript
// 检查 prototypeId 是否在 prototypeModules 中
export const prototypeModules = {
  'your-prototype-id': () => import('正确的路径'),
};
```

### Q: 可以保留 PrototypeLoader 吗？

**可以**，v3 向后兼容 v2 的 `loader` prop，但不推荐继续使用。

### Q: 如何确认迁移成功？

在浏览器控制台中：

```javascript
import { getAvailablePrototypes } from './prototype-modules';
console.log(getAvailablePrototypes()); // 应该包含你的所有原型 ID
```

## 📊 性能提升示例

假设你有 20 个原型，每个 10KB：

**v2 (全量加载)**:

- 页面 A 使用 1 个原型，但加载了 20 个 = 200KB ❌
- 页面 B 使用 2 个原型，但加载了 20 个 = 200KB ❌

**v3 (按需加载)**:

- 页面 A 使用 1 个原型，只加载 1 个 = 10KB ✅
- 页面 B 使用 2 个原型，只加载 2 个 = 20KB ✅

节省 90% 的无用加载！🎉

## 💡 最佳实践

1. **一次性迁移**：为整个站点统一迁移到 v3
2. **测试优先**：先在开发环境测试所有原型
3. **渐进式部署**：可以先迁移新页面，旧页面保持 v2
4. **文档更新**：更新团队文档说明新的使用方式

---

需要帮助？查看 [README.md](./README.md) 获取完整文档。
