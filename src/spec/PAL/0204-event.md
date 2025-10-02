---
rfc: 0204
title: Event（事件系统）
status: Draft
category: Core
version: 0.1.0
created: 2025-09-30
updated: 2025-09-30
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: [0200, 0201, 0202]
obsoletes: []
depends_on: [0001, 0002, 0100, 0200, 0201, 0202]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

本文件定义 PAL 的**事件系统**：基础 API（`on/off/onGlobal/offGlobal`）的语义、生命周期时机、RootElement 绑定约束、事件分类及最小统一事件对象。  
特别地，**asHook 必须显式暴露其订阅细节（handlers）**，以便调用方在必要时进行取消或替换（即便这不是推荐路径），从而避免“不可修改”的黑盒处境。

> Template 层禁止事件（见 0202）；所有事件**仅**通过本模块注册到 RootElement 或全局通道（见 0201）。

---

## 1. 基础 API（最小集）

<sig>
on(type: string, handler: Function, options?: EventOptions): void
off(type: string, handler?: Function): void

onGlobal(type: string, handler: Function, options?: EventOptions): void offGlobal(type: string, handler?: Function): void </sig>

- **MUST**：`on`/`onGlobal` 在组件 **connect 之后**才会实际绑定；**disconnect/destroy** 时自动释放。
- **MUST**：`off`/`offGlobal` 用于提前释放指定订阅；未指定 `handler` 时表示按 `type`（和可选命名空间，见 §3）批量释放当前所有者的订阅。
- **MAY**：实现可提供便捷返回值（取消令牌），但规范路径仍以 `off(type, handler)` 为主。

<sig>
type EventOptions = {
  capture?: boolean,
  passive?: boolean,
  once?: boolean,
  priority?: number,
  ns?: string     // 命名空间（可选），用于批量解除
}
</sig>

---

## 2. 生命周期与时机

- **MUST**：`connect` 之前调用的 `on/off`/`onGlobal`/`offGlobal` **会被排队**，并在 `connect` 时一次性生效；其先后顺序按调用顺序保证。
- **MUST**：`connect` 之后调用则**立刻生效**。
- **MUST**：在 `disconnect/destroy` 时，所有存活订阅会**自动释放**（自动释放不依赖调用者显式 `off`）。
- **SHOULD**：多次 `off` 同一 `handler` 为**幂等**；**不报错**，但可通过日志等级从 `info` 到 `warning` 配置。
- **MUST**：多次 `on` 同一 `type+handler` 仅**首次生效**（去重规则见 §3.3）。
- **MUST**：`on/off` **可**在生命周期钩子、条件/循环语句、乃至**自己的回调中**反复调用；API 不限制嵌套或调用时机（前提是遵守上述排队与自动释放语义）。

---

## 3. 所有权、命名空间与去重

### 3.1 所有权（Ownership）

- **MUST**：每次订阅都带有**所有者**（OwnerID）：
  - 原型本体订阅 → `owner = proto:<protoId>`
  - asHook 内部订阅 → `owner = hook:<hookId>`
- **MUST**：`off`/`offGlobal` **仅影响当前所有者**的订阅，默认不跨所有者清理（保护封装与组合）。

### 3.2 命名空间（Namespace）

- **SHOULD**：支持 `options.ns` 作为**命名空间**标签，便于调用方批量解除自身订阅：
  - `off(type, undefined /* no handler */)` → 清自身该 `type` 下的订阅
  - `off(type, { ns: 'drag' })`（实现可提供重载或辅助 API）→ 清自身该 `type`+命名空间的订阅

### 3.3 去重规则

- **MUST**：去重键为 `(type, handler, capture, passive, once, ns)` 的组合；重复订阅仅首次生效。
- **SHOULD**：对重复订阅发出 `info` 级日志（可配置）。

---

## 4. asHook 的暴露义务（可修改但不鼓励）

- **MUST**：asHook **必须**通过**稳定的公开接口**暴露其订阅 `handler`（或可等价取消/替换的句柄集合），使调用方**能够**：
  1. 用 `off(type, handler)` 取消 hook 的某条订阅；
  2. 在必要时替换该 `handler`（例如包装、拦截）。
- **SHOULD**：asHook 提供只读的**元数据视图**（type、options、ns、简短描述），避免直接暴露实现内细节。
- **SHOULD**：asHook 文档明确“支持外部修改”的**边界与风险**；在可预测范围内保持兼容（例如保证事件语义不被破坏、提供恢复默认的能力）。
- **MUST**：即使暴露了 `handler`，asHook 依然必须**自行负责清理**（在 `disconnect/destroy` 自动释放）。
- **MAY**：实现可在 Debug 模式下提供更丰富的“可观察视图”；生产环境最小暴露，避免耦合。

> 设计取舍：我们优先鼓励**组合式 API**与 hook 的自洽，但为“高阶用户”和官方 hooks 提供修改阀门，避免“不可修改”的封闭黑盒。

---

## 5. 绑定目标与 RootElement

- **MUST**：本地事件实际绑定在 **RootElement**（或宿主等价物）上；Template 层**禁止事件**（见 0202）。
- **MAY**：Adapter 采用委托/代理方式实现（捕获阶段代理、命名通道等），但**对外语义不变**。
- **MUST**：如宿主无等价元素（极端场景），Adapter **必须**提供“语义等价或最接近”的事件通道（承接 0201 §3.4 抹平不对称）。

---

## 6. 事件分类与映射（按交互媒介）

适配器 **MUST** 提供“PAL 事件名 ↔ 宿主事件名”的映射，并声明缺失/部分实现。建议的主类：

- **Pointer / Mouse**：`pointerdown/up/move/enter/leave`、`click/dblclick`、`wheel`、`contextmenu`、`drag*`
- **Touch / Gesture**：`touchstart/move/end`；高级手势（`gesture:pinch/swipe/longpress`）可在扩展中映射到原语
- **Keyboard**：`keydown/keyup`（`keypress` 可按宿主裁剪并提供等价策略）
- **Focus / A11y**：`focus/blur/focusin/focusout` 及可访问性相关回调（按宿主能力标注）
- **Text / IME**：`input/beforeinput/compositionstart/update/end`
- **Clipboard**：`copy/cut/paste`
- **Scroll / Visibility**：`scroll`、`resize`、`visibilitychange`、`intersection`（后两者可作为扩展能力）
- **Global / System**：通过 `onGlobal` 订阅，如 `window:resize`、`document:visibilitychange`、`app:back`

---

## 7. 事件对象（EventLike）的最小统一面

<sig>
interface EventLike {
  type: string
  target: any
  currentTarget: any
  timeStamp: number
  pointerType?: 'mouse'|'touch'|'pen'
  clientX?: number
  clientY?: number
  deltaX?: number
  deltaY?: number
  key?: string
  code?: string
  modifiers?: { alt?: boolean, ctrl?: boolean, shift?: boolean, meta?: boolean }
  preventDefault(): void
  stopPropagation(): void
}
</sig>

- **MUST**：`preventDefault()` 与 `stopPropagation()` 行为与宿主一致；在 `passive` 环境中禁止 `preventDefault()` 并输出诊断。
- **SHOULD**：为常见字段提供跨宿主的同名访问；缺失字段以 `undefined` 表示。

---

## 8. 错误与诊断

- **MUST**：以下情况**必须**抛出明确错误或警告（对接 0280 Diagnostics）：
  - 模板层事件（违背 0202）
  - 在未 `connect` 且未进入排队队列的非法绑定
  - 非法事件名或宿主不支持且无替代映射
- **SHOULD**：提供泄漏守卫（leak guard）：`destroy` 后仍存活的订阅应被自动清理并记录诊断。
- **SHOULD**：重复 `on`、不存在的 `off` 仅记录（等级可配置），不抛异常。

---

## 9. 示例（非规范性）

### 9.1 生命周期时机与排队

<example-js>
setup(p) {
  // connect 之前调用：将被排队，等 connect 时统一绑定
  p.event.on('pointerdown', onDown, { passive: true })
  p.event.off('pointerdown', onDown) // 仍然排队，等 connect 时按顺序生效

p.lifecycle.onConnect(() => { // connect 之后调用：立即生效 p.event.on('keydown', onKey) }) } </example-js>

### 9.2 asHook 暴露 handler 并允许外部取消/替换

<example-js>
// asHook 内部
function asDrag() {
  const handlers = {
    start: (e) => { /* ... */ },
    move:  (e) => { /* ... */ },
    end:   (e) => { /* ... */ },
  }
  return {
    name: 'drag',
    mount(p) {
      p.event.on('pointerdown', handlers.start, { ns: 'drag' })
      p.event.onGlobal('pointermove', handlers.move, { ns: 'drag' })
      p.event.onGlobal('pointerup', handlers.end, { ns: 'drag' })
    },
    // 暴露：调用方可读取并替换（风险自负；文档需声明边界）
    getHandlers() { return handlers },
  }
}

// 调用方修改（不推荐但允许）const h = asDrag().getHandlers() p.event.off('pointerdown', h.start) h.start = (e) => { /_ wrap or replace _/ } p.event.on('pointerdown', h.start, { ns: 'drag' }) </example-js>

---

## 10. 合规性与能力矩阵挂钩（示例）

- `EventAPIs = on/off/onGlobal/offGlobal`
- `EventBindToRoot = YES`
- `EventQueueBeforeConnect = YES`
- `EventImmediateAfterConnect = YES`
- `EventIdempotentOff = YES`
- `EventDeduplicateOn = YES`
- `EventNestedCallsAllowed = YES`
- `EventOwnership = YES`
- `EventNamespace = YES`
- `EventHookExposeHandlers = YES`
- `EventNoTemplateBinding = YES`
- `EventGlobalChannel = YES`
- `EventMappingTables = PROVIDED`
- `EventDiagnostics = YES`

---

## 变更记录

- 0.1.0 (2025-09-30): 初稿。定义 on/off/onGlobal/offGlobal；明确生命周期时机（排队/立即/自动释放）；去重与幂等；RootElement 绑定；事件分类与 EventLike；诊断策略；asHook 必须暴露 handlers（可修改但不鼓励）。
