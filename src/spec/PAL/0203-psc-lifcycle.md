---
rfc: 0203
title: Lifecycle（生命周期）
status: Draft
category: Core
version: 0.1.0
created: 2025-09-30
updated: 2025-09-30
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: [0200, 0201, 0202, 0204]
obsoletes: []
depends_on: [0001, 0002, 0100, 0200, 0201, 0202, 0204]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

本文件定义 PAL 中 **Prototype/Component 的生命周期阶段**与**可用 API**，并与 Event/Template/Context 的时序约束对齐。核心思想：**更新（update）是显式行为**；非更新导致的重绘（例如 styler 的样式重绘）**不得触发 render**。

---

## 1. 阶段总览（从早到晚）

> 阶段名称为协议术语；宿主可有自己的等价阶段，Adapter 负责映射（0201）。

1. **setup**（原型预演）

- **MUST**：这是 Prototype 的最早阶段，发生在组件 **create 之前**。
- 作用：声明 props/state/context、注册 hooks、准备 RootElement 的输出句柄等。
- 产物：用于 render 的 _SetupContext_（闭包或句柄，见 0200）。

2. **create**（构造）

- **MUST**：组件的构造函数/基础数据结构就绪，**通常尚未连接视图**。

3. **context init**（上下文建立，内部阶段）

- **MUST**：确立组件之间的订阅关系；在逻辑嵌套结构确定后即可开始。
- **MUST**：**必须**在 `connected` 回调**之前**完成。
- **NOTE**：该阶段**不向原型暴露**独立回调；对外通常认为“context 在 connect 后可用”。

4. **connect**（连接实际元素）

- **MUST**：组件与宿主的实际元素建立联系（RootElement 就绪）。
- **MUST**：自此 **Event 模块可用**（0204 的 `on/onGlobal` 等在此后实际绑定）。

5. **first render**（首次渲染）

- **MUST**：首次执行 `render`。
- **MUST**：Template 产生的子树被 Adapter 解析成宿主渲染树（0202/0201）。

6. **update**（显式更新，可选多次）

- **MAY**：由原型显式触发的更新；**会重新执行 `render`**，并协同宿主调度。
- **MUST**：**非 update 引起的任何重绘（如 visual/styler 变更）不得触发 `render`**。

7. **unconnect**（断开连接）

- **MUST**：组件与实际元素断开联系。
- **MUST**：**自动取消**事件订阅与 context 订阅（无需显式 off/unsubscribe）。

8. **destroy**（销毁）

- **MUST**：释放所有内部资源；对象进入不可用状态。

9. **error**（错误边界，特殊阶段）

- **MAY**：错误聚合/恢复回退的可选实现；与 0280（Diagnostics）协作。

---

## 2. 生命周期 API

<sig>
created(cb: () => void): void
connected(cb: () => void): void
beforeUnconnect(cb: () => void): void
</sig>

- **created(cb)**
  - **MUST**：在 **create** 阶段完成后调用；适合读取已就绪的基础结构，但 **RootElement 可能尚未可用**。
- **connected(cb)**
  - **MUST**：在 **connect** 完成且 **context 已可用** 后调用；此时 **Event 模块可用**。
  - 典型用途：注册事件、读取/提供 context 依赖、首帧前需要的副作用。
- **beforeUnconnect(cb)**
  - **MUST**：在 **unconnect** 前触发；用于最后的用户级清理（临时缓存、外部订阅）。
  - **NOTE**：事件与 context 的协议级清理是**自动**的，不依赖此回调。

> 其他可选 API（非强制）：
>
> - `onError(cb)`（若实现错误边界，则建议提供）
> - `onFirstRender(cb)`（如有需要显式标注首帧；也可在 `connected` 后依靠状态/事件触发）

---

## 3. 与 Event/Template/Context 的时序约束

- **Event**（0204）：
  - **MUST**：`on/off/onGlobal/offGlobal` 在 **connect 前**调用会被**排队**，到 `connect` 时批量生效（保持调用顺序）。
  - **MUST**：`connect 后`调用**立即生效**；`disconnect/destroy` 时**自动释放**。
  - **MUST**：多次 `on` 同一 `(type+handler+opts)` 仅首次生效；多次 `off` 幂等，不报错（可配置日志级别）。
- **Template/Render**（0202）：
  - **MUST**：`render` **不含事件与控制流**；仅返回结构与 Output 绑定。
  - **MUST**：**非 update** 引起的样式重绘（styler/visual）**不得重新执行 render**。
- **Context**：
  - **MUST**：`context init` 在 `connected` 之前完成；对外被视为“在 connect 后可用”。
  - **MUST**：`unconnect` 时自动解除 context 订阅。

---

## 4. “是否需要 onUpdate 生命周期”的判定

- **结论**：**不需要**，且**不建议**引入。
- **理由**：
  1. **显式性**：update 是原型作者主动调用，具有良好的可控性；
  2. **可观察性**：能触发更新的 state/props/context 由 asHook **公开**，不存在不可知的更新来源；
  3. **解耦**：样式重绘由 styler 处理，**不触发 render**，无需跨层次回调；
  4. **简化心智**：避免在“手动更新”的模型里再塞一组自动回调，带来竞态与副作用管理负担。
- **替代路径**：如需“渲染后收尾”，可在 `connected` 回调中基于状态/事件驱动实现，或提供一个本地的可组合 hook，而不是框架级 `onUpdate`。

---

## 5. 合规性要求（能力矩阵挂钩，示例）

- `LifecycleSetupBeforeCreate = YES`
- `LifecycleContextInitBeforeConnected = YES`
- `LifecycleConnectedEnablesEvents = YES`
- `LifecycleFirstRenderAfterConnected = YES`
- `LifecycleExplicitUpdateReRenders = YES`
- `LifecycleStyleRepaintNoRender = YES`
- `LifecycleAutoDisposeOnUnconnect = YES`
- `LifecycleErrorBoundary = YES|NO`（实现可选）
- `LifecycleAPIs = created/connected/beforeUnconnect`

---

## 6. 示例（非规范性）

### 6.1 最小时序示意

<example-js>
setup(p) {
  // setup：注册能力、定义状态
  const count = p.state.define('data-count', 0)

p.lifecycle.created(() => { // create 后：结构就绪，RootElement 可能尚未建立 })

p.lifecycle.connected(() => { // connect 后：RootElement 已就绪；Event/Context 可用 p.event.on('click', () => { count.set(count.get() + 1) p.update() // 显式更新，触发 render }) })

p.lifecycle.beforeUnconnect(() => { // 即将 unconnect：可做最后的用户级清理 })

return () => [ <div visual="p-4">Count: {count()}</div> ] } </example-js>

### 6.2 样式重绘不触发 render

<example-js>
// 通过 styler 响应状态变化：仅样式层增量刷新
// 例如 [data-hover]:bg-red-500 的可视反馈，不触发 render
</example-js>

---

## 变更记录

- 0.1.0 (2025-09-30): 初稿。确立阶段定义与时序约束；明确 update 为显式行为且非样式重绘不触发 render；提供 created/connected/beforeUnconnect；结论为不提供 onUpdate 生命周期。
