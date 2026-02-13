# when.deps.context.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 **when 依赖 context 的形式与路径访问规则**。目标是保持可序列化、可分析与跨平台可移植。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- context 依赖在 RuleIR 中的表示
- 静态路径访问模型
- 访问失败语义

### 0.2 非目标（v0）

- 不定义 provider 解析细节（见 context 契约）
- 不定义重评估调度（见 `when.deps.context.wiring.v0.md`）
- 不定义 intent 实现（见 `intent.*.v0.md`）

---

## 1. context 作为 when 依赖

### 1.1 依赖形式

RuleIR 中的 context 依赖必须包含：

- context key（`ContextKey<T>`）
- 可选的静态访问路径

语义上：rule 依赖的是该 key 在树上解析出的 **当前 value**。

v0 事实约束：

- context value 必须可 JSON 化
- 其值只允许为 `null` 或 plain object
- context 中 **不允许**出现 state handle

---

## 2. 路径访问模型

### 2.1 路径定义

- 路径必须是静态、有序的字符串数组
- 必须可序列化
- **不允许**函数、动态 key 或计算表达式

示例（概念）：

- `ctx(key)` → 访问整个 context value
- `ctx(key).path("a", "b", "c")` → 访问嵌套字段

在 RuleIR 中的表示：

```ts
{
  type: "context",
  key: ContextKey<any>,
  path?: string[]
}
```

### 2.2 允许的遍历目标

路径遍历过程中：

- 仅允许遍历 plain object
- 禁止调用 getter 或任意函数
- 必须视 context 值为 readonly

若中途遇到非对象类型且路径未结束，则视为访问失败。

---

## 3. 失败语义

### 3.1 缺失 provider

若该 `ContextKey` 无 provider：

- 该 context 值视为 `null`

这同样适用于：

- 可选 context（trySubscribe）
- provider 断开场景（v0 不通知）

### 3.2 路径访问失败

若路径访问因下列原因失败：

- key 缺失
- 中间值非对象
- 非法遍历

则访问结果为 `null`，且 **不得抛错**。

理由：

- rule 应对动态组合保持韧性
- 抛错会导致规则在可选 context 下过于脆弱

---

## 4. 等价性与比较

从 context 派生的值参与 when 条件判断，遵循规则表达式的正常语义，不提供额外等价保证。

---

## 5. state handle 禁止

v0 禁止在 context 中传递 state handle。若检测到 state handle，应视为非法结构，并以 `null` 处理。

---

## 6. 诊断建议（非强制）

建议提供以下诊断：

- 规则引用了无 provider 的 context key
- 路径持续解析为 `null`
- 路径尝试遍历不可序列化结构

诊断不得改变语义。

---

## 7. 非目标

本契约不：

- 允许动态/计算路径
- 允许命令式逻辑
- 承诺 provider 变更通知
- 定义函数/闭包序列化方式

---

## 8. 总结

- context 依赖必须声明式、可序列化。
- 路径访问为静态 readonly。
- 缺失 provider 或路径失败均返回 `null`。
