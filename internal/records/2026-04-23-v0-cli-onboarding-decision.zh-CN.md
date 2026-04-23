# 2026-04-23 v0 CLI 上手路径与组件生成决策

> Internal record. Not normative. 本文用于记录 Proto UI v0 首个 CLI 上手闭环的当前决策、范围边界与后续可演进方向。

---

## 1）背景

此前 Quick Start 已经决定以 CLI 作为 React / Vue 等模块化前端项目的默认推荐路径，并在 Web Component 场景下允许 CLI 与 HTML script 标签路径并列。

但当前 `@proto.ui/cli` 的真实实现仍主要是：

- `init`
- Tailwind token / theme / css 生成
- shadcn 样式 preset 生成

它还没有实现 Quick Start 中描述的：

```bash
npx @proto.ui/cli add react shadcn-button
```

也就是说，当前 CLI 已经具备项目初始化和样式资源生成能力，但还没有形成“安装 prototype + adapter，并生成用户可直接导入组件入口”的闭环。

本记录用于收敛 v0 第一个 CLI 版本应该如何定义 `init`、`add`、组件导出、依赖安装、样式接入，以及 styled prototype 后续本地化路线。

---

## 2）已观察到的事实

### 2.1 `init` 不应承担过多产品决策

`init` 如果同时负责选择唯一 adapter、安装具体组件、修改用户业务源码，会让命令参数和交互流程变复杂，也会与“同一个项目可能同时使用 React 和 Web Component adapter”的需求冲突。

因此 `init` 更适合成为一个轻量的 workspace 初始化命令。

### 2.2 多 adapter 虽然不常见，但必须支持

同一个项目可能同时需要：

```bash
proto-ui add react shadcn-button
proto-ui add wc shadcn-button
```

因此 config 和组件导出结构不能假定项目只有一个全局 adapter。

### 2.3 用户只应从 generated components 层导入

`proto-ui/adapters` 和 `proto-ui/prototypes` 不应成为用户直接消费的导出面。

面向用户的稳定入口应是：

```txt
proto-ui/components/
```

CLI 负责处理 adapter package、prototype package、组合策略与导出。

### 2.4 当前不适合把 prototype 源码按需 Git 写入作为首发门槛

`@proto.ui/prototypes-shadcn` 依赖 `@proto.ui/prototypes-base`。而 base library 当前更适合整体作为 npm package 安装，不适合在 v0 首发前为了“每个组件都能源码级按需写入”而立即重构 package surface。

同时，Git 写入源码会引入：

- 版本锁定
- 覆盖策略
- 用户修改保护
- update / diff 语义
- 依赖文件收集

这些问题都值得做，但不应阻塞第一个 Quick Start 闭环。

### 2.5 宿主 runtime 不是 adapter package 的直接依赖，但生成组件时必须存在

React / Vue adapter package 本身不直接依赖宿主 runtime。创建具体 adapter 组件时才需要传入 runtime 对象，例如 React 场景需要：

```ts
import * as React from 'react';
import { createReactAdapter } from '@proto.ui/adapter-react';
```

因此 CLI 在 `add react ...` 或 `add vue ...` 时必须检查用户项目是否已有对应宿主 runtime。

### 2.6 用户导入路径不能强依赖裸 specifier

文档中理想写法是：

```ts
import { Button } from 'proto-ui/components';
```

但 CLI 无法可靠知道用户项目的路径别名、workspace 配置、消费文件所在层级，以及 bundler 对本地 package / path alias 的支持方式。

因此 v0 不应把裸 specifier 作为唯一承诺路径。Quick Start 可以先展示相对路径导入。

---

## 3）问题定义

v0 首个 CLI 闭环需要回答：

1. `init` 到底负责什么？
2. `add` 到底负责什么？
3. 多 adapter 场景下组件如何导出？
4. prototype 与 adapter 通过什么方式安装？
5. 宿主 runtime 缺失时 CLI 如何处理？
6. 样式文件由 CLI 自动接入，还是由用户手动接入？
7. shadcn 这类 styled prototype 是否还保留未来本地化路线？

---

## 4）当前决策

### 4.1 `init` 保持轻量

v0 的 `init` 默认只负责：

- 在当前项目根目录创建 `proto-ui/`
- 写入 `proto-ui/config.json`
- 创建 `proto-ui/components/`
- 可选创建样式相关文件
- 记录 CLI 管理路径与基础配置

`init` 不负责添加具体组件，也不假定项目只有一个 adapter。

默认安装位置为：

```txt
./proto-ui/
```

后续可以增加可选参数允许用户指定安装位置，但默认路径应保持稳定。

### 4.2 config 采用多 adapter 结构

`proto-ui/config.json` 不应只保存一个 `adapter` 字段。

它应支持记录多个 adapter、多个已添加 component，以及样式配置。例如：

```json
{
  "version": 1,
  "rootDir": "./proto-ui",
  "stylesDir": "./src/styles",
  "adapters": {
    "react": {
      "package": "@proto.ui/adapter-react"
    },
    "wc": {
      "package": "@proto.ui/adapter-web-component"
    }
  },
  "components": {
    "react/shadcn-button": {
      "exportName": "Button"
    },
    "wc/shadcn-button": {
      "exportName": "ButtonElement"
    }
  }
}
```

具体字段可以在实现时调整，但结构上必须支持多 adapter。

### 4.3 `add` 是核心组件生成命令

v0 主命令形态为：

```bash
proto-ui add react shadcn-button
proto-ui add vue shadcn-button
proto-ui add wc shadcn-button
```

`add` 执行时负责：

1. 读取 `proto-ui/config.json`
2. 检查对应 adapter package 是否已安装，未安装则通过当前 package manager 安装
3. 检查对应 prototype package 是否已安装，未安装则安装
4. 检查宿主 runtime 是否存在
5. 根据 CLI 内置策略生成 `proto-ui/components/[host]/index.ts`
6. 更新 `proto-ui/components/index.ts`
7. 更新 config 中的 adapters / components 记录

### 4.4 prototype v0 先走 npm package

v0 首发不把 Git 源码写入式 prototype 按需安装作为硬门槛。

`add react shadcn-button` 应安装：

- `@proto.ui/adapter-react`
- `@proto.ui/prototypes-shadcn`

`@proto.ui/prototypes-shadcn` 对 `@proto.ui/prototypes-base` 的依赖由 npm package 依赖关系处理。

如果用户直接添加 base prototype，则 CLI 可按 registry 规则安装 `@proto.ui/prototypes-base`。

### 4.5 component facade 是首发 generated surface

v0 的本地生成重点不是写入 prototype 源码，而是生成 components facade。

例如 React：

```ts
import * as React from 'react';
import { createReactAdapter } from '@proto.ui/adapter-react';
import { shadcnButton } from '@proto.ui/prototypes-shadcn';

const adapt = createReactAdapter(React);

export const Button = adapt(shadcnButton);
```

由于组合逻辑很短，v0 可以直接在：

```txt
proto-ui/components/react/index.ts
```

中完成 import、adapter 创建、prototype 组合与导出。

后续如果组件数量或生成逻辑变复杂，再拆成单组件文件。

### 4.6 多 adapter 导出采用 host 子入口

v0 应优先支持：

```ts
import { Button } from '../proto-ui/components/react';
import { ButtonElement } from '../proto-ui/components/wc';
```

也就是说：

- `proto-ui/components/react/index.ts` 内导出 React 场景的短名组件，如 `Button`
- `proto-ui/components/vue/index.ts` 内导出 Vue 场景的短名组件，如 `Button`
- `proto-ui/components/wc/index.ts` 内导出 Web Component 场景的短名组件或 element 构造，如 `ButtonElement`

`proto-ui/components/index.ts` 可以重新导出带 host 前缀的别名：

```ts
export { Button as ReactButton } from './react';
export { ButtonElement } from './wc';
```

Quick Start 的主路径应优先展示 host 子入口，避免多 adapter 场景下命名冲突。

### 4.7 用户导入路径先使用相对路径

v0 不强制承诺：

```ts
import { Button } from 'proto-ui/components';
```

因为这依赖用户项目的路径别名或本地 package 解析能力。

v0 Quick Start 可以先展示：

```ts
import { Button } from '../proto-ui/components/react';
```

后续如果要支持裸 specifier，需要另行设计：

- 是否在 `proto-ui/` 下生成本地 `package.json`
- 是否修改用户 `tsconfig.paths`
- 是否要求 workspace / package manager 支持本地 package

这些都不进入 v0 首个闭环。

### 4.8 宿主 runtime 缺失时明确报错，不默认安装

React / Vue 这类宿主 runtime 是用户项目的基础依赖，不应由 Proto UI CLI 静默决定版本。

因此：

- `add react ...` 检查 `react`
- 如生成策略需要，也检查 `react-dom`
- `add vue ...` 检查 `vue`
- `add wc ...` 不需要检查宿主 runtime

缺失时 CLI 应给出明确错误和修复命令，例如：

```txt
[proto-ui] React runtime is required for adapter "react".

Missing dependency:
  react

Install it first:
  npm install react react-dom

Then run:
  npx @proto.ui/cli add react shadcn-button
```

后续可以考虑显式 `--install-peer`，但 v0 默认不自动安装宿主 runtime。

### 4.9 样式文件先生成，接入方式保持保守

Proto UI 的样式主要基于工具类与 CSS 变量。未来应减少样式冲突风险，包括：

- 更特殊的 CSS 变量命名
- adapter 暴露样式翻译相关参数
- 更清晰的样式隔离策略

但 v0 仍需要注意不同框架对全局 CSS import 的限制。例如部分 SSR / meta framework 不允许从任意组件模块 import 全局 CSS。

因此 v0 建议：

- `init` 生成样式文件
- Quick Start 要求用户在应用入口手动引入一次样式
- 不把 generated component index 自动 import 全局 CSS 作为唯一策略

后续可以增加 opt-in 参数，例如：

```bash
proto-ui init --auto-import-styles
```

或在 `add` 时按项目类型生成更激进的自动接入方式。

### 4.10 CLI 内置 registry，不动态猜测组合

CLI 需要内置支持矩阵与生成策略。

例如 registry 中应能表达：

- `shadcn-button` 属于 `@proto.ui/prototypes-shadcn`
- prototype 导入名是 `shadcnButton`
- React 导出名是 `Button`
- Web Component 导出名是 `ButtonElement`
- 是否需要 shadcn style preset
- 支持哪些 adapter

v0 不应尝试动态猜测任意 package 的 prototype 导出与组件命名。

### 4.11 `init` / `add` 应具备幂等语义

建议规则：

- 重复 `init`：保留已有 config，补齐缺失目录和缺失字段
- 重复 `add` 同一 adapter/component：不重复安装，不重复生成导出
- CLI 管理的 index 文件可以整体重建
- 用户不应被鼓励手动修改 generated index

更复杂的覆盖策略、`--force`、diff 保护可以后置。

---

## 5）后续 styled prototype 本地化路线

虽然 v0 首发不把 Git 写入式按需安装作为硬门槛，但 styled prototype 本地化仍应保留为明确演进方向。

建议长期分层为：

```txt
base prototype = stable behavior kernel, npm dependency
styled prototype = customizable style shell, optional local source
component facade = adapter composition output, generated
```

也就是说：

- `@proto.ui/prototypes-base` 继续作为稳定行为内核，通过 npm 安装
- `@proto.ui/prototypes-shadcn` 这类 styled library 后续可以支持 CLI 写入本地
- 用户可以修改本地 styled layer，以便二次定制样式封装
- 后续 update 只对本地化 styled layer 做 diff / 提示，不应粗暴覆盖用户改动

这条路线适合放在 v0 首发之后继续讨论：

- 是否叫 `eject`
- 是否叫 `vendor`
- 是否支持单组件本地化
- 如何记录 upstream 版本
- 如何处理 update diff

---

## 6）首发建议范围

v0 首个 CLI 闭环建议优先完成：

1. `proto-ui init`
2. `proto-ui add react shadcn-button`
3. `proto-ui/components/react/index.ts` 生成
4. `proto-ui/components/index.ts` host 别名导出
5. React / Vue / WC 宿主 runtime 检查策略
6. npm package 安装策略
7. Quick Start 与真实命令对齐
8. clean environment smoke

虽然 Quick Start smoke 可以先只覆盖 `shadcn-button`，但发布范围内的所有 prototype 最终都必须能与所有发布 adapter 组合。这个支持矩阵应作为 CLI registry 和测试工作的后续输入。

---

## 7）暂不进入首发门槛的内容

以下内容不进入 v0 第一个 CLI 闭环硬门槛：

- prototype 源码 Git 写入
- shadcn 单组件本地化 / eject
- 自动修改用户 `tsconfig.paths`
- 强承诺 `proto-ui/components` 裸 specifier 导入
- 自动安装 React / Vue runtime
- 自动判断并修改用户业务源码入口
- 完整 update / diff / merge 策略

这些能力都有价值，但应建立在首个可运行 CLI onboarding 闭环之后。

---

## 8）结论

v0 CLI 的首个平衡点是：

- `init` 轻量创建 workspace 与配置
- `add` 负责安装 npm package、检查宿主 runtime、生成 component facade
- 多 adapter 作为默认结构支持
- 用户从 `proto-ui/components/[host]` 导入 generated component
- prototype 首发先走 npm package
- styled prototype 本地化作为明确后续路线保留

这能让 Quick Start 先形成真实可运行闭环，同时避免首发被源码 vendoring、路径别名、样式自动接入和 update diff 等复杂问题卡住。
