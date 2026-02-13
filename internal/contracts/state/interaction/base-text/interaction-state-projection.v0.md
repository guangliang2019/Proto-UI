# interaction-state-projection.v0.md

> Status: Draft – v0
>
> 本契约规定 Proto UI v0 中 **interaction signal 向 state 的投影机制**：即如何将系统级 interaction signal 以 state-shaped 形式引入组件原型，以及该投影所形成的 state 视图的能力与边界。
>
> 该投影机制旨在**提升交互语义的可消费性**，而不改变 interaction signal 的系统所有权属性。

---

## 0. 定位声明（核心）

interaction-state projection 是一种**显式的、按需的语义投影机制**：

- 将 interaction signal 投影为 state-shaped 值
- 供 Component Author 以 state 的方式读取、观察和组合
- **不**赋予组件作者对 interaction 的控制权

投影后的 state：

- 在形态上符合 state API
- 在语义上仍然属于 system-owned interaction
- 在能力上受限于只读视图

---

## 1. 为什么需要 projection

在实际组件实现中：

- 组件作者往往需要将交互事实与组件内部逻辑结合
- 单纯依赖 event 回调难以形成可组合、可迁移的结构
- rule 等声明式机制需要 state-shaped、可序列化的输入

projection 的目标是：

- 避免作者手写“事件 → state”的粘合代码
- 提供官方、统一、可迁移的交互状态入口
- 防止出现多套不一致的交互 state 实现方式

---

## 2. 投影的基本原则（v0）

interaction-state projection 必须遵循以下原则：

1. **显式引入**  
   未声明 projection 的原型 **不得**隐式获得 interaction state。

2. **按需监听**  
   只有声明了 projection 的原型，系统才会建立相关的交互监听。

3. **只读语义**  
   投影后的 state 不允许被组件作者写入。

4. **生命周期一致性**  
   投影 state 的生命周期与 interaction signal、组件实例严格一致。

---

## 3. 定义 API（v0）

v0 提供以下定义形式（示意）：

```ts
def.state.fromInteraction.<name>(semantic?)
```

其中：

- `<name>` 为 interaction signal 的名称（如 `focused`、`pressed`）
- `semantic` 为可选的人类可读语义名
  - 若省略，默认使用 signal 名称

> 注：v0 只规定“存在此类定义入口”，不强制具体命名或组织形式，允许实现进行等价映射。

---

## 4. 投影后的 state 语义

### 4.1 状态来源

- 投影 state 的值 **完全由 interaction signal 驱动**
- state 的变化等价于对应 interaction signal 的变化

### 4.2 默认值

- 投影 state 的默认值必须与 interaction signal 的默认值一致

### 4.3 写入限制

- 对投影 state 调用 `set` 或 `setDefault` **必须抛错**
- 投影 state 不具备 Owned 或 Borrowed 写入语义

---

## 5. 投影视图类型（关键）

投影产生的 state handle：

- **必须**是 `ObservedStateHandle`
- **不得**是 `OwnedStateHandle` 或 `BorrowedStateHandle`

这意味着：

- Component Author 只能读取或观察该 state
- 不可能通过投影绕过 interaction 的系统所有权

---

## 6. watch 与组合

### 6.1 watch 能力

由于投影视图为 `ObservedStateHandle`：

- `watch(...)` **允许**（setup-only）
- watch 的生命周期与组件实例绑定
- watch 语义继承自 `state-watch.v0.md`

### 6.2 与其他 state 的组合

投影 state 可以：

- 作为 rule 的条件输入
- 作为计算逻辑中的只读输入
- 与作者自定义 state 一起参与派生逻辑

但不得：

- 作为可写 state 的替代品
- 被当作组件私有交互状态重新定义

---

## 7. 与 run / render 的关系

interaction-state projection：

- **不**隐式触发 `run.update()`
- **不**建立渲染依赖关系

若组件作者希望基于交互状态更新 UI：

- 必须显式调用 `run.update()`
- 或通过 rule 等声明式机制完成

---

## 8. 错误模型（v0）

以下行为必须抛错：

- 对投影 state 调用 `set` / `setDefault`
- 在非 setup 期声明 projection
- 在实例已 dispose 后访问投影 state

错误语义继承自 state 的错误模型，不引入新的错误类型。

---

## 9. 非目标（v0）

v0 明确不规定：

- 自定义 interaction → state 投影
- 多 signal 合成一个 state 的语义
- interaction state 的缓存、延迟或节流策略
- 与 adapter 事件模型的具体映射方式
- 自动生成 projection 的隐式规则

---

## 10. 相关契约（非规范性链接）

- interaction 本体：`interaction-signals.v0.md`
- state 本体：`state.v0.md`
- state 视图体系：`state-handle-views.v0.md`
- state watch 能力：`state-watch.v0.md`
- rule 系统：`rule/*.v0.md`
