---
rfc: 0202
title: Template 模型与解析（PAL-PSC）
status: Draft
category: Core
version: 0.1.0
created: 2025-09-29
updated: 2025-09-29
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: [0200, 0201]
obsoletes: []
depends_on: [0001, 0002, 0100, 0200, 0201]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

本文件定义 **Template 模型与解析**：描述 `render` 返回值的结构、语义与限制，以及 Adapter 如何将该结构解析为宿主的渲染实现。Template 仅负责**结构与 Output 绑定**（视觉等），**不得**承担事件或控制流。它与 0200/0201 相互配合：0200 定义 Prototype 的对象模型，0201 规定 Adapter 的职责边界与映射关系。

## 1. 范围

- 本文规定 Template 的**数据结构**、**语义边界**与**Adapter 解析职责**。
- 不涉及事件系统（见 0204）、状态命名（见 0205）、样式系统的具体实现（将由 Styler/Output 相关 RFC 指定）。
- 不规定模板语法的具体“字面形式”（可用 JSX、XML AST、或等价的抽象结构），但规定其**语义与能力**。

## 2. 模型总览

### 2.1 Template 的结构

- **SHOULD**：Template 的数据结构是**树**（Tree）。
- **MUST**：Template 节点类型仅包括：
  - **Element**：结构节点（非 RootElement），可携带属性与 Output 绑定。
  - **Prototype**：子原型占位符（将在 Adapter 中递归解析为宿主渲染树）。
  - **Slot**：插槽标记（见 §5）。
- **MUST**：Template **不得**包含事件或控制流（条件/循环），详见 §6。

### 2.2 render 的返回与 RootElement 约束

- **MUST**：Prototype 的 `render` 返回结果**必须不包括**根节点（RootElement）。RootElement 恒存在并由 0200/0201 管理（事件亦附着其上）。
- **MUST**：`render` 的返回结果为 **Element 与 Prototype 组成的树**。
- **MUST**：`render` 支持**空返回**或**数组返回**（顶层可为多子节点），因为 RootElement 恒存在并作为容器。
- **MUST**：若 `render` 返回空值，则等价于“仅提供 Slot（见 §5）或无可见子树”。

### 2.3 与宿主渲染树的关系

- **MUST**：若宿主也有渲染树的概念，Adapter 在解析 Template 后应得到宿主的渲染树：
  - <sig>Adapter.renderer(protoTemplate): hostTemplate</sig>
- **MUST**：当宿主缺失等价概念时，Adapter 必须提供“语义等价或最接近”的实现（见 0201 §3.4 抹平不对称能力）。

## 3. 语法能力与限制

### 3.1 XML 风格嵌套与属性

- **MUST**：Template 必须允许 **XML 风格的嵌套与属性设置**。语法可以是 JSX、XML AST、或等价结构。
- **SHOULD**：Template 默认以 **HTML 标签名** 作为 `tagname`（如 `div`、`span`），Adapter **应**映射到宿主可能支持的其他标签/构件；若宿主并无对应标签，Adapter **应**选择最接近的结构或占位策略。

<example-tpl>
<div visual="p-4 h-10">
  <span visual="text-sm">Hello</span>
  <MyPrototype/>
</div>
</example-tpl>

### 3.2 Output 绑定与样式限制

- **MUST**：Template 必须允许为**子节点**设置 **Output 相关的属性**（视觉等非交互输出）。  
- **MUST**：Template **不得**绑定事件（事件仅能在 RootElement 的事件系统中声明与附着，见 0204/0201）。
- **MUST**：Template 对于样式的设置：
  - 支持 `class` 属性，但其仅作为 **output.visual 的语法糖**，在解析时翻译为 Output 绑定；**官方原型不得**使用 `class` 代替 `visual` 设计（避免与 Web 习惯强绑定）。
  - **不支持** `style` 行内样式属性（为保持跨宿主一致性与可移植性）。
  - 具体 visual 语法见 0208
- **MUST**：Output 绑定的形式应明确、可移植：
  - 子节点可写：`<div visual="p-4 h-10"/>`
  - **根元素**的视觉设置**不得**通过 Template 直接绑定；必须通过代码侧 `output.visual = "p-4 h-10"` 等 API 设置（RootElement 由框架管理，不受 Template 直接控制）。

<example-tpl>
<!-- 子节点：允许 -->
<div visual="p-4 h-10"/>
<!-- 根元素：禁止 template 绑定，只能在 setup/render 外围通过 output 句柄设置 -->
</example-tpl>

### 3.3 仅结构与 Output，无控制耦合

- **MUST**：Template 必须**不支持条件或循环语法**。  
  - 理由：Template 是 `render` 函数的**返回值**，`render` 本身已具备语言级控制流（如 JS/TS 中的 if/for/三元、返回数组等）。再引入模板级控制流会增加学习负担与耦合度，并与“组合式 API”理念冲突。

## 4. 节点与属性模型

- **Element 节点**：  
  - 属性：`visual`（优先）、`class`（语法糖 → 解析为 visual）、其他与 Output 相关的可移植属性（由 Output RFC 指定）。  
  - **MUST NOT**：事件类属性（如 `onClick`）在 Template 中无效，应在 RootElement 的事件系统中注册。  
- **Prototype 节点**：  
  - 表示一个子原型挂点。Adapter 需递归解析并将其映射为宿主的渲染子树。  
- **Fragment / 数组**：  
  - 顶层可返回数组，等价于无语义容器的并列子树。Adapter 需按顺序插入到 RootElement 下。  
- **属性冲突**：  
  - 当 `visual` 与其他样式属性（若未来扩展）发生冲突时，**MUST** 由解析器给出确定性优先级（建议 `visual > 其他`），并在实现文档中明确。  
  - 若同一节点多次声明 `visual`，**MUST** 视为合并（具体合并策略由 Styler/Output RFC 定义），冲突时 **SHOULD** 发出警告。

## 5. 插槽（Slot）

- **MUST**：Template 必须提供**插槽语法**，但插槽仅为**标记**，用于声明“此处接纳外部内容”。  
- **MUST**：**仅允许单一插槽**（单个匿名插槽）。  
- **MUST**：**不支持具名插槽**、**不支持多插槽**、**不支持插槽传参**。  
  - 理由：避免引入与 Render Props 等价的控制机制，保持“组合式 API”为唯一的控制扩展路径，降低耦合与复杂度。

<example-tpl>
<div visual="stack gap-2">
  <slot/>
</div>
</example-tpl>

## 6. 禁止事件与控制流

- **MUST**：Template **不得**绑定事件；事件注册仅通过 RootElement 的事件系统，见 0204/0201。  
- **MUST**：Template **不得**提供条件/循环等控制流语法；任何结构变体可由 `render` 的语言控制流与数组返回实现。  
- **Rationale**：Template 的定位是“**结构 + Output** 的**纯描述层**”。将控制与交互从模板剥离，有利于跨宿主的一致性与可验证性。

## 7. Adapter 的解析职责

- **MUST**：Adapter.renderer 应将 **protoTemplate → hostTemplate**，当宿主具备渲染树概念时。  
- **MUST**：当宿主缺失等价概念时，Adapter **必须**提供“语义等价或最接近”的实现（见 0201 §3.4）。  
- **MUST**：Adapter 在解析时必须执行以下规范化：
  - 将 `class` 解析为 `visual`（语法糖）；**官方原型**不得依赖 `class`。  
  - 拒绝或忽略 `style` 行内样式属性，并给出诊断（Debug/Diagnostics）。  
  - 校验 Template 不含事件绑定属性；发现时 **MUST** 报错或警告并拒绝解析。  
- **SHOULD**：Adapter 维护一个“标签映射表”，将 HTML 风格标签名映射到宿主支持的构件；缺少映射时采用最接近策略并记录告警。

## 8. 合规性与能力矩阵挂钩

- **MUST**：实现以下能力项（示例命名，最终以 0290 为准）：  
  - `TemplateTree = YES`（模板为树结构）  
  - `TemplateNoEvents = YES`（模板层禁止事件）  
  - `TemplateNoControlFlow = YES`（模板层禁止条件/循环）  
  - `TemplateOutputBinding = YES`（支持 `visual` 等 Output 绑定）  
  - `TemplateClassAsSugar = YES`（`class` → `visual` 语法糖）  
  - `TemplateNoInlineStyle = YES`（拒绝 `style`）  
  - `TemplateSingleSlot = YES`（单一匿名插槽）  
  - `HostTreeMapping = YES/NEAR`（宿主有树：YES；否则 NEAR 并注明策略）  
- **MAY**：宿主扩展可声明额外能力，但**不得**破坏本 RFC 的禁止项。

## 9. 示例（非规范性）

### 9.1 基本结构与 Output

<example-tpl>
<div visual="p-4 h-10">
  <span visual="text-sm">Hello</span>
  <MyPrototype/>
</div>
</example-tpl>

### 9.2 顶层数组返回（Fragment 等价）

<example-js>
// render 返回数组：等价于在 RootElement 下并列插入两个子树
return [
  <div visual="card"/>,
  <MyPrototype/>
]
</example-js>

### 9.3 根元素 Output 的设置（禁止在模板中）

<example-js>
// 在 setup / 外围逻辑中设置：
// p.output.visual = "p-4 h-10"
</example-js>

## 10. 兼容性与迁移

- 从“事件在模板中声明”的旧习惯迁移：  
  - 旧：`<button onClick="...">`  
  - 新：事件在 RootElement 的事件系统中通过组合式 API 绑定，模板仅保留结构与 Output。  
- 从“行内 style”迁移：  
  - 使用 `visual` 或 Output 的标准属性；若宿主需要更底层样式通道，应由 Styler/Output RFC 定义可移植接口。  
- 适配器实现应提供诊断（见 0280 Diagnostics）：当检测到模板层面违规（事件/条件/循环/style）时，给出明确错误与迁移建议。

## 变更记录

- 0.1.0 (2025-09-29): 初稿。确立树结构；RootElement 外置；禁止事件/控制流；Output 绑定与 class 语法糖；禁用 style；单一插槽；Adapter 的模板解析职责与宿主树映射。
