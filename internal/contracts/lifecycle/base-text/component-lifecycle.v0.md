# 组件生命周期契约（Component Lifecycle, v0）

本契约定义 Proto UI **向组件作者（Prototype Author）暴露的生命周期语义保证**。

它规定了：

- 生命周期回调的执行顺序
- 不同阶段中 API 的可用性边界
- 执行域（setup / runtime）的映射关系
- 卸载与销毁（dispose）的语义

本契约为 **规范性（Normative）** 文档。

---

## 1. 执行域与执行周期（Execution Domain & Execution Cycle）

### 1.1 执行域（Execution Domain，回顾）

Proto UI 通过 `SystemCaps`（`__sys.domain()`）暴露一个**粗粒度执行域**：

- `"setup"`
- `"runtime"`

执行域用于 **权限防护（API gating）**，而不是表示生命周期阶段本身。

其切分规则由 `exec-phase-guard` 契约定义，此处不再重复。

---

### 1.2 执行周期（Execution Cycle）

在 `"runtime"` 执行域内部，组件实例会经历**多次执行周期（execution cycle）**。

一个执行周期通常包含以下步骤（顺序固定）：

1. render 执行
2. commit（结构提交）
3. 生命周期回调执行（如 `mounted` / `updated`）

说明：

- 生命周期回调并不是连续发生的一条线，而是**嵌入在多个 execution cycle 中**
- `created`、`mounted`、`updated`、`unmounted` 均发生在 runtime 域内，
  但分别位于不同的执行周期位置
- 执行周期是 runtime 的内部调度概念，
  本契约只对其**可观察顺序**提出约束

---

## 2. 执行域映射（Execution Domain Mapping, v0）

### 执行域与生命周期的关系

- `"setup"`
  - **仅在** 执行 `proto.setup(def)` 期间有效
- `"runtime"`
  - 在 setup 返回之后立即生效
  - 覆盖以下所有执行：
    - `created`
    - render
    - `mounted`
    - `updated`
    - `unmounted`
    - 所有宿主驱动的回调路径

---

### 执行域契约（v0）

1. 在执行 `proto.setup(def)` 期间，`__sys.domain()` **必须**为 `"setup"`
2. 在 `setup(def)` 返回之后（在任何生命周期回调或 render 执行之前），
   `__sys.domain()` **必须**切换为 `"runtime"`
3. 在所有生命周期回调（`created` / `mounted` / `updated` / `unmounted`）
   以及 render 执行期间，`__sys.domain()` **必须**为 `"runtime"`
4. 在执行 `unmounted` 回调期间：
   - `__sys.domain()` **必须**为 `"runtime"`
   - `__sys.isDisposed()` **必须**为 `false`
5. 在 `unmounted` 回调全部返回之后：
   - `__sys.isDisposed()` **必须**变为 `true`
   - 所有受 `__sys` 防护的模块 handle **必须**变为不可用并抛错

---

## 3. 生命周期回调（Lifecycle Callbacks）

Proto UI 向组件作者暴露以下生命周期回调：

- `created`
- `mounted`
- `updated`
- `unmounted`

这些回调：

- 必须在 setup 阶段注册
- 由 runtime 按照规范顺序执行
- 均运行在 `"runtime"` 执行域中

---

## 4. 顺序保证（Ordering Guarantees）

### Setup → Created → 首次执行周期 → Mounted

runtime **必须**保证以下顺序：

1. 执行 `proto.setup(def)`
2. 执行所有 `created` 回调
3. 执行首次 render
4. 执行首次 commit
5. 执行所有 `mounted` 回调

说明：

- `created` **一定发生在首次 render 之前**
- `mounted` **一定发生在首次 commit 之后**
- `created` 与 `mounted` 不处于同一个 execution cycle 中

---

## 5. 更新周期（Update Cycle）

当组件发生更新（例如通过 `run.update()` 触发）时，
runtime **必须**以如下顺序执行一个新的 execution cycle：

1. render 执行
2. commit 执行
3. `updated` 回调执行

约束：

- 任何生命周期回调不得跨越上述步骤重排
- `updated` 只在 commit 之后执行

---

## 6. 卸载与销毁语义（Unmount & Disposal）

### 6.1 卸载回调

当组件实例被卸载时，runtime **必须**：

1. 执行所有 `unmounted` 回调
2. 在回调全部返回之后，才进入销毁（dispose）

---

### 6.2 `unmounted` 期间的可用性

在执行 `unmounted` 回调期间：

- 所有模块 facade 与 handle **必须仍然可用**
- `__sys.isDisposed()` **必须**为 `false`

这保证了 teardown 逻辑可以安全访问：

- state
- event
- feedback
- 其他模块能力

---

### 6.3 销毁之后

销毁完成后：

- `__sys.isDisposed()` **必须**为 `true`
- 任何受 `__sys` 防护的模块 facade / handle：
  - 必须抛出错误
  - 不得静默失败

---

## 7. 错误模型

任何违反本契约的行为（顺序错误、可用性错误、执行域误用）：

- 都被视为 **runtime bug**
- 实现 **必须快速失败**
- 实现 **不得尝试自动恢复或掩盖问题**

---

## 8. 版本说明

- 版本：**v0**
- v0 保证：
  - 生命周期回调的顺序
  - 执行域映射关系
  - 卸载与销毁语义
- 后续版本可以：
  - 引入更多生命周期回调
  - 引入更细的执行检查点
- 但 **不得破坏 v0 中已定义的顺序与可用性保证**
