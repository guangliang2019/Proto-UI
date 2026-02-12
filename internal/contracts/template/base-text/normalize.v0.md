# 模板子节点规范化（Template Normalize v0）

本契约定义 Proto UI 在 v0 中如何对模板子节点（`TemplateChildren`）进行**规范化（normalize）**。

> 范围（Scope）：  
> 模板编写阶段的子节点语法规范化，即 `normalizeChildren` 的行为约定。
>
> 非目标（Non-goals）：
>
> - 不涉及 TemplateNode 的结构或语义定义
> - 不涉及 DOM patch、adapter commit、或任何运行期渲染语义
> - 不提供模板系统的整体说明或能力描述

---

## 设计动机

Proto UI 的模板编写语法需要满足以下基本目标：

- **跨平台**：不同 host / adapter 不应影响模板的基础语义
- **可序列化 / 可调试**：模板结构应具备稳定、可观察的形态
- **确定性**：相同输入在不同运行环境中应得到一致结果

规范化（normalize）的职责，是将**作者侧的宽松表达**转换为**稳定、可预测的中间形态**，以便后续阶段（编译、适配、提交）使用。

---

## 基本原则（v0）

Template Normalize（v0）遵循以下原则：

1. **默认策略优先**  
   v0 仅保证默认 normalize 策略的稳定性。  
   其他策略属于“被容忍但不鼓励”的扩展面。

2. **在不损失作者意图的前提下保持简单**  
   如果一种处理不会造成不可逆的信息丢失（类似有损压缩），则应优先选择更简单、歧义更少的规则。

3. **规范化只处理“语法形态”，不解释“语义结构”**  
   normalize 不负责判断节点是否“合理”或“可渲染”，只负责约束可移植的编写语法。

---

## 类型定义（v0）

在 v0 中，模板子节点相关类型定义如下：

- `TemplateChild`  
  = `TemplateNode | string | number | null`

- `TemplateChildren`  
  = `TemplateChild | TemplateChild[] | null`

> 说明：  
> `undefined` 被**刻意排除**在模板编写语法之外。

---

## 默认规范化策略（Default Normalize Policy）

v0 中的**默认规范化策略**为：

- `flatten = "deep"`
- `keepNull = false`

除非特别说明，下文规则均基于该默认策略。

---

### 1）顶层输入为 `undefined` 的处理

当 **顶层输入值** 为 `undefined` 时：

- 规范化结果为 `null`

`null` 是模板语法中对作者可见的**规范空值（canonical empty value）**。

> 注意：  
> 此规则仅适用于**顶层输入**。  
> `undefined` 作为子节点出现时的行为见第 4 条。

---

### 2）`null` 子节点的默认行为

在 `keepNull = false` 的默认策略下：

- 子节点数组中的任意 `null` 会被视为“空”并移除
- 若移除后不再存在任何子节点，则最终结果为 `null`

---

### 3）boolean 子节点不合法

在任意层级中，若遇到 boolean 类型的子节点：

- 规范化 **必须抛出错误（throw）**

理由如下：

- boolean 常见于 JSX 风格的条件表达
- 其含义依赖宿主环境（truthy / falsey）
- 会破坏模板语法的可移植性与确定性

如需表示“空”，应使用 `null`，或在逻辑层直接省略该子节点。

---

### 4）子节点位置的 `undefined` 不合法

当 `undefined` 作为**子节点**出现（即非顶层输入）时：

- 规范化 **必须抛出错误（throw）**

理由：

- `undefined` 会泄漏宿主相关行为
- 会破坏模板语法的可移植性

---

### 5）数组扁平化（Array Flattening）

#### 默认策略：`flatten = "deep"`

- 任意嵌套层级的数组会被递归展开
- 最终得到一个**单层扁平列表**

#### 非默认策略（v0 中被容忍但不鼓励）

- `flatten = "shallow"`

  - 仅允许一层数组结构作为输入
  - 深度超过 1 的嵌套数组必须抛出错误

- `flatten = "none"`
  - 数组作为子节点输入即不合法
  - 任意数组输入必须抛出错误

> 说明：  
> 非默认 flatten 模式仅用于兼容特定场景或实验性需求。  
> v0 不承诺这些模式在未来版本中的长期稳定性。

---

### 6）输出形态的规范化（Result Canonicalization）

完成所有处理后，规范化结果必须符合以下规则之一：

- 若结果为空 → 返回 `null`
- 若结果仅包含一个子节点 → 返回该子节点本身
- 否则 → 返回一个**扁平数组**（`TemplateChild[]`）

---

## 校验边界（Validation Boundary）

Template Normalize（v0）**不校验**对象类型子节点是否为合法的 `TemplateNode`。

其职责仅限于：

- 执行数组扁平化策略
- 处理 `null`
- 对 boolean 与 `undefined`（子节点位置）抛出错误

因此：

- 任意 **非 null 的 object**，即使不符合 `TemplateNode` 的结构，也可能被原样保留在规范化结果中

该取舍基于以下考虑：

- Proto UI 面向多 host、多语言运行环境
- v0 的 normalize 设计刻意保持轻量
- 更严格的结构校验留给后续阶段（如 compile / commit）或工具链完成

---

## 对后续阶段的基本要求

Adapter 或 compiler 在使用规范化结果时，应遵循以下约定：

- 不应假设仍会接收到嵌套数组（默认策略下不会出现）
- 不应假设 `undefined` 会出现在结果中
- 必须将 `null` 视为规范的“空子节点”表示
- 如有严格的 `TemplateNode` 校验需求，应在 commit / compile 阶段完成，并抛出确定性错误

---

## 示例（默认策略）

输入 → 输出：

- `undefined` → `null`
- `null` → `null`
- `"a"` → `"a"`
- `["a", null, "b"]` → `["a", "b"]`
- `["a", ["b", ["c"]]]` → `["a", "b", "c"]`
- `[null, null]` → `null`

必须抛出错误的情况：

- `[true]`
- `["a", undefined]`
- （`flatten = "shallow"`）`["a", ["b", ["c"]]]`
- （`flatten = "none"`）`["a"]`

v0 校验边界示例（对象被保留）：

- `[{}]` → `{}`
- `[{ type: "div", children: "x" }]` → `{ type: "div", children: "x" }`

---

## 术语对照（非规范性）

- normalize / normalization：规范化
- canonical / canonicalization：规范形态 / 归一化
- flatten（deep / shallow / none）：扁平化（深 / 浅 / 禁用）
- authoring syntax：编写语法
- portability：可移植性
- validation boundary：校验边界
