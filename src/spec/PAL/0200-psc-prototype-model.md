---
rfc: 0200
title: Prototype 基本模型（PAL-PSC）
status: Draft
category: Core
version: 0.1.0
created: 2025-09-29
updated: 2025-09-29
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: [0002]
obsoletes: []
depends_on: [0001, 0002]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

本文件定义 **Prototype 基本模型**，确立 PAL-PSC 线（Props / State / Context）的核心语义。  
Prototype 是 PAL 中的最小交互单元，最终通过 Adapter 或 Compiler 映射为宿主的 Component。  
本 RFC 确定了 Prototype 的对象模型、`setup` 与 `render` 的关系、RootElement 的约束、以及 asHook 的复用机制。

## 1. 范围

- 本文规定 Prototype 的抽象结构与最小能力。  
- 不涉及：事件系统细节（见 RFC 0204）、状态命名约束（见 RFC 0205）、能力矩阵（见 RFC 0290）。  

## 2. 对象模型

### 2.1 定义

Prototype 由 `setup` 定义，`render` 作为可选子作用域。  
一个典型声明形式：

<example-js>
const MyButton = definePrototype({
  name: 'my-button',
  setup: (p) => {
    const count = p.state.define('data-count', 0)
    return () => {
      return <button>{count()}</button>
    }
  }
})
</example-js>

### 2.2 setup

- **MUST**：所有 Prototype 必须定义 `setup`，它是语义入口。  
- **MUST**：`setup` 是唯一位置来注册 Props、State、Context、生命周期钩子与 asHook。  
- **MAY**：`setup` 可返回一个 `render` 函数；若缺省，则系统提供默认 render。

### 2.3 render

- **MAY**：Prototype 可以省略 `render`，此时默认 render = RootElement + 插槽。  
- **MUST**：`render` 能访问 `setup` 定义域内的 *SetupContext*。  
  - 可以通过 **闭包** 或 **等价句柄/代理** 实现。  
- **MUST**：若 `render` 返回 null/void，则等价于“返回 RootElement + 插槽”。  
- **MUST**：`render` 仅能返回模版结构与 Output 绑定（如样式/属性）；**不得绑定事件**。  
- **MAY**：Prototype 可以没有直接 Output，用于逻辑/上下文提供。  

### 2.4 RootElement

- **MUST**：每个 Prototype 拥有且仅拥有一个 RootElement。  
- **MUST**：所有交互事件必须绑定在 RootElement 上。  
- **MUST**：若某子元素需要独立交互，必须被拆分为新的 Prototype。  

## 3. PSC 切分维度

- **Props**：调用者传入的配置参数，通常为静态或半动态。  
- **State**：组件对外可观察的交互状态；变化可被订阅或驱动渲染。  
- **Context**：父子 Prototype 间的数据共享与订阅关系，在生命周期的连接阶段建立。  

> 事件（Event）与生命周期（Lifecycle）在 Prototype 中存在锚点，但其详细规范由独立 RFC 描述。

## 4. Hook / Behavior

- **MUST**：协议支持 asHook，用于逻辑复用与角色切换。  
- **MUST**：Hook 冲突必须检测（语义维度冲突 → 抛错或警告）。  
- **SHOULD**：asHook 应尽早插入 setup 流程，以便影响后续逻辑。  
- **MAY**：Prototype 可以不使用任何 Hook。  

## 5. 合规性要求

- Prototype **MUST** 定义 `setup`。  
- Prototype **MAY** 定义 `render`；若缺省，等价于默认 render。  
- Prototype **MUST** 拥有唯一 RootElement。  
- Prototype **MUST** 遵守 PSC 切分语义。  
- Prototype **SHOULD** 能通过 Adapter 或 Compiler 转换为目标宿主的 Component；  
  - 若不适用（逻辑型/特化型/非 UI 宿主），**MUST** 在文档中说明“无 Component 产物”的原因。  

## 6. 示例（非规范性）

### 6.1 逻辑型 Prototype

<example-js>
const MyProvider = definePrototype({
  name: 'my-provider',
  setup: (p) => {
    p.context.provide('theme', 'dark')
    // 无直接 render，默认 RootElement + 插槽
  }
})
</example-js>

### 6.2 使用 asHook

<example-js>
const MyThumb = definePrototype({
  name: 'my-thumb',
  setup: (p) => {
    p.asHook(asScrollThumb())
    return () => <div class="thumb"/>
  }
})
</example-js>

## 7. 兼容性与迁移

- 与 PAL-Roles 等未来变体对比：  
  - PAL-PSC 使用 Props / State / Context 三分法。  
  - 其他变体可能选择不同切分，但必须映射到能力矩阵（RFC 0290）。  

## 变更记录

- 0.1.0 (2025-09-29): 初稿，确立 setup 必须、render 可选、RootElement 唯一、PSC 切分维度、asHook 支持与冲突检测。
