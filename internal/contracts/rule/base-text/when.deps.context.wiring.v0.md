# when.deps.context.wiring.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 **rule 与 context 的评估绑定**。v0 不要求稳定 update cycle，因此采用“评估时校验”的防护策略。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- context 依赖的评估规则
- 评估时校验（防护）策略
- 与 state 触发的协同

### 0.2 非目标（v0）

- 不定义 provider 解析细节
- 不定义 context 结构
- 不定义 intent 实现

---

## 1. context 依赖特性

在 v0：

- context 通过树上 provider 解析
- 值视为 readonly
- **不提供**变更通知
- provider 连接/断开不会通知 rule 运行期

因此 context 依赖必须被视为 **潜在不稳定输入**。

---

## 2. 评估时校验（v0）

### 2.1 无隐式轮询

v0 **不要求**存在稳定的 runtime update cycle。运行期不得依赖“周期性重评估”。

### 2.2 评估时解析与防护

当 rule 因任意原因被评估时：

- 必须在该时刻解析 context value
- 缺失 provider 或无效路径必须解析为 `null`
- 评估必须继续，不得抛错

该策略用于阻断失效逻辑，而非保证持续同步。

---

## 3. 与 state 依赖协同

若同时依赖 state 与 context：

- state 变化仍必须触发重评估（见 `when.deps.state.wiring.v0.md`）
- context 依赖不会替代 state 触发

---

## 4. Phase 与调度约束

- context 驱动的评估必须发生在 runtime 期
- setup 期不得评估

运行期可：

- 批量合并多次重评估
- 对齐宿主或 runtime 的调度循环（若存在）

---

## 5. 诊断建议（非强制）

建议提供诊断信息：

- 该 rule 为 context-dependent
- 采用评估时校验策略

诊断不得改变语义。

---

## 6. 非目标

本契约不：

- 要求 provider 迁移检测
- 要求 context 值的相等比较
- 允许 rule 变更 context
- 定义 context 缓存策略

---

## 7. 总结

- v0 不依赖 update cycle。
- context 仅在评估时解析与校验。
- 与 state 触发叠加，不相互替代。
