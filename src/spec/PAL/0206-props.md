---
rfc: 0206
title: Props（属性配置）
status: Draft
category: Core
version: 0.1.0
created: 2025-10-01
updated: 2025-10-01
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: [0200, 0203, 0205]
obsoletes: []
depends_on: [0001, 0002, 0100, 0200, 0203, 0205]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

PAL 的 **Props** 模块用于声明和获取组件的外部参数。

- Props 是**只读输入**：外部驱动的参数配置，不属于内部状态机。
- Props 在 `setup` 阶段通过 `define` 声明初始值，在 `create` 阶段冻结为完整定义。
- Props **不会触发 render**；若需要响应变化，必须通过 `watch` 进行逻辑处理。
- 与 State（0205）相比，Props 的重点是**外部传参语义**，而非组件自有状态。

---

## 1. 模型与语义

- **MUST**：Props 是一组**键值对**，键为字符串，值为任意可序列化类型或函数。
- **MUST**：Props **不可变**，即在 `create` 之后外部重新传入不会直接改变已定义 props；语义上这是“输入重置”，而非“内部可变”。
- **MUST**：Props 的变化**不会触发 render**；原型若需响应必须通过 `watch`。
- **SHOULD**：Props 的键名使用 **小驼峰**或 **kebab-case**；避免与保留名冲突。
- **MAY**：Props 的值可以是基础类型（string/number/boolean）、对象、数组或函数引用。

---

## 2. API

<sig>
define(key: string, initial: any): void
get(key: string): any
watch(keys: string | string[], listener: (next: Record<string,any>, prev: Record<string,any>) => void): void
</sig>

### 2.1 `define(key, initial)`

- **MUST**：仅可在 `setup` 阶段调用。
- **MUST**：定义 props 的初始值；若外部未传入该 key，则使用此初始值。
- **MAY**：同一 key 可被多次 `define`；**最后一次定义覆盖**之前的值。
- **SHOULD**：实现应在控制台输出提示（info 级别），标注重复定义。
- **MUST**：在 `setup` 执行完毕时，所有 `define` 的结果被合并为一个完整的 props 定义。

### 2.2 `get(key)`

- **MUST**：返回运行时实际传入的值；若外部未传入则返回 `define` 设置的初始值。
- **MUST**：`get` 是**幂等**的，可在任意晚于 `create` 的生命周期中使用。
- **MUST**：`get` 不依赖嵌套上下文，可在事件回调或任意逻辑中调用。

### 2.3 `watch(keys, listener)`

- **MUST**：仅可在 `setup` 阶段调用。
- **MUST**：可监听单个 key 或多个 key 的变化。
- **MUST**：回调参数为 `(next, prev)`，分别包含所监听 props 的新值和旧值，方便对比。
- **MUST NOT**：`watch` 不能在生命周期回调或事件回调中定义；其绑定必须在 `setup` 阶段完成。
- **SHOULD**：实现可支持 `immediate` 选项，用于订阅时立刻收到一次初始快照。

---

## 3. 生命周期关系

- **setup**：可调用 `define` 与 `watch`，建立 props 定义与订阅。
- **create**：完成所有 `define` 合并，生成最终 props 定义。
- **connected** 及之后：可通过 `get` 随时读取运行时值。
- **update/unconnect/destroy**：不影响 props 定义；props 依旧只读。

---

## 4. 与其他模块的交互

- **State（0205）**：
  - State 是组件**自有状态机**；Props 是**外部输入**。
  - State 更新可触发 Output 重绘；Props 更新不会触发 render。
- **Output/Styler（0208）**：
  - Props **不得直接驱动 visual**；若需对外反映，必须转换为 State 或通过 watch 显式处理。
- **Event（0204）**：
  - Event 回调中可使用 `get` 读取 props 值，用于逻辑决策。
- **Lifecycle（0203）**：
  - Props 定义冻结在 `create` 阶段完成；`watch` 在 `setup` 内注册。

---

## 5. 错误与诊断

- **MUST**：在非 `setup` 阶段调用 `define/watch` → 抛错。
- **MUST**：非法键名（非字符串/保留名）→ 抛错。
- **SHOULD**：重复定义同一 key 时输出提示（覆盖语义）。
- **MUST**：未定义的 key 在 `get` 时若外部未传入 → 返回 `undefined`，并可选择输出 warning。
- **MAY**：在 Debug 模式下提供 `props.inspect()`，列出完整 props 定义与运行时值（只读）。

---

## 6. 合规性（能力矩阵挂钩）

- `PropsDefineInSetup = YES`
- `PropsCreateFreeze = YES`
- `PropsNoImplicitRender = YES`
- `PropsWatchOnlyInSetup = YES`
- `PropsGetAnytime = YES`
- `PropsRepeatDefineOverwrite = YES`
- `PropsDiagnostics = YES`

---

## 7. 示例（非规范性）

### 7.1 定义与获取

<example-js>
setup(p) {
  p.props.define('title', 'Untitled')
  p.props.define('count', 0)

p.lifecycle.connected(() => { console.log('title =', p.props.get('title')) })

return () => [ <div visual="p-4">{p.props.get('title')}</div> ] } </example-js>

### 7.2 监听 props 变化

<example-js>
setup(p) {
  p.props.define('count', 0)

p.props.watch('count', (next, prev) => { console.log('count changed from', prev.count, 'to', next.count) })

return () => [ <div>{p.props.get('count')}</div> ] } </example-js>

### 7.3 重复定义覆盖

<example-js>
setup(p) {
  p.props.define('theme', 'light')
  p.props.define('theme', 'dark') // 覆盖前值，并提示
  return () => <slot/>
}
</example-js>

## 8. Props → State 镜像模式（以 disabled 为例）

在 PAL 中，常见需求是：组件**既**接受外部传入的 `disabled`（作为 Props），**又**向外暴露一个仅有 `true/false` 的状态机 `data-disabled`（作为 State），以供 Output/Styler 消费。推荐的协议化写法如下：

### 8.1 设计要点（规范性）

- **MUST**：同时维护
  - `props.disabled`（外部输入）
  - `state: data-disabled`（对外暴露、供 Output/Styler 消费）
- **MUST**：建立**单向同步**：`props.disabled` → `state.data-disabled`
  - 通过 `props.watch('disabled', cb)` 在 props 变化时更新 `data-disabled`
- **MUST**：Output/Styler **只读取** `data-disabled`；**不得**直接读取 `props.disabled`
- **MUST**：初始化时执行一次同步（以 props 的当前值初始化 state）
- **SHOULD**：保持“受控优先”的心智模型：当外部持续通过 props 驱动时，内部逻辑**不应**反向覆盖 `data-disabled`（避免心智冲突）
- **MUST NOT**：建立 `state → props` 的反向绑定，避免环路
- **MAY**：在 Debug/Docs 中标注“若需内部临时禁用，请用专有 state 名称，避免与 `data-disabled` 冲突”

### 8.2 参考实现（非规范性示例）

<example-js>
setup(p) {
  // 1) 定义 Props：允许外部传入 disabled；可给默认值
  p.props.define('disabled', false)

// 2) 定义 State：对外暴露的状态机（供 Output/Styler 消费）const disabledState = p.state.define('data-disabled', false, { kind: 'boolean' })

// 3) 初始化：以 props 的当前值初始化 state（单向同步的起点）disabledState.set(!!p.props.get('disabled'))

// 4) 订阅 props 变化：持续单向同步 p.props.watch('disabled', (next, prev) => { // next/prev 形如 { disabled: boolean } disabledState.set(!!next.disabled) })

// 5) 事件/逻辑中：若组件受控（外部通过 props 管 disabled），不应内部改写 data-disabled // 若确有内部禁用需求，请使用其他 state，如 data-internal-disabled，并在视觉/交互上与 data-disabled 做“或/与”合成（按设计声明）。p.event.on('someEvent', () => { // 受控模型下，避免：// disabledState.set(true) // 若要内部禁用，请另起 state 名称并在样式/交互层合成 })

return () => [ <div visual="[[data-disabled]]:opacity-50"> <!-- Output 仅基于 data-disabled，props.disabled 不直接参与视觉 --> <slot/> </div> ] } 
</example-js>

### 8.3 讨论与约束

- **为何单向？**
  - `props` 代表**外部意志**，`state` 代表**对外可观察语义**。将 `props.disabled` 单向映射到 `data-disabled`，能保持清晰的数据流与可验证性。
- **内部禁用的需求怎么处理？**
  - 另立 `data-internal-disabled` 等专用 state，并在视觉/交互策略中与 `data-disabled` 合成（如逻辑或/与），确保语义透明，不与受控模型混淆。
- **初始化时机**
  - 必须在 `setup` 内完成一次 `data-disabled` 的初始化，以确保 `connected` 时 Output/Styler 已有正确初值。
- **性能注意**
  - `data-disabled` 属于低频标记型 state，采用 `data-*` 前缀，可同步到元素（或宿主等价物），便于 styler 选择分支；不会触发 `render`，仅样式层更新。

---

## 变更记录

- 0.1.0 (2025-10-01): 初稿。确立 Props API（define/get/watch）；明确只读语义、生命周期关系与诊断规则；禁止通过 Props 驱动 visual；与 State/Output/Event/Lifecycle 对齐。
