---
rfc: 0207
title: Context（上下文系统）
status: Draft
category: Core
version: 0.1.0
created: 2025-10-01
updated: 2025-10-01
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: [0200, 0201, 0203, 0205, 0206, 0208]
obsoletes: []
depends_on: [0001, 0002, 0100, 0200, 0201, 0203, 0205, 0206, 0208]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

**Context 是 PAL 中唯一合法的跨原型通信手段**，并且**严格遵循依赖注入（DI）范式**：  
- Provider 在 `setup` 顶层通过 `provide` 发布上下文；  
- Consumer 在 `setup` 顶层通过 `watch` 建立订阅（可选回调），之后可在 `connect` 之后任意时机用 `get` 读取；  
- 订阅于 `unconnect` 自动解除；  
- 数据流严格单向：**Provider → Consumer**。若 Consumer 希望通知其他 Consumer，必须使用 Provider 暴露的 `update` 接口（由 Provider 显式封装后作为上下文的一部分传递）。  
- 默认实现采用**共享内存模型**（可关闭）：Consumer 可对上下文对象进行**静默修改**而不触发通知；要通知订阅者必须调用 Provider 的 `update`。

本文件定义 Context 的 API、订阅与维护规则、生命周期约束与合规要求。

---

## 1. 术语与命名

- **ContextName / Token**：上下文标识。**SHOULD** 使用不可见的**不透明令牌**（如 Symbol 或框架内生成的 Token），避免字符串冲突；**MAY** 使用字符串但需命名空间前缀。  
- **Provider**：调用 `provide` 的原型。  
- **Consumer**：调用 `watch`/`get` 的原型。

---

## 2. API

<sig>
provide(name: ContextName, init: (update: (next: any, changedKeys?: string[]) => void) => any): void
watch(name: ContextName, listener?: (value: any, changedKeys?: string[]) => void): void
get(name: ContextName): any
</sig>

### 2.1 `provide(name, init)`
- **MUST**：只能在 `setup` 顶层调用；**不可嵌套**、不可放在条件/循环/回调中。  
- **MUST**：`init` 接收一个 `update(next, changedKeys?)` 方法；`init` **必须**返回上下文的**默认值**（即初始上下文对象/值）。  
- **MUST**：`update` **仅用于更新该 `name` 对应的上下文**；它会触发所有已订阅该上下文的 Consumer 的回调。  
- **MAY**：将 `update` **保存到 setup 作用域**中，以便后续在事件/生命周期中调用。  
- **MUST**：Provider 由离 Consumer **最近的祖先**决定（见 §4）。

### 2.2 `watch(name, listener?)`
- **MUST**：只能在 `setup` 顶层调用；**不可嵌套**、不可放在生命周期/事件回调/条件/循环内。  
- **MAY**：`listener` 可选；若省略，`watch(name)` 仅建立**最基础订阅**，使得 `get(name)` 成为合法操作。  
- **MUST**：当 Provider 调用 `update` 时，**仅**对该 Context 的订阅者触发回调：  
  - 回调参数：`(contextValue, changedKeys?)`，其中 `changedKeys` 为 Provider 提供的变化提示（可选）。  
- **MUST**：订阅将于 `unconnect` 自动解除（见 0203）。

### 2.3 `get(name)`
- **MUST**：读取当前上下文值；**前提**是该原型曾对该 `name` 调用过 `watch`（含无回调形式）。  
- **MUST**：`get` 是**幂等**的；可在**任意晚于 `connect`** 的时机调用（生命周期回调/事件回调/任意逻辑）。  
- **MUST**：当无可用 Provider 时，`get` 返回 `null`（或 `undefined`，实现需一致），并按配置**可选打印日志**。

---

## 3. 生命周期与时序

- **MUST**：`provide`/`watch` 仅允许在 `setup` 顶层调用；实际订阅关系在**内部阶段 `context init`** 完成（0203），且**必须在 `connected` 回调之前**就绪。  
- **MUST**：`connected` 之后，`get` 可随时读取上下文；`update` 可在任意时机（含事件回调）调用。  
- **MUST**：`unconnect` 时，所有 context 订阅**自动解除**；无 `afterUnconnect` 回调暴露。

---

## 4. 订阅建立与维护

### 4.1 最近祖先优先（Nearest Ancestor Wins）
- **MUST**：Consumer **永远订阅**最近的发布了该上下文的**祖先 Provider**。  
- **MUST**：若**不存在** Provider：  
  - **MUST**：`get` 返回 `null`；  
  - **SHOULD**：按配置打印诊断日志（可开关）。

### 4.2 动态 Provider 插入（Resubscribe）
- **MUST**：当在 Provider 与某些 Consumer 之间**插入了新的 Provider**（运行时变更树），原有 Consumer 的订阅需**更新为最近祖先**。  
- **MUST**：此操作可能需要**遍历子树**并重建订阅，存在潜在性能成本；  
- **SHOULD**：实现 **避免**频繁动态插入 Provider；或提供批量/延迟重建策略并记录诊断。

### 4.3 通知触发来源
- **MUST**：仅当 Provider 通过 `update(next, changedKeys?)` 更新上下文时，订阅者回调才会触发。  
- **MAY**：在默认共享内存模型下，Consumer **可以静默修改**上下文对象，不会触发其他订阅者回调（见 §5）。

---

## 5. 内存模型与可变性

- **Default（共享内存）**：  
  - **MUST**：默认采用**共享内存**：Provider 将一个对象/值作为上下文发布，所有订阅者对该对象的读/写可见。  
  - **MUST**：只有调用 `update()` 才**触发通知**；静默修改不会广播。  
  - **SHOULD**：实现提供开关以禁用共享内存（转为不可变快照/结构共享）以获得更强的防御性。  
- **Immutable 选项（可选能力）**：  
  - **MAY**：当启用不可变模式时，`update` 会产生新的上下文快照；`get` 返回的对象**不应**被修改（可冻结/代理）。  
  - **MUST**：能力矩阵标注是否支持该模式（见 §10）。

---

## 6. 单向数据流与通知模式

- **MUST**：数据流必须**单向**：Provider → Consumer。  
- **MUST NOT**：禁止建立 `Consumer → Provider` 的隐式回路（例如 Consumer 直接写 Provider 内部状态并期望广播）。  
- **MAY**：若 Consumer 需要“通知其他 Consumer”，其唯一合法途径是**使用 Provider 暴露的 `update`**：  
  - Provider 可以将 `update` 封装为函数/方法，作为上下文值的一部分向下传递；Consumer 调用该方法以请求更新。  
  - **MUST**：这种方式下的决策权仍然在 Provider，保持单向数据流与可审计性。

---

## 7. 示例（非规范性）

### 7.1 Provider：发布主题并暴露 update
<example-js>
const ThemeContext = createToken('Theme')

setup(p) {
  const theme = { mode: 'light', accent: 'blue' }

  // 保存 update 以便后续事件中调用
  let doUpdate
  p.context.provide(ThemeContext, (update) => {
    doUpdate = update
    return theme // 初始值
  })

  p.lifecycle.connected(() => {
    p.event.on('click', () => {
      // 切换主题：共享内存模式下，直接写对象 + 调用 update 通知订阅者
      theme.mode = theme.mode === 'light' ? 'dark' : 'light'
      doUpdate(theme, ['mode'])
    })
  })

  return () => [ <slot/> ]
}
</example-js>

### 7.2 Consumer：建立订阅并读取
<example-js>
setup(p) {
  p.context.watch(ThemeContext, (value, changed) => {
    // value = { mode, accent, ... }, changed = ['mode'] 或 undefined
    // 可以根据 changedKeys 做增量逻辑
  })

  p.lifecycle.connected(() => {
    const v = p.context.get(ThemeContext)
    // 此时可安全读取，若无 Provider → v === null
  })

  return () => [ <slot/> ]
}
</example-js>

### 7.3 仅为 get 建立最小订阅
<example-js>
setup(p) {
  p.context.watch(ThemeContext) // 无回调：仅建立订阅，使 get 合法
  return () => [ <slot/> ]
}
</example-js>

---

## 8. 错误与诊断（Diagnostics 对接）

- **MUST**：在非 `setup` 顶层调用 `provide`/`watch` → 抛错。  
- **MUST**：在未 `watch` 的情况下调用 `get` → 抛错或返回 `null` 并警告（实现需一致）。  
- **SHOULD**：当无 Provider 时，`get` 返回 `null` 并输出可选日志（可通过 Adapter 选项或环境变量控制）。  
- **SHOULD**：动态插入 Provider 导致的**订阅重建**应记录诊断（包含受影响节点数量与耗时统计）。  
- **MUST**：`unconnect` 时自动清理订阅；残留订阅需记录泄漏警告并强制回收。

---

## 9. 与其他模块的关系

- **Lifecycle（0203）**：  
  - 订阅在内部阶段 `context init` 完成，且在 `connected` 回调之前；`unconnect` 自动解除。  
- **Props（0206）** / **State（0205）**：  
  - Props/State 可在 Provider 内决定上下文的内容与更新逻辑；  
  - Consumer 想要影响其他 Consumer，必须通过 Provider 暴露的 `update`（单向数据流）。  
- **Template（0202）**：  
  - Template 不直接读取 Context；Context 通常由逻辑层消费，或通过 State → Output 影响视觉。  
- **Event（0204）**：  
  - 事件回调中可调用 `get` 读取上下文，或调用由 Provider 暴露的更新方法。

---

## 10. 合规性与能力矩阵（示例条目）

- `ContextDI = YES`（严格依赖注入）  
- `ContextProvideTopLevel = YES`  
- `ContextWatchTopLevel = YES`  
- `ContextGetAfterConnected = YES`  
- `ContextNearestAncestor = YES`  
- `ContextAutoUnsubscribeOnUnconnect = YES`  
- `ContextSharedMemoryDefault = YES`  
- `ContextImmutableMode = YES|NO`（实现是否支持不可变模式）  
- `ContextResubscribeOnProviderInsert = YES`（允许但需诊断）  
- `ContextDiagnostics = YES`

---

## 11. 设计 rationale（简述）

- **唯一通信通道**：避免 Event、State、Props 被滥用为跨原型共享数据通道，保持语义清晰。  
- **顶层调用**：保证可静态推断依赖，便于 Adapter 在 `context init` 快速建立订阅与优化。  
- **共享内存默认**：照顾性能与易用性；严格场景可切换不可变模式。  
- **单向数据流**：通过 `update` 集中变更，提升可审计性与可测试性。

---

## 变更记录

- 0.1.0 (2025-10-01): 初稿。确立 DI 范式；定义 provide/watch/get；最近祖先订阅；动态 Provider 插入的重建规则；共享内存默认与可选不可变模式；生命周期与诊断对齐。
