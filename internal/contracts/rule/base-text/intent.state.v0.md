# intent.state.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 rule 的 `state` intent（受控 mutation）。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- `intent.state(handle).be(value)` 的语义
- 可写 handle view 约束
- 分层合并与回滚
- reason 要求

### 0.2 非目标（v0）

- 不定义 state 的创建或暴露（见 state 契约）
- 不定义 watcher 的合并行为

---

## 1. 可写视图限制

- 可写性由 **state 契约**定义
- v0 仅允许对可写视图执行 state intent（例如 Owned / Borrowed）
- 不可写视图（例如 Observed）不得作为 intent 目标

---

## 2. 分层合并与回滚

对于同一个 state，rule intent 必须按“分层（layer）”模型合并：

- 每条 rule 对同一 state 只对应一个 layer（重复声明视为覆盖该 layer 的值）
- layer 顺序按 rule 声明顺序稳定排列，越后定义越靠上
- 合并结果为“顶层生效”，下层仍保留

当某条 rule 失效时：

- 仅移除对应 layer
- 目标值回退到下一层
- 若无任何 layer，则回退到**最近一次非 rule 原因的值**

---

## 3. 目标值应用

- 运行期在单次评估周期内，对每个 state **最多执行一次 set**
- 仅当合并后的目标值与当前值不同时才触发 set

---

## 4. reason 要求

- 通过 rule 对 state 的写入 **必须**携带 reason
- reason 类型为 `any`，允许包含 rule-id 或 rule-event-id 等信息
- 规则实现必须能识别“rule 变更”与“非 rule 变更”，以维护 baseline
