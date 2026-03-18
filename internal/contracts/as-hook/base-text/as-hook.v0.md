# as-hook.v0.md（中文底本）

> **状态**：Draft – v0（contract-first）  
> **版本**：v0
>
> 本文档定义 **Proto UI 的 asHook 契约**：asHook 的定义语法、调用与去重规则、返回结构、痕迹标注、以及与模块 API 的合并策略。
>
> **定位声明（v0）**：asHook 是“可组合形式的原型”，用于逻辑复用；它不具备主体性，其引入的效果附着于调用它的原型。

---

## 0. 范围与非目标

### 0.1 范围（v0）

asHook 在 v0 中提供：

- 通过 `defineAsHook(prototype)` 定义 asHook 原型
- asHook 调用器的统一输入/输出语义（支持具名调用器）
- 去重规则（同名 asHook 仅生效一次）
- 返回结构的基准形状（按模块分类）
- asHook 痕迹（只读可查询）
- asHook 与模块 API 的合并策略

### 0.2 非目标（v0）

以下内容 **不属于 v0 目标**：

- asHook 的具体实现架构（runtime/kernel/orchestrator 内部组织）
- 各模块内部的去重/合并策略（由模块自定义）
- 统一的 token 聚合层（disposers 与 handles 先行）
- asHook 的跨语言 API 设计（英文版另文）

---

## 1. 术语

- **asHook 原型**：由 `defineAsHook` 定义的原型。
- **调用者原型**：在其 setup 中调用 asHook 的原型。
- **asHook 调用器**：用于调用 asHook 的函数（可包含具名子调用器）。其挂载位置与创建方式不在本文展开。
- **模块结果**：asHook 返回值中按模块分类的字段（如 `state/context/event/feedback/...`）。
- **disposer**：可撤销副作用的函数/句柄（如取消事件订阅、移除样式）。
- **handle**：可供调用者操纵的句柄（如 BorrowedStateHandle）。
- **asHook 痕迹**：记录调用链路的只读元信息，供诊断/语义判定使用。
- **特权 asHook**：由官方内建、可使用内部 API 的 asHook（非 `defineAsHook` 产物）。

---

## 2. 定义与命名

### 2.1 `defineAsHook(prototype)`

- 输入：`prototype`，形状同 `definePrototype`（具备 `name` 与 `setup`）。
- `setup` 的返回契约与 `definePrototype` 保持一致：`RenderFn | void`。
- 输出：asHook 原型。
- 语义：
  - asHook 仍是“原型定义”，但其 **引入效果必须附着在调用者原型上**。
  - asHook 不产生独立主体。

### 2.2 命名规范（v0 强制）

- asHook 的 `name` 必须满足：`/^as[A-Z]/`。
- 不满足命名规范必须抛错。

---

## 3. 调用器与入参

### 3.1 调用器形态（v0）

- asHook 通过 **调用器** 被调用。
- 调用器必须支持以下最小形态：
  - `asX()`
- 调用器允许扩展为具名子调用器：
  - `asX.mode()`

> 具名子调用器的创建方式属于实现细节；本文只规定其输入/输出与行为一致性。

### 3.2 运行期约束

- asHook 调用器 **只能在 setup 期调用**。
- 在 runtime 期调用必须抛错。

---

## 4. 返回结构（AsHookResult）

### 4.1 基准形状（v0）

`AsHookResult` 是 **asHook 调用器** 的返回值（不是 authored prototype 的 `setup` 返回值）。

其结构必须是一个对象，形态对齐 def 句柄风格：

- `props`：模块结果（通常为 disposers）
- `state`：BorrowedStateHandle（或其集合）
- `context`：模块结果（订阅/发布句柄或 disposers）
- `event`：模块结果（disposers）
- `feedback`：模块结果（disposers）
- `render`：可选 render 片段（若 authored prototype 的 `setup` 返回 render，则复制到此字段）
- 允许出现 **自定义字段**（用于扩展）

> 仅 `state` 强制为 Borrowed 视图；其转换由 state module 提供的 SPI 完成。

### 4.2 模块结果的语义约束

- `state`：
  - 由 asHook 引入的 state handle 必须投影为 Borrowed 视图。
- 其它模块（`props/context/event/feedback/...`）：
  - 返回值应以 disposer 为主（取消订阅/撤销副作用）。
  - 允许返回与模块定义一致的句柄/能力对象。

### 4.3 render 片段

- 若 `AsHookResult` 中存在 `render`，该 render 可被调用者用于组装其 render。
- asHook 不直接触发渲染提交。

---

## 5. 合并策略（附着于调用者）

- asHook 引入的 **所有模块结果**（除 `state` 的 Borrowed 投影外） **直接附着/合并到调用者原型**。
- 模块层面的去重/冲突处理由各模块自行负责；asHook 不额外介入。

---

## 6. 去重规则（默认同名跳过）

### 6.1 默认规则

- 在一次调用链路中，若重复引入同名 asHook：
  - **仅第一个生效**，后续同名 asHook 必须跳过
  - 跳过不应抛错

> 该规则基于 asHook `name` 的唯一性假设。

### 6.2 配置型特权 asHook 的例外

v0 允许存在一类 **配置型特权 asHook**（例如后续的 focus 系统）：

- 其安装语义是单例的
- 重复调用 **不得**重复安装同一系统能力
- 但重复调用 **可以**继续贡献 setup 期配置 patch

对于该类特权 asHook：

- 重复调用时，runtime 应复用同一底层 handle / 安装结果
- 新调用提供的配置应按其专属契约做确定性合并
- “后来的配置覆盖前面的配置”只应发生在 **允许晚配/覆盖的字段** 上
- 不允许安全覆盖的字段必须抛错，或至少给出明确告警

> 该例外不适用于普通 `defineAsHook(...)` 产物；普通 asHook 仍遵循 6.1。

---

## 7. 痕迹（只读可查询）

- 调用者原型必须留下 asHook 痕迹（只读）。
- 痕迹至少应包含：
  - asHook 名称
  - 应用顺序（或足以复原顺序的信息）
  - 是否为特权 asHook 的标记
- 外部可读，但不可写。

---

## 8. 特权 asHook（官方内建）

- 特权 asHook 不通过 `defineAsHook` 创建。
- 特权 asHook 允许使用内部 API；其副作用 **不要求可撤销**。
- 痕迹中必须标注其特权属性。
- 若特权 asHook 具备可配置性，其返回值应优先暴露 setup-only 的重配置能力，或等价的配置 patch 入口，而不是要求作者依赖重复安装副作用来完成覆写。

---

## 9. Debt（v0 暂缓）

- 统一 token 聚合层（用于语义追踪与可视化）暂不要求实现。
- v0 仅要求各模块返回 disposers 与 handles。
