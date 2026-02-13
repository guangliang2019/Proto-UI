# when.deps.state.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 **rule 能依赖哪些 state handle view**，以及这种依赖的语义含义。v0 对“观察”宽松，对“变更”严格禁止。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- rule 可引用的 state 范围
- state handle view 对依赖合法性的影响
- 依赖后的运行期保证

### 0.2 非目标（v0）

- 不定义重评估触发（见 `when.deps.state.wiring.v0.md`）
- 不定义 state 的创建或暴露（见 `state.v0.md`）
- 不定义 intent 的实现（见 `intent.*.v0.md`）

---

## 1. 术语

- **State**：由 `def.state.*` 创建的状态实例，内部标识为 `StateId`
- **State Handle View**：
  - Owned：拥有视图（可读写）
  - Borrowed：借用视图（可读写，能力受限）
  - Observed：观察视图（只读）
- **Rule 依赖**：RuleIR 中引用的 state handle view，并参与 when 评估

---

## 2. 允许的 state 依赖

### 2.1 总体规则

rule 可以依赖 **在定义作用域内语义可见** 的任意 state handle view，包括：

- Owned
- Borrowed
- Observed

前提：该 state 在原型定义作用域内可达。

### 2.2 Observed 依赖

rule **允许**依赖 Observed view，即使：

- Observed 不允许写入
- Observed 不允许通过回调被直接观察

原因：

- rule 是声明式、可计划的（v0）
- 允许 rule 观察只读视图，可驱动内部状态机并不破坏抽象边界

---

## 3. 依赖后的保证

当 rule 依赖任意可见性的 state handle view：

- 运行期必须将该 state 视为反应式依赖
- 该 state 的变化必须能触发 rule 重评估（见 wiring 契约）
- rule 必须通过 `get()` 读取 state 当前值，不得使用回调

---

## 4. v0 限制与边界

### 4.1 观察不等于写入

when 能观察某个 state handle view **不代表** intent 必然可以写入该 state。可写性由 intent 契约决定（例如 Observed 不可写）。

### 4.2 禁止命令式逻辑

依赖 state **不等于** 允许命令式逻辑：

- rule 仍必须保持可序列化、可分析
- 需要时序或历史依赖的逻辑应通过显式状态机或回调实现

---

## 5. 诊断建议（非强制）

当 rule 依赖 Observed view 时，建议提供诊断信息：

- state 的语义名称（若存在）
- view 类型（Owned/Borrowed/Observed）
- 所属原型或 asHook 来源

目的：防止隐性耦合。

---

## 6. 非目标

本契约不：

- 赋予 Observed view 额外 API
- 放松 Observed view 的只读约束
- 定义评估频率或调度策略
- 定义规则优先级或冲突解决

---

## 7. 总结

- rule 依赖是“观察”，不是“控制”。
- Observed view 可以驱动 rule 行为。
- rule 必须保持声明式且禁止 mutation。
