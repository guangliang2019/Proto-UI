# state-handle-views.v0.md

> Status: Draft – v0
>
> 本契约规定 Proto UI v0 中 **state handle 的视图体系（handle views）**： `OwnedStateHandle`、`BorrowedStateHandle` 与 `ObservedStateHandle`。
>
> 本文不重新定义 state 本体语义，仅描述**同一 state slot 在不同使用语境下所呈现的能力集合差异**。

---

## 0. 定位与边界

### 0.1 定位

State handle 视图用于表达：

- **谁在使用这个 state**
- **该使用者对该 state 拥有怎样的控制权**
- **哪些操作是被允许或被刻意禁止的**

视图的存在目的不是技术限制，而是**语义与风格约束**：通过 API 形状，明确哪些用法是被鼓励的，哪些用法是被阻止的。

### 0.2 边界（重要）

本文：

- **只描述视图本身的能力集合**
- **不描述视图如何产生、如何转换**
- **不描述具体模块（asHook / expose / interaction）的实现细节**

以下内容**不在本文范围内**：

- asHook 如何引入或投影视图
- expose 如何向其他原型或 App Maker 投影视图
- interaction / system-owned state
- watch 的具体调度、顺序、重入语义
- App Maker 侧的 state 投影

---

## 1. 背景：为什么需要视图

在 Proto UI 中，同一个 state slot 可能被以下不同角色使用：

- 定义它的原型作者（Component Author）
- 通过 asHook 注入它的原型作者
- 通过 expose 使用它的其他原型
- （进一步）App Maker

这些使用者之间，对 state 的**控制权、责任与预期**并不相同。

因此，Proto UI 不将“state handle”视为单一形态，而是将其拆分为多种**视图（view）**，每一种视图都对应一种明确的使用语义。

---

## 2. 视图总览（v0）

v0 定义三种 state handle 视图：

- **OwnedStateHandle<V>**：拥有视图
- **BorrowedStateHandle<V>**：借用视图
- **ObservedStateHandle<V>**：观察视图

它们都指向**同一个 state slot**，但暴露的能力集合不同。

---

## 3. OwnedStateHandle（拥有视图）

### 3.1 语义定位

`OwnedStateHandle` 表示：

> 该 state 由当前原型直接定义，并且其完整语义与生命周期由当前原型作者负责。

这是 **state 的最小拥有视图**，也是 `def.state.*` 在 v0 中返回的唯一视图。

### 3.2 能力集合（v0）

`OwnedStateHandle<V>` 具备：

- 读取：
  - `value` / `get()`
- 写入：
  - `setDefault(v)`（setup-only）
  - `set(v, reason?)`（runtime-only）

**刻意不提供：**

- `watch(...)`

### 3.3 设计意图（规范性说明）

Owned 视图**不提供 watch**，并非因为技术上不可行，而是一个明确的风格与语义约束：

- 原型作者定义的 state，优先被视为**描述性状态**
- 鼓励作者通过直接读取与显式更新来使用它
- 避免将“自己定义的 state”当作副作用源进行自我监听

> 如果需要监听 state 变化，应当通过其他视图（Borrowed / Observed）或更高层机制（如 rule）来完成。

---

## 4. BorrowedStateHandle（借用视图）

### 4.1 语义定位

`BorrowedStateHandle` 表示：

> 该 state 并非由当前原型直接定义，但当前原型被赋予了**部分控制权**。

它通常用于描述：

- state 的来源在当前原型之外
- 但当前原型仍然被视为该 state 行为的一部分责任方

### 4.2 能力集合（v0）

`BorrowedStateHandle<V>` 具备：

- 读取：
  - `value` / `get()`
- 写入：
  - `set(v, reason?)`（runtime-only）
- 监听：
  - `watch(...)`（setup-only 注册）

### 4.3 设计意图（规范性说明）

Borrowed 视图同时提供 `set` 与 `watch`，体现的是一种**共享语义责任**：

- 当前原型可以驱动 state 的变化
- 同时也需要对 state 的变化作出响应

这种视图常见于**组合/复用场景**，但其具体产生方式不由本文规定。

---

## 5. ObservedStateHandle（观察视图）

### 5.1 语义定位

`ObservedStateHandle` 表示：

> 当前原型仅被允许**观察**该 state，而不被允许对其进行任何形式的写入。

它用于描述：

- state 的语义与控制权完全在当前原型之外
- 当前原型只应基于该 state 作出反应，而不应改变它

### 5.2 能力集合（v0）

`ObservedStateHandle<V>` 具备：

- 读取：
  - `value` / `get()`
- 监听：
  - `watch(...)`（setup-only 注册）

**明确不提供：**

- `setDefault`
- `set`

### 5.3 设计意图（规范性说明）

Observed 视图用于表达**只读语义边界**：

- 防止多个原型同时写入同一 state 导致语义冲突
- 明确区分“状态事实的来源”与“状态事实的使用者”

---

## 6. 能力矩阵（v0 汇总）

| 能力 / 视图 | Owned | Borrowed | Observed |
| ----------- | ----- | -------- | -------- |
| value / get | ✓     | ✓        | ✓        |
| setDefault  | ✓     | ✗        | ✗        |
| set         | ✓     | ✓        | ✗        |
| watch       | ✗     | ✓        | ✓        |

> 所有能力均受 `state.v0.md` 中定义的执行期与生命周期约束。

---

## 7. 视图不变性原则

一旦某个 state handle 以某种视图形式提供给使用者：

- 该视图的能力集合 **不得在运行期发生变化**
- 使用者 **不得将其“提升”为更高权限的视图**

视图的选择是**语义决策**，而非运行期配置。

---

## 8. 与 state 本体契约的关系

- 所有视图共享同一个 state slot 及其值语义
- 执行期规则、生命周期规则、错误模型均以 `state.v0.md` 为准
- 本文不重复定义这些规则，仅在能力可见性层面加以区分

---

## 9. 相关契约（非规范性链接）

- state 本体契约：`state.v0.md`
- asHook 中的视图投影规则：`role/asHook*.v0.md`
- expose 中的视图投影与 App-side state：`expose/*.v0.md`
- interaction / system-owned state：`interaction-signals/*.v0.md`
