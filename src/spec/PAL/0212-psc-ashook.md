---
rfc: 0212
title: asHook（组合行为）规范
status: Draft
category: Core
version: 0.3.0
created: 2025-10-01
updated: 2025-10-02
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: [0200, 0201, 0203, 0204, 0205, 0206, 0207]
depends_on: [0200, 0201, 0203, 0204, 0205, 0206, 0207]
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

**asHook 是 setup 的另一种形式**：  
- 可以看作是“返回结果不是 render，而是内部细节的 setup”。  
- 任意 Headless 风格的原型，都能等效转换为对应的 asHook。  
- **调用方式极简**：直接在 setup 中调用 `asButton(p)` 即可，其生命周期、事件、上下文的管理会自动合并到当前原型。  
- **唯一必需参数**是调用者的 `p`（PAL-Core API 句柄）。  
  - 可选地，允许追加一个 `options` 参数（键值对），用于配置。  
- **返回值**是暴露对象，用于让外部干涉内部细节（订阅 state、修改 handler 等）。  

---

## 1. 调用方式

### 1.1 基本形式
<sig>
asHook(p: PrototypeAPI, options?: Record<string, any>): HookExposure
</sig>

- **MUST**：第一个参数为 `p`，即调用者的 PAL-Core API 句柄。  
- **MAY**：第二个参数为 `options`，可选键值对，用于控制 hook 的细节。  
- **MUST**：调用形式为函数调用，而非 `p.asHook`。  
- **MUST**：必须在 `setup` 内部调用，且与 `setup` 的使用方式一致。  

### 1.2 生命周期绑定
- **MUST**：asHook 内部定义的 state、事件、context，与调用者的 setup 自动合并。  
- **MUST**：事件、上下文订阅在调用者 `unconnect/destroy` 时自动清理。  
- **MUST NOT**：要求显式调用 mount/unmount。

---

## 2. 返回值（暴露对象）

### 2.1 必须具备
asHook 必须返回一个**暴露对象（Exposure）**，供外部订阅或修改。  
推荐包含的字段有：  
- `state`: 由 hook 定义的 state 句柄集合，供调用方订阅或设置。  
- `handlers`: 事件处理函数集合，供调用方取消订阅、包装或替换。  
- `controls`: 可选的额外控制 API，例如 `pause()`、`resume()` 等。  
- `docs`: 文档或描述信息。

### 2.2 约束
- **MUST**：返回对象至少包含 `state` 或 `handlers`。  
- **MAY**：额外暴露 `controls`、`docs`，但不可返回 render。  
- **MUST**：外部修改 `handlers` 必须立即生效，但不保证推荐性。  
- **SHOULD**：state 的暴露对象是稳定接口（即使底层实现变化，引用不失效）。

---

## 3. 与 Prototype.setup 的关系

- **等价性**：asHook 就是“去掉 render 的 setup”；因此其 API 与 setup 保持一致。  
- **合并性**：调用多个 asHook，等同于在 setup 中内联多段逻辑，最终合并到调用者原型。  
- **简化性**：asHook 避免了手动管理生命周期，hook 内部书写方式与 setup 相同。  

---

## 4. 冲突与组合

- **Props 冲突**  
  - **MUST**：多次 define 相同 key → 控制台警告，按声明顺序 last-wins。  
- **事件冲突**  
  - **MUST**：相同事件同一 handler 多次 on → 仅首次生效（0204 一致）。  
- **Context 冲突**  
  - **MUST**：重复 provide 相同 Context → 抛错，必须中断。  
- **组合**  
  - **MAY**：多个 hook 可在一个 setup 中依次调用，语义与顺序保持一致。  

---

## 5. 示例

### 5.1 角色化 hook：asButton
<example-js>
function asButton(p) {
  const disabled = p.state.define('data-disabled', false)
  const active = p.state.define('data-active', false)

  p.props.define('disabled', false)
  p.props.watch('disabled', (next) => disabled.set(!!next.disabled))

  const onPress = (e) => {
    if (!disabled.get()) active.set(true)
  }
  p.event.on('pointerdown', onPress)

  return {
    state: { disabled, active },
    handlers: { onPress }
  }
}
</example-js>

### 5.2 组合使用
<example-js>
setup(p) {
  const button = asButton(p)
  const overlay = asOverlay(p, { modal: true })

  // 直接订阅内部 state
  p.state.watch(button.state.active, (v) => console.log("Active:", v))

  // 替换 handler（不推荐，但可能）
  const oldPress = button.handlers.onPress
  button.handlers.onPress = (e) => {
    console.log("Wrapped handler")
    oldPress(e)
  }
}
</example-js>

---

## 6. 能力矩阵对接

| capability | impl | notes |
|---|---|---|
| HookAsSetupForm | YES | asHook 即“无 render 的 setup” |
| HookExposure | YES | 必须返回 state/handlers 暴露对象 |
| HookMergeLifecycle | YES | 生命周期与调用者自动合并 |
| HookNoMountAPI | YES | 不需 mount/unmount 手动控制 |
| HookConflictWarning | YES | props 冲突警告，last-wins |
| HookContextError | YES | 重复 provide → 抛错 |
| HookEventOwnership | YES | 事件自动绑定 RootElement |

---

## 变更记录

- 0.3.0 (2025-10-02): 改写为“setup 的另一种形式”；去掉 `p.asHook`；明确 `asHook(p, options?)` 语法；暴露对象要求；调用方式极简。
