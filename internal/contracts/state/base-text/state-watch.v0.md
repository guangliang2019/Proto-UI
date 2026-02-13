# state-watch.v0.md

> Status: Draft – v0
>
> 本契约规定 Proto UI v0 中 **state 的 watch 能力**：包括 watch 的定位、可用视图、注册时机与生命周期约束。
>
> 本文刻意对 watch 的行为语义作最小化规定，不将其定义为响应式系统或渲染驱动机制。

---

## 0. 定位声明

在 Proto UI 中，`watch` 是一种**附加的观察能力**，用于在 state 值发生变化时获得通知。

watch 的设计目标是：

- 支持少量、明确的状态联动逻辑
- 支持模块组合与受控的副作用接入
- **不是**为了构建自动更新、依赖追踪或响应式渲染系统

因此，v0 对 watch 的语义承诺保持刻意克制。

---

## 1. watch 的可用视图

在 v0 中，watch **并非所有 state handle 都具备的能力**。

### 1.1 允许 watch 的视图

watch 仅存在于以下视图中：

- `BorrowedStateHandle`
- `ObservedStateHandle`

### 1.2 不允许 watch 的视图

- `OwnedStateHandle` **不提供** watch

> 该限制是**语义与风格约束**，而非技术限制。原型作者不应将自己定义的 state 作为副作用源进行自我监听。

---

## 2. watch 的注册规则

### 2.1 注册时机（v0）

- `watch(...)` **只能在 setup 期调用**
- 在 runtime 期调用 `watch` 必须抛错

该约束用于保证：

- watch 关系在实例生命周期早期即被明确
- 避免在运行期动态增删监听关系带来的不确定性

### 2.2 注册形式

watch 的注册形式在 v0 中不作严格限定，但应满足：

- 注册一个回调函数 `cb`
- 当 state 的值发生变化时，系统会在合适的时机调用该回调

具体回调签名、事件对象结构不由本文规定。

---

## 3. watch 的触发条件（最小约束）

v0 仅规定以下最小触发条件：

- 当 state 的值发生**实际变化**时，watch **应当**被触发
- 当新值与旧值在语义上等价时（例如 `Object.is(prev, next)`），watch **可以不触发**

除此之外，本文 **不规定**：

- 触发的同步或异步特性
- 多个 watch 之间的调用顺序
- watch 回调的批处理或合并行为

---

## 4. 生命周期与清理

### 4.1 自动清理

通过 state handle 注册的 watch：

- **必须**与组件实例生命周期绑定
- 在实例 `unmounted` / dispose 时自动清理
- 使用者无需、也不应手动取消注册

### 4.2 dispose 后行为

在实例 dispose 之后：

- watch 回调 **不得**再被触发
- 对 handle 调用 `watch` **必须**抛错（参见执行期规则）

---

## 5. 重入与副作用（v0 最小态度）

v0 对 watch 回调中的行为保持开放但保守的态度：

- watch 回调中 **可以**读取 state
- watch 回调中 **可以**触发其他 state 的更新
- 实现 **可以**采用简单的重入保护或事件队列机制

本文不对以下行为作出保证或禁止：

- watch 回调中再次触发同一 state 的 set
- watch 回调的嵌套深度或执行次数上限

> 若存在更强的确定性需求，应通过更高层机制（如 rule）表达。

---

## 6. 与渲染和更新的关系

watch 与渲染/更新 **不存在直接绑定关系**：

- watch 回调 **不得**隐式触发 render 或 commit
- watch 中如需更新 UI，必须显式调用 `run.update()`（或等价更新入口）

watch 本身不构成渲染驱动模型的一部分。

---

## 7. 错误模型（v0）

以下情况必须抛错：

- 在非 setup 期调用 `watch`
- 在 handle 已失效（disposed）后调用 `watch`

错误诊断应尽可能包含：

- state 的 semantic
- 操作名（如 `state(<semantic>).watch`）
- 实际执行期与期望执行期（若可得）

---

## 8. 与其他契约的关系

- watch 的执行期与生命周期规则继承自 `state.v0.md`
- watch 的可见性规则继承自 `state-handle-views.v0.md`
- 本文不定义 watch 在 rule、interaction、expose 中的使用方式

---

## 9. v0 总结

在 v0 中：

- watch 是**可选的、附加的能力**
- watch 用于有限的状态联动，而非响应式系统
- Proto UI 不鼓励围绕 watch 构建复杂的状态驱动逻辑

更高层的状态反应与组合逻辑，应优先使用 rule 或其他声明式机制。
