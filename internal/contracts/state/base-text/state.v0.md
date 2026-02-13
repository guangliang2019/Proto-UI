# state.v0.md（中文底本）

> Status: Draft – v0（实现对齐）
>
> 本契约规定 Proto UI v0 的 **state**：语义状态槽（state slot）的定义方式、句柄能力（handle capabilities）、执行期（phase）与生命周期（dispose）约束，以及最小错误模型。
>
> **定位声明（v0）**：state 是一种“语义化的可变状态单元”，用于在组件实例内保存值，并通过句柄进行受控读写。state 本身不负责渲染调度、不建立依赖关系，也不隐式触发更新。

---

## 0. 范围与非目标

### 0.1 范围（v0）

state 提供：

- 在 setup 期通过 `def.state.*` 创建语义状态槽
- 返回 `OwnedStateHandle<V>` 作为最小拥有视图（owned view）
- 通过句柄执行受控操作：
  - `value/get`：读取当前值
  - `setDefault`：设置默认值（setup-only）
  - `set`：设置当前值（runtime-only）
- 严格执行期约束（setup vs runtime）
- 严格销毁约束：实例 dispose 后句柄不可再用

### 0.2 非目标（v0）

v0 明确不提供 / 不承诺：

- **自动渲染/更新**：state 变化不会隐式触发 render/commit
- **依赖收集/订阅推导**：读取 state 不会建立隐式依赖
- **值域校验**：spec 元信息在 v0 不要求强制校验（可作为描述存在）
- **跨通路投影语义**：Borrowed/Observed/App-side 等视图与投影不在本文定义
- **交互信号**：interaction-derived / fromInteraction 不在本文定义
- **watch 语义**：本文不定义 watch 的触发/顺序/重入等语义（若存在，另文规定）

---

## 1. 术语

- **状态槽（state slot）**：组件实例内的一个语义状态单元，保存一个值 `V`。
- **语义名（semantic）**：定义状态槽时提供的字符串，用于表达意图与诊断信息。
- **OwnedStateHandle<V>**：setup 期创建状态槽后返回的“最小拥有视图”句柄。
- **setup 期**：原型 setup 执行上下文（`def` 可用的阶段）。
- **runtime 期**：setup 之外的执行上下文（回调、运行时逻辑等；由系统执行期守卫界定）。
- **disposed**：实例被销毁；相关模块/能力句柄失效。

> 执行期边界由运行时系统守卫（exec-phase guard）提供。本文只规定 state 在各执行期允许的操作集合。

---

## 2. 定义 API：`def.state.*`（setup-only）

### 2.1 共同要求

- 每个 `def.state.*` 必须接收 `semantic: string`
- 每个 `def.state.*` 必须返回 `OwnedStateHandle<V>`
- `def.state.*` 只能在 setup 期调用；否则必须抛错

### 2.2 v0 支持的定义（实现对齐）

- `def.state.bool(semantic, defaultValue)`
- `def.state.enum(semantic, defaultValue, spec)`
- `def.state.string(semantic, defaultValue, spec?)`
- `def.state.numberRange(semantic, defaultValue, spec)`
- `def.state.numberDiscrete(semantic, defaultValue, spec?)`

> 注：spec 在 v0 可作为元信息存在（例如 options/min/max/step/clamp），但本文不要求实现对值进行强制校验。

---

## 3. OwnedStateHandle（最小拥有视图）

### 3.1 形状要求（v0）

`OwnedStateHandle<V>` 至少必须提供：

- `value: V` 或 `get(): V`（二者取其一；若两者都提供，语义应一致）
- `setDefault(v: V): void`
- `set(v: V, reason?: StateSetReason): void`

> v0 只规范 Owned 视图。其他视图（Borrowed/Observed）若存在，属于“句柄视图契约”范围，不在本文展开。

### 3.2 执行期规则（v0）

- 读取（`value/get`）：
  - setup 与 runtime 期均允许
- `setDefault(v)`：
  - setup-only
  - 在 runtime 调用必须抛错
- `set(v, reason?)`：
  - runtime-only
  - 在 setup 调用必须抛错

### 3.3 生命周期规则（v0）

实例 dispose 后：

- `value/get` 必须抛错
- `setDefault` 必须抛错
- `set` 必须抛错

> 在 `unmounted` 回调执行期间（实例尚未 dispose），句柄操作仍允许；dispose 发生后才严格禁止。

---

## 4. 与渲染/更新的关系（v0）

### 4.1 不隐式触发更新

state 的变更（`set`）**不得**自动触发渲染或提交：

- 状态变化后，DOM/输出保持不变，直到宿主/控制器显式调用 `run.update()`（或等价更新入口）

### 4.2 初次渲染可见性（v0 最小约束）

- 在首次 commit 之前发生的 runtime 期 `set`（例如 created 回调中）应当对首次 render 可见
- setup 期不允许 `set`（见 §3.2），因此不讨论“setup 写入对首次 render 的可见性”

> 本节只限定“无隐式更新 + 基本可见性”，不引入依赖收集、批处理、调度等更复杂语义。

---

## 5. 元信息与诊断（v0）

实现可以在句柄或内部记录中保留最小元信息以支持诊断：

- `semantic`
- `kind`（bool/enum/string/number.range/number.discrete）
- 可选：spec 描述（options/min/max/step/clamp 等）

本文不规定元信息的可访问 API（是否暴露给用户由实现与其他契约决定），但错误信息应尽可能包含 semantic 与操作名。

---

## 6. 错误模型（v0）

### 6.1 执行期违规

对 §2.1、§3.2 中的执行期违规，必须抛错。

最小诊断信息应包括：

- `prototypeName`（若可得）
- `op`（例如 `state(<semantic>).set`）
- `expectedPhase` 与 `actualPhase`（或能推导的等价信息）

### 6.2 生命周期违规（disposed）

对 §3.3 中的 dispose 后调用，必须抛错，并能区分为“disposed”原因。

> v0 不要求统一错误码/错误类，但实现应保持可区分性，便于测试与排错。

---

## 7. v0 契约测试（最小覆盖）

实现至少应通过以下验证：

1. `def.state.*` setup-only，且返回 `OwnedStateHandle`（含 `value/get`, `setDefault`, `set`）
2. 执行期规则：
   - `setDefault` 在 runtime 抛错
   - `set` 在 setup 抛错
3. 渲染/更新关系：
   - created 期 `set` 对首次 render 可见
   - mounted 后 `set` 不触发隐式 re-render（需显式 update）
4. dispose 规则：
   - unmounted 回调内句柄仍可用
   - dispose 后 `value/get/setDefault/set` 全部抛错

---

## 8. 相关契约（非规范性链接）

- 句柄视图（Owned/Borrowed/Observed）：`state-handle-views.v0.md`
- expose 投影与 App-side state：`expose/*.v0.md`
- asHook 投影：`role/asHook*.v0.md`
- interaction signals / fromInteraction：`interaction-signals/*.v0.md`（或对应目录）
- 执行期守卫：`runtime/exec-phase-guard.v0.md`
