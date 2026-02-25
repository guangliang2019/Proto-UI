# PrototypePreviewer 快速参考

## 📝 添加新原型（2 步完成）

### 1️⃣ 创建原型文件

```typescript
// src/content/docs/zh-cn/my-awesome-demo.demo.proto.ts
import { definePrototype } from '@proto-ui/core';

const MyAwesomeDemo = definePrototype({
  name: 'my-awesome-demo',
  setup(props) {
    return (h) => {
      return h(
        'div',
        {
          class: 'p-4 bg-blue-500 text-white rounded',
        },
        'My Awesome Demo!'
      );
    };
  },
});

export default MyAwesomeDemo;
```

### 2️⃣ 在 MDX 中使用

```mdx
---
title: 我的页面
---

import { PrototypePreviewer } from '../../../components/PrototypePreviewer';
// 或使用 DemoPreviewer（PrototypePreviewer 的别名）

<PrototypePreviewer prototypeId="my-awesome-demo" initialRuntime="wc" />
```

完成！🎉

---

## 🎨 常用配置

### 基础用法

```mdx
<PrototypePreviewer prototypeId="demo-inline" />
```

### 组合多个原型（demo）

```typescript
// src/content/docs/zh-cn/my-combo.demo.ts
export default {
  type: 'demo',
  root: {
    kind: 'box',
    className: 'p-4 border rounded',
    children: [{ kind: 'proto', prototypeId: 'demo-inline' }],
  },
};
```

```mdx
<PrototypePreviewer demoId="my-combo" />
{/* 或 <DemoPreviewer demoId="my-combo" /> */}
```

`text` 节点可用于纯文本内容（或直接写字符串）：

```typescript
export default {
  type: 'demo',
  root: {
    kind: 'box',
    children: [{ kind: 'text', text: 'Hello' }, 'World'],
  },
};
```

### 指定初始运行时

```mdx
<PrototypePreviewer prototypeId="demo-inline" initialRuntime="react" />
```

### 限制可用运行时

```mdx
<PrototypePreviewer prototypeId="demo-inline" runtimes={['wc', 'react']} />
```

### 传递 Props

```mdx
<PrototypePreviewer
  prototypeId="demo-inline"
  props={{
    title: 'Hello',
    count: 42,
    enabled: true,
  }}
/>
```

### 隐藏工具栏

```mdx
<PrototypePreviewer prototypeId="demo-inline" toolbar={false} />
```

### 自定义样式

```mdx
<PrototypePreviewer prototypeId="demo-inline" class="my-custom-preview" />
```

---

## 🔍 调试命令

### 查看所有可用原型

```javascript
import { getAvailablePrototypes } from '../components/PrototypePreviewer/prototype-modules';
console.log(getAvailablePrototypes());
```

### 查看已注册的原型

```javascript
import { listPrototypes } from '../components/PrototypePreviewer/registry';
console.log(listPrototypes());
```

### 手动加载原型

```javascript
import { loadPrototype } from '../components/PrototypePreviewer/prototype-modules';
await loadPrototype('demo-inline');
```

---

## ⚡️ 性能技巧

### 预加载多个原型

```astro
<script>
  import { loadPrototypes } from '../components/PrototypePreviewer/prototype-modules';
  loadPrototypes(['demo1', 'demo2', 'demo3']);
</script>
```

### 延迟加载

```mdx
{/* 原型默认就是延迟加载的，无需额外配置 */}

<PrototypePreviewer prototypeId="heavy-demo" />
```

---

## 🚨 常见错误

### ❌ 错误: "未找到原型"

```
Error: [PrototypePreviewer] 未找到原型 "my-demo"
```

**解决**: 确认存在 `*.demo.proto.ts` 文件且文件名与 `prototypeId` 一致

---

### ❌ 错误: "无法加载原型模块"

```
Error: 加载原型模块 "my-demo" 失败
```

**解决**: 检查导入路径是否正确

---

### ❌ 错误: "registerPrototype: invalid id"

```
Error: registerPrototype: invalid id
```

**解决**: 确保 `prototypeId` 是有效的非空字符串

---

## 📚 完整文档

- [完整使用指南](./README.md)
- [迁移指南](./MIGRATION.md)
- [API 文档](./PrototypePreviewer.astro)

---

## 💡 最佳实践速查

✅ **DO**

- 使用 kebab-case 命名原型 ID
- 使用 `*.demo.proto.ts` 后缀，靠近文档就近维护
- 让系统自动按需加载
- 为原型添加有意义的注释

❌ **DON'T**

- 不要在 MDX 中直接 import 原型文件
- 不要使用 camelCase 或 PascalCase 作为原型 ID
- 不要在原型定义中包含副作用
- 不要使用非 `*.demo.proto.ts` 后缀的文件当作 demo 原型

---

## 🎯 快速模板

复制粘贴这个模板快速开始：

```typescript
// your-demo.demo.proto.ts
import { definePrototype } from '@proto-ui/core';

const YourDemo = definePrototype({
  name: 'your-demo',
  setup(props) {
    return (h) => {
      // 你的渲染逻辑
      return h('div', {}, 'Content');
    };
  },
});

export default YourDemo;
```

```mdx
<!-- your-page.mdx -->

import { PrototypePreviewer } from '../../../components/PrototypePreviewer';

<PrototypePreviewer prototypeId="your-demo" />
```

现在开始创建吧！🚀
