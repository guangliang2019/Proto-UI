# when.deps.state.wiring.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 **rule 与 state 的重评估绑定**：
> 任何被 rule 引用的 state 变化必须触发重评估。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- 依赖声明模型
- 重评估触发条件
- phase 约束
- 错误处理与最小诊断

### 0.2 非目标（v0）

- 不定义可依赖的 state 类型（见 visibility 契约）
- 不定义 intent 实现
- 不定义具体调度策略或批处理策略

---

## 1. 依赖模型

### 1.1 依赖声明

规则通过 RuleIR 声明依赖。

若 RuleIR 引用某个 state：

- 该 state 必须被视为反应式依赖
- 依赖基于 **state 当前值**，而不是回调或订阅

### 1.2 值访问

在 rule 评估期间：

- 必须通过 `state.get()` 读取当前值
- 除非明确记录，禁止跨评估缓存值

---

## 2. 重评估触发

### 2.1 state 变化触发

当任一被依赖的 state 从 `prev` 变为 `next`：

- 必须触发该 rule 的重评估
- 与 state handle view 无关（Owned/Borrowed/Observed）

state 变化定义为 `prev !== next`，遵循该 state 的相等性规则。

### 2.2 禁止依赖合并假设

- 运行期 **不得**假设多次变化一定可安全合并
- 可以批处理以优化，但语义正确性不得依赖批处理

---

## 3. Phase 约束

### 3.1 评估阶段

- 重评估必须发生在 runtime 期
- setup 期不得执行重评估
- 运行期必须在调用前确保 phase 正确

### 3.2 与更新周期的关系

如宿主存在 update/callback 周期：

- 重评估可以对齐到该周期
- 但语义必须等价于“每次相关 state 变化后都会被评估”

---

## 4. View 独立性

handle view 不影响重评估：

- Owned state 变化必须触发
- Borrowed state 变化必须触发
- Observed state 变化必须触发

Observed 只读约束 **不得削弱** rule 的反应性。

---

## 5. 错误处理

运行期必须报告以下错误：

- 评估期间访问了无效/已销毁的 state
- 重评估发生阶段违规

建议的错误上下文：

- rule 标识
- state 标识
- 当前 runtime phase

---

## 6. 非目标

本契约不：

- 定义多规则间排序
- 定义优先级或冲突解决
- 强制同步评估
- 规定具体调度策略

---

## 7. 总结

- rule 是 state 驱动的声明式逻辑。
- 被依赖的任意 state 变化都必须触发重评估。
- view 类型不影响反应性。
