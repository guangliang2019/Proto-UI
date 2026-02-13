# expose-state.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约定义 Proto UI v0 的 **expose-state 组合能力**：组件通过 `def.expose` 暴露内部 state slot 的“对外投影”，供 App Maker 以 **外部 State 句柄** 读取与订阅。
>
> **定位声明（v0）**：expose-state 是“同源数据、异构句柄”的输出通路。外部句柄与内部 state handle **不是同一个对象**，但指向同一 state slot 的数据源。

---

## 0. 范围与非目标

### 0.1 范围（v0）

expose-state 在 v0 提供：

- setup 期通过 `def.expose(key, value)` 暴露内部 state handle view
- App Maker 侧获取 **外部 State 句柄** 的最小形状要求
- 外部句柄与内部 state slot 的同源关系与一致性要求
- expose 通路与 adapter 的职责边界
- 生命周期与错误模型的最小约束

### 0.2 非目标（v0）

v0 明确不提供 / 不承诺：

- 外部句柄的写入能力（`set`）
- 响应式渲染、依赖收集或自动更新
- 对外部句柄的高级特性形态约束（由 adapter 扩展）

---

## 1. 术语

- **Internal State Handle**：Proto UI 内部使用的 state handle view（Owned/Borrowed/Observed）。
- **External State Handle**：App Maker 侧可见的对外 State 句柄，具有最小 API 形状。
- **State Slot**：组件实例内的语义状态单元（参见 `state.v0.md`）。
- **Projection**：同源数据的“投影”，外部句柄与内部句柄共享同一数据源但能力不同。

---

## 2. 组合模型与类型约定

### 2.1 组合模型

- expose-state 是 **state + expose** 的组合能力。
- 组件作者在 setup 期调用 `def.expose(key, value)`：
  - `value` 必须是 **Internal State Handle View**。
  - 系统对外暴露 **External State Handle**。

### 2.2 类型系统约定（v0）

- `Prototype<P, E>` 的 `E` 中允许出现对外 State 类型。
- 该对外类型应当 **认知成本较低**，便于 App Maker 手写。
- `def.expose` 的签名不变：

```ts
def.expose<K extends keyof E>(key: K, value: E[K]): void
```

> 说明：在 expose-state 场景下，`value` 是内部 handle view，但 `E[K]` 对外呈现为 External State 类型。类型系统需要通过映射或声明合并来体现这一差异。

---

## 3. External State 句柄的最小形状

External State 句柄必须至少提供以下 API：

- `get(): V`
- `subscribe(cb): Unsubscribe`
- `unsubscribe(handle | token): void` 或 `subscribe` 返回可调用的 `Unsubscribe`

### 3.1 规范性要求

1. External State 句柄 **必须可读取**（`get`）。
2. External State 句柄 **必须可订阅**（`subscribe`）。
3. 取消订阅 **必须存在**（`unsubscribe` 或返回函数）。
4. **不允许提供 `set`** 或任何等价写入 API。

> 允许 adapter 扩展更多能力，但不得削弱以上最小形状要求。

### 3.2 必需 Meta：StateSpec

External State 句柄 **必须**携带只读的语义元信息，以辅助 App Maker 理解状态语义。

规范性要求（v0）：

- `spec` 必须存在，并基于 `StateSpec` 结构（见 `packages/types/src/state.ts`）。
- `spec` 为只读信息，不影响运行期行为。

推荐形态（示例）：

```ts
type ExternalState<V> = {
  get(): V;
  subscribe(cb): Unsubscribe;
  unsubscribe(token): void;
  spec: StateSpec;
};
```

---

## 4. 写入能力边界

- expose-state **不允许**外部句柄写入 state。
- 若 App Maker 需要写入能力，必须由组件作者 **显式暴露方法** 完成，例如：
  - `def.expose('setValue', (v) => handle.set(v))`

> 外部句柄的读写边界是语义边界，不可通过 adapter 扩展绕过。

---

## 5. 同源一致性（数据与订阅）

### 5.1 数据同源

- External State 句柄必须与内部 state slot **同源**。
- `get()` 返回值应与内部 state 的当前值保持一致。

### 5.2 订阅一致性

- 当内部 state 值发生实际变化时，External State 的订阅回调应被触发。
- 触发语义应与 `state-watch.v0.md` 的最小变化条件保持一致：
  - 值发生实际变化触发
  - 语义等价时可不触发（例如 `Object.is(prev, next)`）

> 本节仅约束最小一致性，不规定具体调度时机、顺序或批处理策略。

### 5.3 订阅回调事件形状（相对一致）

若系统已确立 `StateEvent<V>` 事件形状（见 `packages/types/src/state.ts`），则 External State 的 `subscribe` 回调应与内部 state event **保持相对一致**：

- **不包含** `run` 句柄作为第一个参数
- 事件对象的结构与 `StateEvent<V>` 一致（`next/prev/reason`、`disconnect` 等）

推荐形态（示例）：

```ts
subscribe((ev: StateEvent<V>) => void): Unsubscribe
```

---

## 6. 执行期与生命周期

- `def.expose` 仍然是 **setup-only**（见 `expose.v0.md`）。
- External State 句柄的使用受组件生命周期约束：
  - 在实例 dispose 后，`get` 与订阅必须失败或返回可区分的错误结果。
  - 在 `unmounted` 回调期间（尚未 dispose），外部句柄可被视为可用。

---

## 7. adapter 责任边界

adapter 必须保证：

- App Maker 可通过 expose 通路获取 External State 句柄
- External State 句柄满足最小 API 形状
- 订阅回调与 Proto UI 生命周期安全对齐

adapter 可以扩展：

- 更强的订阅 API
- 只读派生/快照能力
- 诊断信息或调试工具

但不得提供：

- `set` 或等价写入能力
- 绕过生命周期约束的访问路径

---

## 8. 错误模型（v0）

必须抛错或返回可区分失败结果的情况：

- `def.expose` 在 setup 之外调用
- 外部句柄在 dispose 后被使用
- 外部句柄试图写入（若存在）

### 8.1 推荐错误代码

- `EXPOSE_STATE_PHASE_VIOLATION`
- `EXPOSE_STATE_DISPOSED`
- `EXPOSE_STATE_WRITE_FORBIDDEN`

---

## 9. v0 契约测试（最小覆盖）

实现至少应通过：

1. setup-only：`def.expose` 违反阶段约束抛错
2. External State 形状：包含 `get` + `subscribe` + 取消订阅能力
3. 写入禁止：外部句柄不可 set
4. 同源一致性：
   - `get` 与内部 state 当前值一致
   - 内部 state 变化触发订阅回调
5. 事件形状：若采用 `StateEvent`，外部回调不含 `run`，其余保持一致
6. 必需 meta：`spec` 存在且结构符合 `StateSpec`
7. dispose 规则：dispose 后 `get/subscribe` 失败

---

## 10. 相关契约（非规范性链接）

- expose 基础通路：`internal/contracts/expose/base-text/expose.v0.md`
- state 本体：`internal/contracts/state/base-text/state.v0.md`
- state 视图：`internal/contracts/state/base-text/state-handle-views.v0.md`
- state watch：`internal/contracts/state/base-text/state-watch.v0.md`
