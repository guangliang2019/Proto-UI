# internal/contracts/context/base-text/with-tree.v0.md

> 状态：草案（中文底本）
> 本文是 `internal/contracts/context/with-tree.v0.md` 的中文底本，反映 v0 语义。

---

## 0. 范围与非目标

### 0.1 范围

Context 提供：

- 基于逻辑树的组件间通路（provider → consumer）。
- setup 阶段订阅意图 + runtime 阶段读取与更新。
- provider 解析规则：最近祖先 provider 生效。
- v0 强约束：context 值必须可 JSON 序列化的 Object。

### 0.2 非目标

- 除 context 之外的双向/对等通路不在 v0 范围。
- 连接变化通知（connected/disconnected callbacks）不在 v0 范围。
- Compiler 阶段可移植性与 AST 提取不在 v0 范围。
- host 专用能力（如 `def.host`）不属于 context 设计范畴。

---

## 1. 术语

- **ContextKey<T>**：标识一个 context 通路的唯一 token（类似 symbol），按引用身份比较。
- **Provider**：提供 context 值的组件实例。
- **Consumer**：订阅/读取/更新 context 的组件实例。
- **逻辑树**：运行时组件树（在 WC 场景可对应 DOM 树）。
- **最近祖先优先**：consumer 绑定最近的祖先 provider。

---

## 2. ContextKey

### 2.1 身份

- ContextKey 身份唯一，仅按引用比较。
- ContextKey 可通过模块共享。

### 2.2 创建（核心提供）

核心必须提供 ContextKey 工厂，例如：

- `createContextKey<T>(debugName: string): ContextKey<T>`

`debugName`：

- 必须存在，用于诊断日志与错误信息。
- 不影响身份比较。

---

## 3. Provider 解析

- Provider 解析基于逻辑树。
- 对于任意 (consumer, key)，绑定该 key 的**最近祖先 provider**。
- 不同实例可同时提供同一 key，绑定结果由树位置决定。

---

## 4. Setup-only 订阅意图

Context 订阅 API 仅允许在 setup 阶段使用：

- `subscribe(key, onChange?)`（必需）
- `trySubscribe(key, onChange?)`（可选）

> 订阅用于声明意图与注册可选回调。回调在 runtime 触发。

### 4.1 subscribe（必需）

- 仅允许在 setup 阶段调用。
- 若 setup 阶段找不到 provider，必须抛错。

### 4.2 trySubscribe（可选）

- 仅允许在 setup 阶段调用。
- 若 setup 阶段找不到 provider，不抛错。

---

## 5. Runtime-only 读取

读取 API 仅允许在 runtime 阶段使用：

- `read(key)`（必需）
- `tryRead(key)`（可选）

### 5.1 read（必需）

- 仅允许在 runtime 阶段调用。
- 必须事先 `subscribe(key, onChange?)`。
- 若 provider 断开或不存在，必须抛错。

### 5.2 tryRead（可选）

- 仅允许在 runtime 阶段调用。
- 必须事先 `trySubscribe(key, onChange?)`。
- 若 provider 断开或不存在，返回 `null`。

---

## 6. Provide 与更新

### 6.1 Provide API 阶段

- `provide(key, defaultValue)` 仅允许在 setup 阶段调用。

### 6.2 Update（provider 侧）

- `provide` 必须返回 `update` 函数。
- `update` 为 runtime-only API。setup 直接调用必须抛错（由 phase guard 拦截）。
- `update(next)` 用于发布新的 context 值。
- 允许 `update(prev => next)` 形式。

### 6.3 Update（consumer 侧）

- `run.context.update(key, next)` 为 runtime-only API。
- consumer 必须已订阅该 key（`subscribe` 或 `trySubscribe`）才可 update。
- `run.context.update` 的签名与 provider 侧 update 一致。

### 6.4 tryUpdate（可选）

- `run.context.tryUpdate(key, next)` 仅允许配合 `trySubscribe` 使用。
- 若 context 不存在或断开，`tryUpdate` 返回 `false` 且不更新。
- 更新成功返回 `true`。

### 6.5 重复 provide

- 同一组件实例对同一 key 只能 `provide` 一次。
- 重复 provide 必须抛错。

---

## 7. 值域与可移植性（v0 强约束）

### 7.1 值域规则

- context value **必须是 Object**（plain object）。
- context value **必须可 JSON 序列化**。
- 禁止：
  - `undefined`
  - 函数
  - DOM/host 引用
  - PrototypeRef
  - State
  - class 实例
  - 循环引用
  - Map/Set/Date/RegExp 等非 JSON 结构

### 7.2 空值语义

- **顶层 value 为 `null`** 表示上下文未建立（无 provider 或已断开）。
- 对象内部字段允许 `null`。
- 原型语法中禁用 `undefined`，空值统一用 `null`。
- Component Author 不允许把 context value 设为 `null`。

### 7.3 可移植性范围

- v0 仅承诺 Adapter 阶段可移植性。
- Compiler 阶段可移植性与 AST 提取不在 v0 范围。

---

## 8. 订阅回调与通知

- `subscribe/trySubscribe` 的回调在 runtime 触发。
- 回调签名：`(run, next, prev)`。
- `next`/`prev` 为 JSON 对象，或 `null` 表示无值。
- 更新通知为同步、且不合并：每次 update 都产生一次回调。

> v0 不规定异步调度，但回调顺序必须可预测。

---

## 9. 树变化与重绑定

- 逻辑树变化可能导致 provider/consumer 重新绑定。
- v0 不提供显式的连接变化通知。
- 正确性通过 `read/tryRead` 与订阅回调语义保证。

---

## 10. 错误模型

必须抛错的情况：

- 阶段误用（setup-only / runtime-only）
- 必需订阅找不到 provider
- 读取或更新前未声明订阅意图（`read`/`update` 未 `subscribe`，`tryRead`/`tryUpdate` 未 `trySubscribe`）
- 同一实例重复 provide
- `read` 时 provider 断开或不存在
- 提供非法 value（违反值域规则）

### 10.1 错误类型或代码

错误必须可区分类型或 `error.code`，推荐：

- `CONTEXT_PHASE_VIOLATION`
- `CONTEXT_PROVIDER_MISSING`
- `CONTEXT_SUBSCRIPTION_REQUIRED`
- `CONTEXT_DUPLICATE_PROVIDE`
- `CONTEXT_DISCONNECTED`
- `CONTEXT_VALUE_INVALID`
