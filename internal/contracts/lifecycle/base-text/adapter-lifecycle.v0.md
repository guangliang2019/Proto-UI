# 适配器生命周期契约（Adapter Lifecycle, v0）

本契约定义 **Adapter Author（Web Component / React / Vue 等）** 在实现 Proto UI 时必须遵守的生命周期义务与约束。

它规定：

- 宿主生命周期如何映射到 Proto UI 的**规范生命周期时间轴**
- 各生命周期检查点（Checkpoint）的语义与顺序
- 执行域（domain）与销毁状态（disposed）的切换时机

本契约为 **规范性（Normative）** 文档。

---

## 1. 规范生命周期时间轴（Canonical Timeline）

Proto UI 定义了一条**唯一的、规范的生命周期时间轴**，该时间轴由一系列 **生命周期检查点（Checkpoint, CP）** 细化。

- Adapter **必须**将宿主行为映射到该时间轴
- Adapter **不得**引入并行的、竞争性的生命周期模型
- Adapter 的内部实现可以有更多状态，但**对外可观察语义** 必须与本时间轴一致

> Checkpoint 是**规范性语义锚点**，而不是对宿主生命周期的逐条复刻。

---

## 2. 生命周期检查点（Checkpoints）

### CP0 — Setup Exit（Setup 结束）

- `proto.setup(def)` 已执行完毕并返回
- 尚未执行任何生命周期回调

**执行域映射**

- 在 CP0：
  - `__sys.domain()` **必须**从 `"setup"` 切换为 `"runtime"`

---

### CP1 — Created Callbacks（Created 回调）

- 执行所有 `created` 生命周期回调

---

### CP2 — Logical Tree Ready（逻辑结构完成）

- render 函数已执行
- 逻辑渲染树已构建完成
- 尚未进行宿主层 commit

---

### CP3 — Commit Start（提交开始）

- Adapter 开始执行宿主层 commit
- DOM / host tree 正在被构建或替换

---

### CP4 — Commit Done（提交完成）

- DOM / host tree 已完全提交
- 依赖已提交结构的副作用现在可以安全启用

---

### CP5 — Mounted Callbacks（Mounted 回调）

- 执行所有 `mounted` 生命周期回调
- 组件实例现在被视为“完全激活”

---

### CP6 — Update Render（更新渲染）

- 由更新触发的 render 执行开始

---

### CP7 — Update Commit（更新提交）

- 由更新触发的 commit 执行完成

---

### CP8 — Updated Callbacks（Updated 回调）

- 执行所有 `updated` 生命周期回调

---

### CP9 — Unmount Begin（卸载开始）

- 组件实例正在被卸载 / 断开
- 即将执行 `unmounted` 回调

**可用性保证**

- 所有模块 facade 与 handle **必须仍然可用**
- `__sys.isDisposed()` **必须**为 `false`

---

### CP10 — Dispose Complete（销毁完成）

- 组件实例已被完全销毁
- 所有模块资源已释放

**销毁保证**

- 在 CP10：
  - `__sys.isDisposed()` **必须**变为 `true`
- 在 CP10 之后：
  - 任何受 `__sys` 防护的模块 facade / handle **必须抛出错误**

---

## 3. 重要说明（关于 Checkpoint 的性质）

- Checkpoint 是 **语义检查点**，不是实现步骤
- Adapter **不要求**：
  - 内部真的存在 11 个状态
  - 与宿主生命周期一一对应
- Adapter **必须保证**：
  - 对外可观察的顺序与可用性与这些 Checkpoint 语义一致

---

## 4. 强制规则（Mandatory Rules）

Adapter **必须**遵守以下规则：

1. 必须保持 Checkpoint 的顺序
2. 不得相对于 Checkpoint 重排生命周期回调
3. 不得在 CP10 之前销毁模块
4. 必须在销毁前执行 CP9 的 `unmounted` 回调
5. 必须在 CP0 与 CP10 正确切换：
   - `__sys.domain()`
   - `__sys.isDisposed()`

违反上述规则的行为均视为 **Adapter Bug**。

---

## 5. 错误处理

Adapter **必须**将生命周期违规暴露为运行时错误。

以下行为被明确禁止：

- 静默失败
- 部分执行
- 自动恢复并掩盖错误

---

## 6. 版本说明

- 版本：**v0**
- v0 定义了：
  - 规范生命周期时间轴
  - Checkpoint 集合
  - 执行域与销毁状态的映射
- 后续版本可以增加新的 Checkpoint，但 **不得破坏 v0 中已定义的顺序与语义**
