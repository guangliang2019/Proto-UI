# 模板契约：禁止原型级组合（No Prototype-Level Composition v0）

本契约定义 Proto UI 在 v0 中 **禁止在 Template 语法中进行原型级组合**
（prototype-level composition）的约束。

---

## 状态（Status）

- 版本：v0
- 作用域（Scope）：**Template**（render 输出语言）
- 适用对象（Applies to）：Proto UI 的官方 adapter / compiler 实现

---

## 摘要（Summary）

在 v0 中，Proto UI **不定义、也不允许**在 Template 内进行原型级组合。

任何 `TemplateNode` **不得**使用 `PrototypeRef` 作为其 `type`。

组件之间的组合（composition）**应当发生在宿主层（host layer）**，
例如 React / Vue / Web Component / Vanilla 等宿主框架或平台所提供的组合机制中。

---

## Adapter 必须遵守的行为（规范性）

### 规则（Rule）

当 adapter 在处理 Template 时，若遇到某个 `TemplateNode` 的 `type`
为 `PrototypeRef`，  
**必须抛出错误（MUST throw）**。

该行为属于**强制拒绝语义（rejection semantics）**。

---

### 必须使用的错误签名（v0）

错误信息 **必须** 与以下字符串完全一致：

```

[Template] PrototypeRef is not allowed in Template v0.

```

该约束用于保证不同 adapter 之间的契约行为可被机械化校验。

---

### 说明（Notes）

- 本契约描述的是 **拒绝语义（rejection semantics）**，
  而非编写体验或使用建议。
- 即便高级用户通过 `as any` 等方式构造出不合法的 Template 对象，
  官方 adapter **仍然必须**以确定性的方式拒绝该输入。
- Adapter **不得**尝试以任何“变通方式”间接支持
  `PrototypeRef` 形式的组合。

---

## 通俗解释（非规范性）

可以用一句话概括本契约的含义：

> **在一个原型的模板结构中，绝对不允许出现另一个原型。**

Template 描述的是**宿主根节点内部的结构**，
而不是组件之间的组合关系。

任何试图在 template 中“嵌套”另一个 Prototype 的写法，
在 Proto UI v0 中都是**非法的**。

---

### 常见的非法用法示例（非规范性）

以下写法在 Proto UI v0 中**明确不被允许**：

- 将某个 `PrototypeRef` 作为 template 节点的 `type`
- 在 `renderer.el(...)` 的 tag / type 位置传入一个 Prototype
- 任何等价于“在 template 里直接使用另一个原型”的表达形式

即使该写法在某些宿主框架（例如 React）中是常见或合理的，
在 Proto UI 的 Template 层也**必须被拒绝**。

---

### 对 adapter 实现者的含义（非规范性）

本契约不仅禁止一种“已经定义的错误用法”，  
也要求 adapter **主动拒绝一种“语义上不存在的用法”**。

具体而言：

- adapter **不得**将 `PrototypeRef` 视为一种合法的 template 节点类型
- adapter **必须**在检测到该情况时抛出预设的契约错误
- adapter **不得**尝试以任何方式“支持”“降级处理”
  或“容错处理”该输入

这种显式拒绝行为，用于表明 adapter
**严格遵守 Template v0 的语义边界**，
而不是对非法输入采取宽容或推测性的处理策略。

---

## 设计动机（Rationale）

Proto UI 是一个刻意在以下两个平面之间保持分离的协议系统：

- **Prototype 生态**  
  用于组件原型的定义，描述交互语义与能力边界（Component Authoring）
- **Adapter / Compiler 生态**  
  用于将原型映射到具体宿主环境中（Host Integration）

在 Template 层禁止原型级组合，是一种**有意的设计选择**，原因包括：

1. 原型级组合会显著增加 adapter / compiler
   在多宿主环境中的实现复杂度
2. 会推动 Proto UI 向“框架式编写模型”滑移，
   而非协议式描述
3. 在已有 `slot`、`context` 与宿主自身组合机制的前提下，
   新增的语义价值有限
4. 会模糊心智模型：Prototype 本质上是在
   “发明一种新的宿主元素”

Proto UI 明确选择
**稳定、严格的语义边界**，
而非以编写便利性为优先目标。

---

## 定义（非规范性）

### v0 中允许的 `TemplateNode.type`

- `string`  
  （表示宿主环境中的元素标签或等价概念）
- `ReservedType`  
  （例如 `{ kind: "slot" }` 等由独立契约定义的保留类型）

---

### v0 中禁止的 `TemplateNode.type`

- `PrototypeRef`

---

## 与其他契约的关系

- TemplateNode 的结构与定位见：**Template / Template Node v0**
- TemplateChildren 的规范化规则见：**Template Normalize v0**
- Prototype 的定义与组合方式由 Prototype / Adapter / Host 层契约共同约束

---

## Trace Map（追踪点，建议保持更新）

- 参考测试（Web Component adapter）：
  - `packages/adapters/web-component/test/commit.test.ts`
- 相关契约：
  - `internal/contracts/template/normalize.v0.md`
