# interaction-signals.v0.md

> Status: Draft – v0
>
> 本契约规定 Proto UI v0 中的 **interaction signals（交互信号）**：
> 它们的语义定位、信号集合、生命周期规则，以及可观察性约束。
>
> interaction signals 表达的是**系统级交互事实**，
> 而非组件作者定义的状态或事件回调。

---

## 0. 定位声明（核心）

在 Proto UI 中，interaction signal 是：

- 由 runtime / adapter 根据宿主交互驱动的
- 具有稳定语义含义的布尔或离散事实
- 可被组件与规则系统观察
- **不可由组件作者直接写入或控制**

interaction signal 的设计目标是：

- 提供跨 host 可迁移的交互语义锚点
- 为 rule 等声明式机制提供可序列化输入
- 避免将不可序列化的事件回调作为核心交互表达

interaction signal **不是**：

- author-owned state
- event 的别名或包装
- 自动触发渲染的机制

---

## 1. interaction signal 的基本特性

每一个 interaction signal 具有以下特性：

- **系统所有权**  
  其值由系统维护，不归组件作者所有。

- **只读可观察**  
  使用者只能读取或观察其变化，不能直接写入。

- **实例级**  
  signal 绑定到组件实例生命周期。

- **可重置性**  
  在实例 unmount / dispose 后，signal 必须回到其默认状态。

---

## 2. v0 定义的 interaction signal 集合

v0 必须至少提供以下 interaction signals：

### 2.1 `focused: boolean`

#### 语义

表示组件当前是否处于“获得焦点”的状态。

#### 默认值

- `false`

#### 进入条件（示意）

- 宿主交互表明组件获得焦点

#### 退出条件（示意）

- 宿主交互表明组件失去焦点

#### 一致性要求（v0）

- 在组件 unmount / dispose 后，`focused` **不得**保持为 `true`

> 注：v0 不规定“focus”是 root-focus 还是 focus-within，
> 只要求语义内部一致，由 adapter 决定具体策略。

---

### 2.2 `pressed: boolean`

#### 语义

表示组件当前是否处于一次“按压/激活指针交互”中。

#### 默认值

- `false`

#### 进入条件（示意）

- 宿主交互表明指针按下并作用于组件

#### 退出条件（示意）

- 指针释放
- 交互被取消（cancel / capture loss / 等价情况）

#### 一致性要求（v0）

- 在任何取消或 unmount 情况下，`pressed` **必须**回到 `false`

---

## 3. 生命周期规则

interaction signal 的生命周期与组件实例严格绑定：

- 在实例创建前，不存在可观察的 interaction signal
- 在实例存活期间，signal 值可随宿主交互变化
- 在实例 unmount / dispose 后：
  - signal 必须被重置为默认值
  - signal 不得再产生新的变化通知

---

## 4. 可观察性（v0 最小承诺）

interaction signals **可以被观察**，但 v0 仅作最小承诺：

- 当 signal 的值发生**实际变化**时，观察者可以收到通知
- 不保证通知的同步/异步模型
- 不保证多个观察者之间的顺序

interaction signal 本身不定义具体的观察 API 形态，
只要求其变化**在系统层面是可感知的**。

---

## 5. 与事件（event）的关系

interaction signal 与 event 是两个不同层级的概念：

- event 表达的是**瞬时发生的交互事件**
- interaction signal 表达的是**持续性的交互事实**

interaction signal 可以由 event 驱动，
但 event 本身不是 interaction signal。

---

## 6. 与 state 的关系（重要边界）

interaction signal **不是 state**：

- 它不通过 `def.state.*` 定义
- 它不具备 Owned / Borrowed 等作者控制视图
- 它不由组件作者写入

interaction signal **可以被投影为 state-shaped 视图**，
但该投影不改变其系统所有权。

该投影机制由独立契约规定（见相关文档）。

---

## 7. 非目标（v0）

v0 明确不规定：

- 自定义 interaction signal
- 复杂手势（drag / pinch / 等）
- signal 的数值域扩展（如压力、坐标）
- signal 与渲染调度的自动绑定
- adapter 的具体事件映射策略

---

## 8. 相关契约（非规范性链接）

- interaction → state 投影：`interaction-state-projection.v0.md`
- state 本体与视图：`state/*.v0.md`
- rule 对 interaction 的消费：`rule/*.v0.md`
- adapter 事件模型：`adapter/*`
