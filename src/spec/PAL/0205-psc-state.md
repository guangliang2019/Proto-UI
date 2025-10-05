---
rfc: 0205
title: State（状态系统）
status: Draft
category: Core
version: 0.1.0
created: 2025-10-01
updated: 2025-10-01
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: [0200, 0201, 0202, 0203, 0208]
obsoletes: []
depends_on: [0001, 0002, 0100, 0200, 0201, 0202, 0203, 0208]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

PAL 的 **State** 是“组件**向外暴露**的可观察状态”，其语义**更接近状态机**而非传统“响应式变量”。  
- 每一个 state 都可看作一台独立状态机（FSM）；  
- **主要消费者是 Output/Styler**（见 0208），用于驱动视觉/非交互输出；  
- **不**隐式触发 `render`，只有显式 `update()`（0203）才会重新执行 `render`。  

本文件定义了 State 的命名与分类（`data-*` / `--*`）、暴露与同步规则、以及最小 API：`define / set / watch`。

---

## 1. 范围

- 规定 State 的语义、命名、可观察性、与 Output/Styler 的交互，以及最小 API。  
- 不涉及复杂状态图编排与高级推导（可留待扩展 RFC）。  
- 与 Template（0202）/Lifecycle（0203）/Event（0204）/Output（0208）对齐。

---

## 2. 模型与总则

- **MUST**：State 指“**对外暴露**且**可观察**”的状态值/枚举/信号，代表组件的外部语义。  
- **MUST**：每个 state 视为**独立状态机**（FSM）；其内部实现可自由，但对外呈现必须可定义为离散（枚举/布尔）或连续（数值）状态。  
- **MUST**：State 的**主要消费者是 Output/Styler**；Output 可基于 State 进行样式重绘，**不得触发 render**。  
- **MUST NOT**：State 的更新不应隐式变更组件结构；若需要结构性变更，原型必须显式调用 `update()`。  
- **MUST**：State 在 `setup` 阶段定义（0200）；在 `connected` 后可被 Styler/Output 订阅与消费（0203）。

---

## 3. 命名与分类

### 3.1 命名前缀与更新频率

- **低频状态（标记型）** → **`data-*`**  
  - 示例：`data-disabled`、`data-active`、`data-open`  
  - **MUST**：由 Adapter 同步到 RootElement 的属性/特征（或宿主等价物），以便 Styler/Output 易于消费。  
- **高频状态（帧级/连续值）** → **`--*`**  
  - 示例：`--animation-value`、`--scroll-ratio`  
  - **MUST**：**不得**同步为元素属性（避免频繁 DOM/对象写入）；改由 **专用通道** 提供给 Styler/Output（例如 CSS 变量/主题对象/Runtime 数值通道）。

### 3.2 命名规则

- **MUST**：名称使用小写短横线风格（kebab-case）；前缀固定为 `data-` 或 `--`。  
- **MUST NOT**：与保留名冲突（保留名清单由实现维护，常见如 `data-id`、`data-role` 等）。  
- **SHOULD**：语义可读、指代明确；布尔/枚举用 `data-*`，数值信号优先 `--*`。

---

## 4. State 的暴露与消费

- **MUST**：State 为**外部可读**；最常见消费者是 **Output/Styler**。  
- **MUST**：`data-*` 状态在宿主可见（同步为属性/特征）；`--*` 通过 Styler 的语义通道提供（如 CSS 变量、主题对象、运行时值缓存）。  
- **MUST**：Styler 基于 State 的变化**仅**触发**样式层**增量更新；**不得**触发 `render`（见 0203/0208）。  
- **MAY**：外部逻辑可使用 `watch` 观察 **非本原型引入**的 state（见 §6）。

---

## 5. State API（最小集合）

### 5.1 签名

<sig>
define(name: string, initial: StateValue, options?: DefineOptions): StateHandle
set(name: string, next: StateValue): void
watch(name: string, listener: (value: StateValue, prev: StateValue) => void, options?: WatchOptions): Unsubscribe
</sig>

<sig>
type StateValue = boolean | number | string | { kind: 'enum', value: string } | any /* 扩展类型需文档化 */

type DefineOptions = {
  kind?: 'boolean' | 'number' | 'string' | 'enum' | 'signal' /* signal 代表高频连续值 */,
  syncToElement?: boolean  // 默认遵循命名前缀；可用于特例覆盖，但实现 SHOULD 谨慎
}

type WatchOptions = {
  immediate?: boolean   // 订阅时是否立刻以当前值回调
  ns?: string           // 命名空间，便于统一清理
  throttleMs?: number   // 可选，避免过频回调（对 --* 有用）
  debounceMs?: number
}
</sig>

### 5.2 `define` 的返回值（读取友好）

- **SHOULD**：`define` 返回 **StateHandle**，用于**本地读取与设置**（方便闭包/局部逻辑）。  
- 推荐形态：

<sig>
interface StateHandle {
  name: string
  (): StateValue                  // 读取（可调用形式）
  get(): StateValue               // 读取
  set(next: StateValue): void     // 写入（等价于全局 set(name, next)）
  toString(): string              // 调试辅助
}
</sig>

> 说明：此前示例已使用过 `const count = p.state.define('data-count', 0); count(); count.set(...)` 的风格，此处标准化它。

### 5.3 语义约束

- **MUST**：`define` 只能在 `setup` 阶段调用；`set/watch` 可在 `connected` 后任意时机使用（按 0203 时序）。  
- **MUST**：`set` 修改状态后，**不得**直接触发 `render`；若需要，原型应显式 `update()`。  
- **SHOULD**：`watch` 默认**仅用于订阅“不是当前原型引入”的 state**（外部依赖）；订阅自身 state 不是推荐路径，除非有跨域副作用需求。  
- **MUST**：`watch` 的订阅在 `unconnect/destroy` 时**自动释放**；也**应**提供 `Unsubscribe` 以手动提前释放（幂等）。  
- **MUST**：对 `--*` 高频 state，`watch` 的实现 **应** 支持节流/去抖选项，避免过密回调。

---

## 6. 推荐实践：谁来 watch？

- **SHOULD**：优先由 **Styler/Output** 消费 state；仅当需要业务逻辑联动时再使用 `watch`。  
- **SHOULD**：`watch` 监听**外部**（非本原型引入）state，以达到**组合**目的；  
- **MUST NOT**：用 `watch` 模拟控制流（Template 已禁止控制流；组合式 API 才是正道）。

---

## 7. 同步与性能：`data-*` vs `--*`

### 7.1 `data-*`（低频，外显）

- **MUST**：Adapter 将其同步为 RootElement 的属性/特征或宿主等价物；  
- **SHOULD**：变更频率低（如启禁、展开、聚焦、选择）以免产生宿主性能负担；  
- **MUST**：Styler/Output 可直接读取这些标记用于视觉分支（如 `[[data-active]]:bg-blue-500`）。

### 7.2 `--*`（高频，隐式通道）

- **MUST**：不写入元素属性；通过 **Styler 通道** 提供（CSS 变量/主题对象/运行时值缓存）。  
- **MUST**：Styler 基于该通道进行**增量样式更新**；**不得**触发 `render`。  
- **SHOULD**：支持批量/合帧（coalescing）与缓存，减小抖动。

---

## 8. 错误与诊断（Diagnostics 对接 0280）

- **MUST**：非法命名（前缀/字符/保留名）→ 抛错。  
- **MUST**：在未 `setup` 定义前 `set`/`watch` → 抛错或排队并警告（由实现决定一致策略）。  
- **SHOULD**：重复 `define` 同名 state → 抛错或警告（禁止重定义，除非 `DefineOptions` 明确允许并有合并策略）。  
- **SHOULD**：为 `--*` 订阅过频发出节流建议；为极高频 `set` 提供诊断阈值。  
- **MUST**：`unconnect/destroy` 后的悬挂订阅自动清理并记录日志。

---

## 9. 与其它模块的时序关系

- **Lifecycle（0203）**：  
  - `define` 在 `setup`；`set/watch` 在 `connected` 后可用（`connect` 前调用会进入排队/延迟执行队列）。  
- **Template（0202）**：  
  - Template 不读取 state；state 由 Styler/Output 消费。  
- **Event（0204）**：  
  - 事件处理可调用 `set` 修改 state；是否 `update()` 由原型显式决定。  
- **Output/Styler（0208）**：  
  - `data-*` 作为标记直接可见；`--*` 通过 Styler 通道消费；样式重绘不触发 `render`。

---

## 10. 合规性（能力矩阵挂钩，示例）

- `StateAsFSM = YES`  
- `StateExposeToOutput = YES`  
- `StateLowFreqDataAttr = YES`（支持 `data-*` 外显同步）  
- `StateHighFreqSignal = YES`（支持 `--*` Styler 通道）  
- `StateNoImplicitRender = YES`（state 变更不隐式 render）  
- `StateDefineInSetup = YES`  
- `StateWatchExternalPreferred = YES`  
- `StateAutoDisposeOnUnconnect = YES`  
- `StateThrottleDebounce = YES|NO`（对 `--*`）  

---

## 11. 示例（非规范性）

### 11.1 低频布尔与高频数值并存
<example-js>
setup(p) {
  // 低频：外显为 data-*，供 Styler 选择分支
  const disabled = p.state.define('data-disabled', false, { kind: 'boolean' })
  // 高频：通过 Styler 通道传递，避免属性抖动
  const ratio = p.state.define('--scroll-ratio', 0, { kind: 'number' })

  p.lifecycle.connected(() => {
    p.event.on('wheel', (e) => {
      const next = Math.max(0, Math.min(1, ratio.get() + e.deltaY * 0.001))
      ratio.set(next)        // 触发样式层更新（不 render）
      // 无需 update()
    })

    p.event.on('click', () => {
      disabled.set(!disabled()) // 可能改变可交互性/视觉分支
      // 若需要结构性变化：p.update()
    })
  })

  return () => [
    <div visual="p-4 [[data-disabled]]:opacity-50">
      Scroll: {Math.round(ratio() * 100)}%
    </div>
  ]
}
</example-js>

### 11.2 订阅外部 state（组合）
<example-js>
setup(p) {
  // 本原型不定义 data-open，来自父级或同级 Provider
  p.state.watch('data-open', (value) => {
    // 仅联动一些非结构性逻辑，或选择性调用 p.update()
  }, { immediate: true, throttleMs: 50 })
}
</example-js>

---

## 变更记录

- 0.1.0 (2025-10-01): 初稿。确立 State = 对外暴露的状态机；`data-*`（低频外显）与 `--*`（高频信号）；最小 API：define/set/watch；样式重绘不触发 render；watch 推荐用于外部 state；并与 Lifecycle/Template/Event/Output 对齐。
