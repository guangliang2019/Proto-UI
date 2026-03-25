# 代码生成 CLI

扫描 `demo_components` 子目录下的 `*.demo.ts` 文件，生成 `xxxCode.ts`（wc / react / vue 三种运行时代码）。

## 用法

```bash
# 在 apps/www 目录下
pnpm run generate-code
```

## 工作流程

1. **生成 prototype-config.ts**：扫描所有 `.demo.ts` 中的 `prototypeId`，根据 `@packages/prototype-libs` 对应包的 `package.json` 的 `name` 作为 `importPath`，将 `prototypeId` 转为 PascalCase 作为 `component` 名。
2. **扫描 demo_components**：遍历 `src/content/docs/demo_components` 下每个子文件夹，查找以 `.demo.ts` 结尾的 TS 文件。
3. **加载 Demo**：动态 import 每个 `*.demo.ts`，得到 `DemoSpec`。
4. **生成代码**：根据 `prototype-config.ts` 的映射，将 DemoSpec 转为 wc、react、vue 三种代码。
5. **写入文件**：在对应子文件夹中生成 `<父文件夹名>Code.ts`，例如 `button/demo-button.demo.ts` → `button/buttonCode.ts`。

生成的 `xxxCode.ts` 结构示例：

```ts
export const codeMap: Record<RuntimeId, Record<string, string>> = {
  wc: {
    'demo-button': formatCode(`...`),
  },
  react: {
    'demo-button': formatCode(`...`),
  },
  vue: {
    'demo-button': formatCode(`...`),
  },
};
```

其中 demo 的 key 为 `.demo.ts` 前面的文件名（如 `demo-button.demo.ts` → `demo-button`）。

## 配置

`prototype-config.ts` 由 codegen 根据 `.demo.ts` 自动生成，无需手动维护。规则如下：

- **component**：将 `prototypeId` 转为 PascalCase（如 `shadcn-tabs-root` → `ShadcnTabsRoot`）
- **importPath**：根据 `prototypeId` 前缀（如 `shadcn`）从 `packages/prototype-libs/<prefix>/package.json` 的 `name` 字段获取（如 `@prototype-libs/shadcn`）
