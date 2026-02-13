# 模板节点基础契约（Template / Template Node v0）

本契约定义 Proto UI 中 template 语法（renderer）所产出的节点（Template Node）是什么、能表达什么，以及它与“根节点（Root Node）/宿主根容器”的关系。

> 范围（Scope）
>
> - Template Node 的概念定位与最小能力边界
> - Root Node（宿主根容器）与 Template Node 的边界与组合关系
> - v0 的基础节点类型与特殊节点入口（slot）
> - template 返回值在 adapter 中的消费方式（仅限结构层级，不涉及 patch/commit 细节）
>
> 非目标（Non-goals）
>
> - 不规定 TemplateNode 的详细字段形状（对象结构）
> - 不规定 adapter 的 diff/patch 策略与生命周期实现
> - 不定义 props/state/event/feedback 的具体 API（由对应模块契约定义）
> - 不扩展节点类型全集（v0 只要求最小集合）

---

## 1. 概念定位

### 1.1 Template Node 是什么

Template Node 是 Proto UI **template 语法产出的“结构节点单位”**，用于描述“组件内部结构”——也就是**根节点内部要渲染出来的子树**。

Template Node 在不同宿主环境中可能映射为不同概念：

- React：通常对应 `ReactNode`（不是 Fiber，也不一定是 DOM）
- Vue：更接近 `VNode`
- Web Component / Vanilla：通常对应 DOM Node
- Flutter：更接近 `Widget`（或可组合的 Widget 子树单位）

Proto UI **不强制** adapter/host 选择哪一种对象作为 Template Node 的物理承载，只要求它能稳定表达结构，并被后续阶段确定性消费。

---

## 2. Root Node（宿主根容器）与 Template Node

### 2.1 Root Node（宿主根容器）是什么

Root Node 是每个 Prototype 在适配到某个宿主后，**必然存在的“组件根容器”**。它用于承载组件级通路能力，例如：

- 承载样式/反馈（例如 feedback 的样式注入点）
- 作为事件、状态、暴露 API 等通路的锚点（具体由各模块契约定义）
- 作为结构渲染的挂载点（Template Children 的容器）

在 adapter-web-component 中，Root Node 通常对应：

- Light DOM 模式：自定义元素本体（例如 `<component-name>`）
- Shadow DOM 模式：自定义元素本体 + 其 `shadowRoot` 作为内部挂载容器

> 关键边界：Root Node 属于最终产物（output artifact）的一部分，但不属于 template 语法返回的节点序列。

---

### 2.2 Template 返回的是什么

Prototype 的 render 返回值（通过 renderer.el / renderer.slot 等构造）描述的是：

> **Root Node 内部应当渲染的 children（结构子树）**

因此：

- template **不声明 Root Node**
- template 返回的最外层节点（例如 `r.el('div', ...)`）**不是 Root Node**
- Root Node 由 adapter/host 侧创建并保证存在，template 只提供其内容

这与测试中常见写法一致：

- `const root = el.shadowRoot ?? el;`
- `root.innerHTML` 仅反映 Root Node 内部容器的内容，而不是 Root Node 标签本身

---

### 2.3 Root Node 与 Template Node 不可互相转化

Root Node 与 Template Node 是两个层级、两个职责的实体：

- Root Node：组件级根容器，承载通路能力与挂载点
- Template Node：结构节点，用于描述 Root Node 内部子树

在语义上：

- Template Node **不能**在运行时或编写期“升级”为 Root Node
- Root Node **不会**作为 Template Node 出现在 template 返回值中

如果开发者需要“新增一个组件根容器”（新的 Root Node），唯一方式是：

> 定义一个新的 Prototype，并在 template 中使用该 Prototype（由 adapter/host 产生新的 Root Node）。

---

## 3. Template Node 的能力边界（v0）

当一个节点是 Template Node（即由 template 语法产出）时，它应当被视为结构节点，最小能力边界为：

- 可参与树结构组合（可拥有 children）
- 可承载样式相关表达（以宿主可接受的形式）

v0 不要求 Template Node 直接承担组件级通路能力（props/state/event/expose/feedback 的通路锚点由 Root Node 承载；具体细则由相关契约定义）。

---

## 4. 节点类型（v0）

### 4.1 基础节点类型

v0 仅要求支持最小基础节点类型集合，以保证 template 系统可用与可测试。

- 目前最小可用类型：`'div'`（作为基础容器节点标识）
- v0 不要求支持更多类型

> 注：这里的 `'div'` 表示“基础容器节点标识”。在 Web host 中它通常映射为 HTMLDivElement；在非 Web host 中可映射为等价容器概念。

### 4.2 特殊节点：slot

某些特殊节点不通过基础类型声明，而由 renderer 的专用入口生成，例如：

- `renderer.slot()`（或等价入口）

slot 的具体语义与约束由独立契约定义；在本契约中，它只被视为一种合法的 Template Node 产出形式。

---

## 5. Template 的基本编写方式与结构示意

Prototype 通常返回一个 TemplateChildren（可能是单节点、数组或 null），由 adapter 将其渲染进 Root Node 的内部容器。

示例（概念性）：

```ts
const P: Prototype = {
  name: 'x-basic',
  setup() {
    return (r) => [r.el('div', 'hello')];
  },
};
```

### 5.1 期望的最终结构（Light DOM，Web Component）

当 adapter 采用 light DOM（`shadow=false` 或未启用 shadow）时，最终结构可示意为：

```html
<x-basic>
  <div>hello</div>
</x-basic>
```

---

### 5.2 期望的最终结构（数组展开）

示例：

```ts
const P: Prototype = {
  name: 'x-array',
  setup() {
    return (r) => [r.el('div', 'a'), r.el('div', 'b')];
  },
};
```

最终结构示意：

```html
<x-array>
  <div>a</div>
  <div>b</div>
</x-array>
```

---

## 6. 与其他契约的关系

- TemplateChildren 的语法形态约束与扁平化规则见：Template Normalize（v0）
- slot 的语义与限制见：slot 相关独立契约
- Root Node 上承载的各通路能力细则分别由 props/state/event/feedback/expose 等模块契约定义
- adapter 如何 commit/patch 不在本契约范围内

---

## 7. Trace Map（追踪点，建议保持更新）

- 参考测试（Web Component adapter）：
  - `packages/adapters/web-component/test/commit.test.ts`（basic / array expansion / slot）

- 相关契约：
  - `internal/contracts/template/normalize.v0.md`（Template Normalize v0）
  - `internal/contracts/adapter-web-component/slot-light-dom.v0.md`
