# Event Token 元信息契约（v0）

> 状态：Draft – implementation-aligned  
> 版本：v0
>
> 本文档定义 **EventListenerToken 所携带的最小可读元信息（metadata）**，
> 用于提升代码可读性、调试与追踪能力。
>
> 本文档为 **规范性（Normative）** 契约。

---

## 0. 范围与非目标

### 0.1 范围（v0）

本契约规定：

- `EventListenerToken` **必须**携带最小的可读元信息，用于表达：
  - 该 token 代表哪一类事件注册
  - 注册的事件类型与作用域
- 元信息在 token 生命周期内 **必须保持稳定**。
- 元信息 **仅用于人类理解与诊断**，不参与事件匹配或调度逻辑。

### 0.2 非目标（v0）

以下内容明确不在 v0 范围内：

- 元信息不用于事件取消、去重或分发判定
- 不要求结构化、可枚举的语义分类字段
- 不要求 adapter / runtime 对元信息做任何解释
- 不要求与 trace / profiling 机制强绑定

---

## 1. EventListenerToken 形态（v0）

`EventListenerToken` **必须**包含以下字段：

- `id: string`

  - 不透明、稳定的唯一标识
  - 仅用于精确定位一次事件注册

- `meta: EventTokenMeta`
  - 可读元信息对象，用于表达该 token 的语义含义

### 1.1 EventTokenMeta（最小要求）

`meta` 对象 **必须**包含：

```ts
{
  kind: "root" | "global";
  type: string;
}
```

含义说明：

- `kind`

  - `"root"`：绑定到组件实例的根交互目标
  - `"global"`：绑定到 adapter 定义的全局交互目标

- `type`

  - 事件类型字符串（如 `"press.commit"`、`"pointer.down"`、`"native:click"`）
  - 其合法性由事件类型契约定义
  - 使用 `string` 而非具体联合类型以避免版本耦合

### 1.2 可选字段（v0）

`meta` **可以**包含以下字段，但不作强制要求：

```ts
{
  options?: unknown;
  label?: string;
}
```

- `options`

  - 原始监听选项（或其摘要）
  - 仅用于诊断展示
  - **不得**用于事件匹配或行为判断

- `label`

  - 人类可读的说明文本
  - 由 `token.desc()` 设置（见下文）

---

## 2. Token 描述（desc）语义

`EventListenerToken` **必须**提供如下方法：

```ts
token.desc(text: string): EventListenerToken
```

### 2.1 规则（规范性）

- `desc()` **必须是 setup-only**

  - 在 setup 之后调用 **必须抛出阶段违规错误**

- `desc()` **必须返回同一个 token 实例**
- 在开发环境中：

  - `desc(text)` **应当**将文本记录到 `token.meta.label`

- 在生产环境中：

  - `desc()` **可以**是 no-op
  - 但 **必须可调用**，且返回同一 token

### 2.2 语义约束

- `label` 仅用于说明与诊断
- 不得影响事件注册、绑定、分发或取消行为

---

## 3. 一致性要求

- `token.meta.kind` / `token.meta.type` **必须**与创建该 token 的
  `def.event.on / onGlobal` 调用一致
- token 创建完成后，其 `meta` 中除 `label` 外的字段 **不得被修改**
- 模块内部实现变更 **不得影响** token 已暴露的元信息

---

## 4. 与诊断系统的一致性（可选）

如果事件模块提供诊断快照（如 `getDiagnostics()`）：

- token 的 `id / kind / type / label`
  **应当**能够在诊断输出中对应展示
- 但诊断系统的存在 **不得**成为 token 元信息的前置条件

---

## 5. 设计说明（信息性）

本契约的目标是：

- 让 Component Author 在代码中“拿着 token 就知道它是什么”
- 而不是要求 Component Author 理解事件系统的内部结构

EventListenerToken 是：

- **注册的句柄**
- **语义的标签**
- 而不是事件系统的控制入口

任何依赖 token 元信息进行行为判断的设计，
都不属于 v0 所允许的范畴。
