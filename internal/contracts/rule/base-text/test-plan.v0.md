# rule.test-plan.v0.md（测试计划）

> 目标：在“先实现、后完善测试”的节奏下，保证 rule 的测试矩阵可分阶段落地。

---

## 0. 测试矩阵结构

- When 维度：props / state(Owned|Borrowed|Observed) / context
- Intent 维度：feedback.style / state.set
- 组合层：仅覆盖交叉点新增语义

对应测试文件：

- `packages/runtime/test/contract/rule.matrix.when.v0.contract.test.ts`
- `packages/runtime/test/contract/rule.matrix.intent.v0.contract.test.ts`
- `packages/runtime/test/contract/rule.matrix.combine.v0.contract.test.ts`

---

## 1. 可靠基线（优先保证）

优先确保以下维度可靠可测：

- When 基线：`state`
- Intent 基线：`feedback.style`

目的：

- 当某个 when 维度被确认可靠，可用该 when 去覆盖新的 intent 维度
- 当某个 intent 维度被确认可靠，可用该 intent 去覆盖新的 when 维度

---

## 2. 分阶段落地计划

### 阶段 A（骨架与语义清单）

- 目标：只写 `it.todo`，固定语义
- 状态：已完成

### 阶段 B（基线实现验证）

- 完成 `when.state` 维度的可执行断言
- 完成 `intent.feedback.style` 维度的可执行断言
- 完成组合用例：
  - `when.state x intent.feedback.style`
  - `when.props x intent.feedback.style`

### 阶段 C（扩展 when 维度）

- 当 `intent.feedback.style` 稳定后：
  - 补全 `when.props` 与 `when.context`
  - 使用 `feedback.style` 作为稳定 intent

### 阶段 D（扩展 intent 维度）

- 当 `when.state` 稳定后：
  - 补全 `intent.state`
  - 使用 `when.state` 作为稳定 when

### 阶段 E（全矩阵完善）

- 完成剩余组合交叉点用例
- 逐步将 `it.todo` 替换为可执行断言

---

## 3. 执行原则

- 先保证“可靠维度”，再扩展其他维度
- 组合层只验证交叉点新增语义
- 不重复维度层已覆盖的通用语义
