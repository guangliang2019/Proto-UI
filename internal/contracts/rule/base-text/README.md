# rule（中文底本）

> 状态：Draft – v0（定位与立场）
>
> 本文是 `internal/contracts/rule/README.md` 的中文底本，用于阐述 rule 的定位、收益与对扩展模块的立场。

---

## 1. rule 的定位与收益

rule 是 Proto UI 的**声明式意图编排层**：

- 将“条件 → 意图”表达为可序列化的 RuleIR
- 允许跨平台的无损迁移（例如 TS 原型 → Dart 原型）
- 为优化与编译提供稳定输入（语义不丢失）

在 v0：

- rule 是最具“收益杠杆”的机制之一
- 让行为从“命令式回调”转为“可分析的数据”
- 为未来的 Compiler 方案铺路，而不会被 v1 推翻

---

## 2. rule 扩展包的立场

Proto UI 鼓励为 **特定 host / 特定场景** 构建 rule 扩展包：

- 只在明确满足条件时介入（可做强优化）
- 以 module 形式接入，不改变 rule 的可序列化核心
- 让社区在 v0 阶段的最佳实践被“保值”并可被复用

这类扩展模块并非 v0 的主线工作，但**属于推荐范畴**。Proto UI 自身也会推动这类实践的积累。

---

## 3. Web 平台的推荐实践（v0）

当同时满足：

- `when` 依赖的是已 expose 的 state
- adapter 启用 `expose-state-web`（映射为 CSS 变量 / DOM Attribute）
- intent 仅为 `feedback.style`

则可以将 rule 编译为**静态选择器样式**，而不必在 runtime 执行。这是一种可被直接优化的规则形态，且对语义完全等价。

---

## 4. 前向兼容说明

rule 的价值不会随 Compiler 时代到来而消失：

- 语义越明确，优化与编译空间越大
- 已发现的最佳实践不会“被忘记”，而是演化为可复用的扩展模块

rule 的扩展建设是长期资产，而非一次性的短期工程。

---

## 5. 执行层架构（概述）

rule 的执行分为三层：

- **rule 核心**：评估 + 合并，默认产出 Plan
- **执行器**：独立 module，负责将 Plan 转换为实际执行
- **adapter**：可定制执行器，通过 host-cap 介入执行策略

扩展包可以在满足条件时**短路 Plan**，直接执行或交由 adapter。

---

## 6. 契约索引（v0）

When 依赖：

- `when.expr.v0.md`
- `when.deps.props.v0.md`
- `when.deps.state.v0.md`
- `when.deps.context.v0.md`
- `when.deps.state.wiring.v0.md`
- `when.deps.context.wiring.v0.md`

Intent 能力：

- `intent.compose.v0.md`
- `intent.feedback.style.v0.md`
- `intent.state.v0.md`

其他：

- `define.setup-only.v0.md`
- `runtime.apply.v0.md`

---

## 7. 测试矩阵索引（建议）

When 依赖维度：

- props
- state（Owned / Borrowed / Observed）
- context

Intent 能力维度：

- feedback.style
- state.set

组合建议（示例）：

- when.props × intent.feedback.style
- when.state(Owned/Borrowed/Observed) × intent.state
- when.context × intent.feedback.style
- when.context × intent.state
