# 执行阶段防护契约（Execution Phase Guard, v0）

> 状态：Draft（与现有实现对齐）
>
> 本契约定义 Proto UI 的 **执行阶段防护机制（Execution Phase Guard）**，由 `SystemCaps` 提供，是 runtime 与各模块用于区分并强制执行：
>
> - setup 阶段
> - runtime 阶段
> - disposed（已销毁）状态
>
> 的共同基础。

---

## 0. 范围与非目标

### 0.1 范围（Scope, v0）

本契约定义以下内容：

- **GuardDomain** 与 **ProtoPhase** 的语义
- `SystemCaps` 所需提供的最小能力集合
- 以下防护规则的强制语义：
  - setup-only 操作
  - runtime-only 操作
  - disposed 状态下的非法访问
- 错误行为的最低诊断要求（仅要求信息，不要求稳定错误类型）

---

### 0.2 非目标（Non-goals, v0）

本契约**不**要求：

- 提供稳定的错误类或错误码（可在后续版本引入）
- 将更细粒度的执行阶段（如 render / callback / unknown）暴露给模块作者
- 精确建模所有生命周期瞬间（本契约只关心“防护语义”）

---

## 1. 术语定义

### 1.1 GuardDomain（执行域）

**GuardDomain** 是用于模块 API 防护的**粗粒度执行域**，用于区分 setup 与 runtime。

可取值：

- `"setup"`
  - 表示当前执行处于 `proto.setup(def)` 期间
  - 属于 _definition-time_ 世界
- `"runtime"`
  - 表示 setup 结束后的任意执行
  - 包括回调、渲染、宿主驱动的执行路径等

---

### 1.2 ProtoPhase（原型阶段）

**ProtoPhase** 表示由 runtime 控制的**逻辑生命周期检查点**（semantic timeline）。

v0 的 ProtoPhase 集合由 `@proto-ui/core` 定义，最小集合为：

- `"setup"`
- `"created"`
- `"mounted"`
- `"updated"`
- `"unmounted"`

说明：

- 具体集合由 core 决定
- `SystemCaps` 必须反映 core 中定义的阶段
- 模块**可以读取** ProtoPhase 用于诊断或条件判断
- 模块**不得依赖** ProtoPhase 的细粒度来保证自身正确性

---

### 1.3 disposed（已销毁）

**disposed** 表示模块中枢（module hub）已被 runtime 销毁：

- caps 已失效
- 所有依赖 SystemCaps 的 handle 均必须视为不可再使用

---

## 2. SystemCaps 能力面（v0）

`SystemCaps` 必须提供以下接口：

- 状态读取：
  - `domain(): GuardDomain`
  - `protoPhase(): ProtoPhase`
  - `isDisposed(): boolean`

- 防护方法：
  - `ensureSetup(op: string): void`
  - `ensureRuntime(op: string): void`
  - `ensureNotDisposed(op: string): void`

caps 注入形态为：

```ts
type WithSystemCaps = { __sys: SystemCaps };
```

---

## 3. 语义约束

### 3.1 Domain 语义（v0）

- 当且仅当当前执行位于 `proto.setup(def)` 内部时， `domain()` **必须**返回 `"setup"`
- 在所有其他情况下，`domain()` **必须**返回 `"runtime"`

> 实现说明：runtime 内部可以存在更细的阶段划分，但在 v0 中，GuardDomain 被刻意限制为二值，以降低模块心智负担。

---

### 3.2 ProtoPhase 语义（v0）

- `protoPhase()` 必须反映 runtime 当前设置的生命周期检查点
- runtime 负责在合适的时机更新 ProtoPhase
- 模块可以读取该值用于诊断信息或条件分支
- 模块不得假设 ProtoPhase 的完整性或细节稳定性

---

### 3.3 Disposed 语义（v0）

- 当 runtime 销毁 module hub 后，`isDisposed()` **必须**变为 `true`
- 一旦进入 disposed 状态：
  - 所有依赖 SystemCaps 的操作均视为非法
  - 相关 handle 必须抛出错误

---

## 4. 防护规则

### 4.1 `ensureNotDisposed(op)`

- 若 `isDisposed() === true`，**必须抛出错误**
- 否则必须为 no-op

---

### 4.2 `ensureSetup(op)`

- 必须先执行 `ensureNotDisposed(op)`（或等价逻辑）
- 若 `domain() !== "setup"`，**必须抛出错误**
- 否则为 no-op

---

### 4.3 `ensureRuntime(op)`

- 必须先执行 `ensureNotDisposed(op)`（或等价逻辑）
- 若 `domain() !== "runtime"`，**必须抛出错误**
- 否则为 no-op

---

## 5. 错误模型（v0）

### 5.1 最低诊断要求

由 SystemCaps 抛出的错误，**至少**应在字符串层面包含：

- prototype 的标识信息（如 prototypeName）
- `op`（触发防护的操作标识）
- 期望的执行域（setup / runtime）
- 实际执行域（或等价描述）
- ProtoPhase（推荐，但 v0 不强制）

---

### 5.2 错误分类（非规范性）

建议但不强制的错误类别包括：

- `EXEC_PHASE_VIOLATION`
- `EXEC_DISPOSED_VIOLATION`

---

## 6. 注入要求（runtime / module-base）

### 6.1 注入时机

- runtime **必须**在模块创建之前，向每个模块的 CapsVault 注入同一个 `__sys` 对象
- 模块必须能通过 CapsVaultView 访问该对象

---

### 6.2 稳定性要求

- `__sys` 的引用在 module hub 生命周期内必须保持稳定
- 在 dispose 之后：
  - caps 可能被重置或失效
  - 但 `__sys.isDisposed()` 的行为必须保持一致，以正确防护任何仍被持有的旧 handle

---

## 7. 合同测试要求（v0 最小覆盖）

实现至少需要通过以下验证：

1. 执行域防护：
   - 在 setup 阶段调用 `ensureRuntime` 必须抛错
   - 在 runtime 阶段调用 `ensureSetup` 必须抛错

2. 销毁防护：
   - dispose 后，`ensureNotDisposed` / `ensureSetup` / `ensureRuntime` 均必须抛错

3. 诊断信息：
   - 抛出的错误中必须包含 `op`
   - 并能识别具体的组件实例（prototypeName 推荐）
