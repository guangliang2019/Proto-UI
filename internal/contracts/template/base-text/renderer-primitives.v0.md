# Renderer Primitives 契约（Template Authoring API v0）

本契约定义 Proto UI core 提供的 **renderer primitives**（模板编写原语）的协议级语义：它们如何构造 TemplateNode、如何解释参数、如何应用 Template Normalize，以及 slot 的构造与防御性约束。

> 范围（Scope）
>
> - `createRendererPrimitives()` 暴露的 API 形态：`el` 与 `r.slot`
> - `el()` 的参数分派与合法输入（TemplateProps / children）
> - TemplateProps 的允许字段集合与校验规则
> - children 的规范化（normalizeChildren）何时被调用、默认策略是什么
> - `r.slot()` 的参数约束与输出形态
>
> 非目标（Non-goals）
>
> - 不定义 TemplateNode/TemplateType 的完整字段验证（如 `type` 的合法性）
> - 不定义 adapter 的 commit/patch 行为
> - 不定义 DOM `<slot>` 或 Light DOM 投影算法
> - 不定义 PrototypeRef 的使用（Template 层禁止原型组合由独立契约定义）

---

## 1. 背景与核心原则

Renderer primitives 用于构造 Proto UI 的 Template（渲染蓝图）：

- Template 必须可序列化、可调试
- Template **不得**携带宿主实例值（HTMLElement / VNode / Fiber / Widget 实例等）
- 编写语法中的“空值”必须以 `null` 作为规范表示（canonical empty）

---

## 2. API 概览

`createRendererPrimitives()` 返回：

- `el(type, [props], [children])`：构造一个 `TemplateNode`
- `r.slot()`：构造一个 slot 保留节点（reserved node）

> 说明：本契约仅定义上述 API 的语义与约束，不要求固定函数名或具体实现结构；但官方 core/runtime/adapters 应保持一致以支撑 contract tests。

---

## 3. 数据类型（v0）

### 3.1 TemplateNode

`TemplateNode` 具有以下字段（v0）：

- `type: TemplateType`
- `style?: TemplateStyleHandle`
- `children?: TemplateChildren`

其中：

- `TemplateType = string | PrototypeRef | ReservedType`
- `ReservedType = { kind: "slot" }`
- `TemplateChild = TemplateNode | string | number | null`
- `TemplateChildren = TemplateChild | TemplateChild[] | null`

> 注：`undefined` 被刻意排除在 TemplateChildren 编写语法之外，以保持跨宿主可移植性。

---

### 3.2 TemplateProps（仅允许最小集合）

v0 中 `el()` 允许接收的 props 对象称为 `TemplateProps`，其合法键集合为：

- `style?: TemplateStyleHandle`

除此之外的任何键均为非法。

---

## 4. `el()`：参数分派规则（规范性）

`el()` 必须支持以下调用形态，并按固定规则解释参数：

### 4.1 `el(type)`

- `props = undefined`
- `childrenInput = null`

返回的 `TemplateNode.children` 必须为 `null`（经 normalize 后）。

---

### 4.2 `el(type, a)`

若第二个参数 `a` 是 `TemplateProps`（见 5.1），则：

- `props = a`
- `childrenInput = null`

否则：

- `props = undefined`
- `childrenInput = a`

---

### 4.3 `el(type, props, children)`

当传入三个参数时：

- 第二个参数必须是合法 `TemplateProps`
- `childrenInput = children`

若第二个参数不是合法 `TemplateProps`，必须抛出错误。

---

## 5. TemplateProps 校验（规范性）

### 5.1 允许的 props 形态

一个对象被视为合法 `TemplateProps`，当且仅当：

- 它是 object（非 null）
- 它的键集合为空，或仅包含 `style` 一个键

否则为非法。

---

### 5.2 `style` 的类型约束

若 `props.style` 存在，则：

- 必须为合法 `TemplateStyleHandle`
- 否则必须抛出错误

> 注：`TemplateStyleHandle` 的合法性由 feedback/style 子系统定义；renderer primitives 仅负责调用其判定函数并拒绝非法输入。

---

## 6. children 规范化（normalize）行为（规范性）

### 6.1 normalize 的调用点

`el()` 必须对 `childrenInput` 调用 `normalizeChildren(childrenInput, normalizeOptions)`，其输出作为 `TemplateNode.children`。

---

### 6.2 默认 normalize 策略（v0）

默认 normalize 策略必须为：

- `flatten = "deep"`
- `keepNull = false`

含义与详细规则由 **Template Normalize（v0）** 契约定义。

---

## 7. `r.slot()`：slot 原语（规范性）

### 7.1 参数约束

`r.slot()` **不得**接收任何参数。

若传入任何参数，必须抛出错误。

> 注：slot 的协议级约束（匿名、最多一个、无参数）由 **Template Slot（Protocol Constraint）** 契约定义。renderer primitives 在构造期做参数防御属于“尽早拒绝”的实践。

---

### 7.2 输出形态

`r.slot()` 必须返回一个 `TemplateNode`，等价于调用：

- `el({ kind: "slot" })`

即 slot 在 Template 层的表达形式必须为：

- `type = { kind: "slot" }`

---

## 8. 与 adapter 的边界（重要）

### 8.1 `el()` 不验证 `type` 的合法集合

`el(type, ...)` 在 v0 中 **不要求**验证 `type` 是否为合法 `TemplateType` 的成员，也不要求拒绝 `PrototypeRef`。

原因：

- renderer primitives 是编写期原语，负责稳定构造结构与 normalize；
- “PrototypeRef 在 Template v0 中禁止”属于 adapter/commit 层的拒绝语义（见独立契约）。

---

### 8.2 PrototypeRef 的拒绝由 adapter 负责（引用）

当 adapter/commit 遇到 `TemplateNode.type` 为 `PrototypeRef` 时：

- 必须抛出错误
- 错误消息必须为：
