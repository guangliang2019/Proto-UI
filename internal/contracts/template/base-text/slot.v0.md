# Template Slot（协议约束）

本契约在**协议层（protocol level）**定义 Proto UI 中 **slot** 的语义与约束。

> 重要说明：  
> 本文档中的约束是**有意的协议设计选择**，  
> 而不是某种临时性的 “v0 折中方案”。
>
> 设计背景：  
> Proto UI 是一个明确划分边界的协议系统，用于分隔：
>
> - **Prototype 生态**（交互与语义编写）
> - **Adapter / Compiler 生态**（宿主映射与实现）
>
> Proto UI 优先选择  
> **严格、稳定、跨宿主一致的语义**，  
> 而非编写层面的表达能力或便利性。
>
> 若需要更丰富的 slot API（如命名 slot、多 slot、参数、默认内容等），  
> 这些能力应当属于 **构建在 Proto UI 之上的框架**，  
> 而不是 core / runtime / contracts 的职责。

---

## 作用范围（Scope）

本契约覆盖以下内容：

- Template 层的保留节点（reserved node）：`slot`
- 编写期 API：`r.slot()`
- 所有 adapter / compiler **可以依赖的结构性约束**

---

### 非目标（Non-goals）

本契约**不涉及**：

- DOM `<slot>` 的具体行为（这是宿主相关的，例如 Shadow DOM）
- slot 的投影 / 分发算法（adapter 层职责，例如 Light DOM 下使用 MutationObserver）

---

## Slot 节点（Template 层）

在 Template 层，slot 表现为一个**保留模板节点**：

- `type = { kind: "slot" }`

slot 是一个**标记（marker）**，  
用于表示“来自宿主 / 外部组合的 children 插入点”。

slot 本身不携带任何结构或语义信息，  
也不描述 children 的来源、形态或投影规则。

---

## 协议级约束（必须遵守）

### S1：Slot 必须是匿名的（无名称）

- slot **不得**具备名称
- `r.slot()` **不接受任何参数**

**原因**：  
命名 slot 会引入宿主相关的映射复杂度，  
并导致不同平台之间的语义不一致。

---

### S2：每个模板最多只能包含一个 slot

- 单次 render 输出中 **必须只包含 0 或 1 个 slot**
- 出现多个 slot 时 **必须抛出错误**
  - 错误可在 template 构造期或 commit 阶段抛出
  - 推荐在 core / 协议层尽早拒绝

**原因**：  
多 slot 需要一套完整的投影模型，包括顺序、路由与冲突规则，  
而这些规则在多数宿主平台中并不共享。

---

### S3：Slot 不携带参数或属性

- slot **不得**接收任何参数
- Proto UI core / runtime **不定义** slot props 或参数契约

**原因**：  
参数化 slot 隐含了组件模型层级的契约，  
这类能力被有意排除在 Proto UI core 的职责范围之外。

---

## Adapter / Compiler 可以依赖的事实

Adapter / Compiler 实现者可以**安全地假设**：

- slot 要么不存在，要么只出现一次
- slot 始终是匿名的，且不携带任何参数
- 若宿主支持原生 slot 机制（例如 Shadow DOM），可直接映射
- 若宿主不支持，可使用宿主提供的机制实现投影（例如 Light DOM + MutationObserver）

---

## 关于扩展与框架层能力

构建在 Proto UI 之上的框架 **可以** 提供更丰富的 slot 编写体验，  
例如：

- 命名 slot
- 多 slot
- slot 参数
- slot fallback / 默认内容

但这些能力 **必须在编译或装配阶段** 被降解、转换或约束为  
**符合本契约的最小 slot 语义集合**。

Proto UI core / runtime / contracts  
**不会**为上述能力提供直接支持。

---

## 与其他契约的关系

- TemplateNode 的基础语义见：**Template / Template Node v0**
- TemplateChildren 的规范化规则见：**Template Normalize v0**
- 原型级组合禁止规则见：**No Prototype-Level Composition v0**
