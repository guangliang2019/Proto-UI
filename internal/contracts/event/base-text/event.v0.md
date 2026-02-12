# Event Contract (v0)

> **状态**：Draft – implementation-ready（contract-first）  
> **版本**：v0
>
> 本文档定义 **Proto UI 的 Event 信息通路契约**：
> 包括 setup 期注册语义、runtime 回调保证、绑定时机、
> 生命周期清理规则，以及通过 `def.event` 对组件作者暴露的可观察行为。
>
> 本文档是 **规范性（normative）** 文档。

---

## 分层说明（规范性）

本契约描述的是 **组件作者通过 `def.event` 所能观察到的行为与保证**。

它 **不规定**：

- event 模块的内部数据结构
- 事件注册与调度的存储模型
- runtime 如何关联 `run` 与具体事件
- adapter 如何选择或实现事件代理策略

换言之：

- 本契约规定 **“必须发生什么”**
- 而不规定 **“必须如何实现”**

---

## 0. 范围与非目标

### 0.1 范围（v0 覆盖内容）

Event 模块在 v0 中提供：

- setup-only 的事件注册与注销 API
- 精确、稳定的监听器 token 语义
- runtime-only 的事件回调调用保证
- 默认绑定到组件实例的 **root 交互目标**
- adapter 定义的 **global 交互目标**
- 组件卸载时的自动清理
- 可选的开发期诊断信息标注能力

### 0.2 非目标（v0 明确不做）

以下内容 **不属于 v0 目标**：

- 手势抽象（drag / pinch / gesture 等）
- 事件到 rule 的自动编译
- 事件去重或合并策略
- 让组件作者选择具体宿主对象（如 `window` / `document`）
- runtime 阶段的动态订阅管理（`run.event.*`）
- 规定 event 模块的内部实现架构

---

## 1. 术语

- **Root Target**  
  组件实例的主要交互对象，由 adapter 定义。

- **Global Target**  
  adapter 定义的宿主级全局交互对象。

- **Native Event**  
  宿主平台提供的原生事件对象（如 Web 的 `Event`）。

- **Proto Event Type**  
  Proto UI 规定的事件类型字符串（见 EventTypeV0）。

---

## 2. API 与阶段约束

### 2.1 Setup-only 事件注册 API

以下 API **仅允许在 setup 阶段调用**：

- `def.event.on(type, cb, options?) => EventListenerToken`
- `def.event.onGlobal(type, cb, options?) => EventListenerToken`
- `def.event.off(token) => void`

#### 规范性规则

1. 任意在 setup 结束后调用上述 API 的行为 **必须抛出阶段违规错误**。
2. 每次调用 `on` / `onGlobal` **必须生成一个新的注册项**。
3. 系统 **不得对注册行为做去重或合并**。

---

### 2.2 Runtime-only 回调语义

所有通过 `def.event` 注册的回调：

- **仅允许在 runtime callback 阶段被调用**
- 不得在 setup / render / commit 等阶段触发

#### 回调签名（规范性）

```ts
cb(run, ev) => void
```

其中：

- `run`：运行期句柄，**始终作为第一个参数**
- `ev`：宿主或平台提供的事件对象

#### 分层约束（规范性）

- `run` 的存在是 **事件信息通路的语义要求**
- event 模块 **不需要也不应理解 `run` 的结构**
- runtime 负责将正确的 `run` 句柄注入回调调用

---

## 3. 绑定目标与绑定时机

### 3.1 Root Target（默认）

- `def.event.on(...)` 注册的监听器 **默认绑定到 Root Target**
- Root Target 表示该组件实例的主要交互主体

### 3.2 Global Target（adapter 定义）

- `def.event.onGlobal(...)` 注册的监听器绑定到 Global Target
- event facade **不得暴露具体的 global target 实体**

> 说明（非规范性）：
> Web adapter 通常选择 `window` 作为 global target。

---

### 3.3 绑定时机与“无注册”规则（规范性）

事件监听器的实际绑定 **由 runtime 在安全时机统一完成**。

#### 若不存在任何注册：

- 绑定过程 **必须是 no-op**
- **不得读取或访问任何 target**
- **不得因 target 不存在而抛错**

#### 若存在注册：

- 仅当存在 root 注册时，才要求 root target 可用
- 仅当存在 global 注册时，才要求 global target 可用

> 说明（信息性）：
> runtime 可以无条件执行 bind 流程，但“无注册”的组件不得因此承担任何代价或风险。

---

## 4. 监听器模型与 Token 语义

### 4.1 不做去重

- event 注册 **不得做任何形式的去重**
- 相同参数的多次注册 **视为多个独立监听器**

---

### 4.2 EventListenerToken（核心机制）

每一次 `on` / `onGlobal` 调用 **必须返回一个 EventListenerToken**。

#### 最小要求（规范性）

Token 必须包含：

- `id: string` —— 稳定、实例内唯一的标识

Token 可以包含额外字段，但不得影响运行期语义。

---

### 4.3 精确注销（唯一注销方式）

- `def.event.off(token)` **必须只移除该 token 对应的注册项**
- 若该监听器当前已绑定，**必须立即解绑**
- 传入未知或已移除的 token **必须是 no-op**
- 非法 token 形态 **必须抛出 EVENT_INVALID_ARGUMENT 错误**

> v0 明确规定：
> **不存在基于 `(type, cb, options)` 的注销 API**。
> 所有注销行为必须通过 token 完成。

---

### 4.4 Token 诊断标注（开发期能力）

Token **可以**提供诊断标注能力：

```ts
token.desc(text) => EventListenerToken
```

规范性规则：

1. `desc()` **仅允许在 setup 阶段调用**
2. setup 之后调用必须抛出阶段违规错误
3. 在生产环境中，`desc()` 可以是 no-op，但：

   - 必须可调用
   - 必须返回同一个 token 实例

---

## 5. 生命周期与自动清理

- 所有通过 `def.event` 注册的监听器：

  - **必须在组件卸载时被自动移除**

- 手动调用 `off(token)` 可以提前移除监听器，但并非正确性的必要条件

---

## 6. Event Type 体系（v0）

Event 使用 `EventTypeV0` 作为事件类型集合。

- EventTypeV0 的完整定义 **不在本文档中展开**
- 其规范定义见：`internal/contracts/event/event-types.v0.md`

本文档仅要求：

- 实现必须拒绝非法的事件类型字符串
- 对于不支持的合法事件类型，其行为必须符合 event-types 契约中的规定

---

## 7. Target 变更与交互代理（系统级能力）

> 本节描述 **event 系统的基础设施能力**，
> **不对 Component Author 暴露任何 API**。

### 7.1 设计目标

event 系统必须能够正确应对以下情况：

- root / global target 在实例生命周期中发生变化
- 宿主节点被替换、重建或代理
- 交互事件被统一托管、合并或转发

### 7.2 规范性要求（v0）

1. 若事件系统处于已绑定状态，而 target 发生变化：

   - 后续事件绑定 **必须指向新的 target**

2. 上述行为必须对组件作者 **完全透明**
3. 组件作者 **不得也无需** 手动管理 target 的变化
4. 实现方式不作规定（可通过重绑、代理、稳定 wrapper 等方式）

---

## 8. 错误模型

实现 **必须抛出错误** 的情况包括：

- setup-only API 的阶段违规使用
- runtime 绑定时所需 target 不可用
- 非法参数（空类型、非法 token 等）

### 8.1 错误分类（最小要求）

推荐的错误代码：

- `EVENT_PHASE_VIOLATION`
- `EVENT_TARGET_UNAVAILABLE`
- `EVENT_INVALID_ARGUMENT`

---

## 附录 A：契约覆盖范围（信息性）

本契约由可执行的 contract tests 覆盖，包括但不限于：

- 无注册时的绑定 no-op 行为
- root / global target 的可用性约束
- token 精确注销语义
- 卸载时的自动清理
- setup / runtime 阶段违规防护
- target 变更后的正确重绑定

对应测试位于：

```
packages/modules/event/test/contract/
```
