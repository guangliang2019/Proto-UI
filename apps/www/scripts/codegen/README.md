# 代码生成 CLI

通过扫描 `.mdx` 文件中的 `PrototypePreviewer` 和 `data-adapter-panel` 的 adapter 状态，从 DemoSpec 生成 Vue / React 版本的示例代码。

## 用法

```bash
# 在 apps/www 目录下
pnpm run codegen

# 仅生成指定 demo
pnpm run codegen -- --demo demo-combo

# 输出到指定目录
pnpm run codegen -- --output ./generated
```

## 工作流程

1. **扫描 MDX**：使用 `remark` + `remark-mdx` 解析 `.mdx`，遍历 AST 找到：
   - `<div data-adapter-panel="wc|react|vue">` 块
   - 其内的 `<PrototypePreviewer demoId="xxx" />` 或 `prototypeId`

2. **加载 Demo**：根据 `demoId` 加载对应的 `*.demo.ts`，得到 `DemoSpec`。

3. **生成代码**：根据 `prototype-mapping.config.ts` 的映射，将 DemoSpec 树转为：
   - Vue SFC（`<script setup>` + `<template>`）
   - React 组件（`tsx`）

## 配置

在 `prototype-mapping.config.ts` 中维护 `prototypeId -> 框架组件` 映射：

```ts
prototypeMappings['demo-inline'] = {
  vue: { component: 'Button', importPath: '@/components/ui/button' },
  react: { component: 'Button', importPath: '@/components/ui/button' },
};
```

新增原型时在此补充映射即可。
