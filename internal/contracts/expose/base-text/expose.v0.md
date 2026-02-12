# expose.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约定义 Proto UI v0 的 **expose 信息通路**：
> 组件通过 `def.expose` 主动向 App Maker 暴露输出 API（方法、句柄、常量等）。
> 该通路方向为 **Component → App Maker**，与 props（App Maker → Component）互为对立输入/输出。
>
> **定位声明（v0）**：expose 是“注册式的输出 API 绑定”，用于将组件内部能力以稳定 key 公开给宿主消费。
> expose 本身不提供订阅、不建立依赖、不自动更新已暴露值。

---

## 0. 范围与非目标

### 0.1 范围（v0）

expose 在 v0 提供：

- setup 期的 `def.expose(key, value)` 注册能力
- 以 `key` 作为 App Maker 侧检索入口的稳定映射
- adapter 侧获取单个或全部 exposes 的能力
- 严格执行期约束（setup-only）
- 生命周期规则（dispose 后不可用）

### 0.2 非目标（v0）

v0 明确不提供 / 不承诺：

- 任何“自动更新”或“订阅式”语义
- 对暴露值的可序列化/可移植性约束
- runtime 期动态更新 expose 映射
- 基于 expose 的事件、渲染或状态调度能力
- 对暴露值行为的强制校验（仅提供建议性规范）

---

## 1. 术语

- **Expose 通路**：组件对外输出能力的基础信息通路（Component → App Maker）。
- **Expose Key**：暴露项的字符串 key，作为宿主侧检索入口。
- **Expose Value**：通过 `def.expose` 注册的值（方法、state handle、常量等）。
- **Exposes Record**：宿主侧一次性获取的映射结构，形如 `Record<string, unknown>`。
- **OutputAPI**：从 App Maker 视角理解的输出 API 形态，对应 `Prototype<P, E>` 的 `E`。

---

## 2. 类型系统约定（Prototype 泛型）

- Prototype 必须包含 **Props** 与 **Exposes** 两个泛型参数：`Prototype<P, E>`。
- `P` 表示 InputAPI（props），`E` 表示 OutputAPI（exposes）。
- 该设计以 App Maker 的类型系统为载体，使输入/输出通路可被显式表达与消费。

> v0 不要求 `E` 在运行时可反射，仅要求类型系统层面清晰建模。

---

## 3. 定义 API：`def.expose`（setup-only）

### 3.1 签名（v0）

```ts
def.expose<K extends keyof E>(key: K, value: E[K]): void
```

### 3.2 规范性规则

1. `def.expose` **仅允许在 setup 期调用**。
   - 任何 setup 之外的调用必须抛错（阶段违规）。
2. `key` 在运行时 **必须为字符串**。
   - 若为非字符串（例如 symbol），必须抛错（参数违规）。
3. 同一组件实例内，**同一 key 只能 expose 一次**。
   - 重复 expose 同一 key 必须抛错。
4. 暴露行为是 **注册式绑定**：
   - `value` 以引用/值的方式被保存为 expose 映射项。
   - v0 **不要求**对后续 `value` 的变化进行追踪或同步。

> 说明（信息性）：
> 若希望宿主侧可监听变化，推荐暴露 `state handle` 或提供主动拉取/订阅方法。

---

## 4. App Maker 侧获取能力（adapter 约定）

adapter 必须提供使 App Maker 获取 exposes 的能力：

- **按 key 获取**：能够取回单个 expose value。
- **获取全部**：能够得到 `Record<string, ...>` 结构的全量 exposes。

### 4.1 形状要求（v0）

- 全量结果必须以 `Record<string, unknown>` 表达。
- key 必须与 `def.expose` 注册的 key 保持一致。

> 本契约 **不规定** adapter API 的具体命名与形态，仅约束行为与输出结构。

---

## 5. 生命周期规则

- 在组件实例 **dispose 之后**，exposes 映射视为不可用。
- 任何对已 dispose 实例的 exposes 读取或调用，必须抛错或返回可区分的失败结果。

> 在 `unmounted` 回调期间（实例尚未 dispose）可视为仍可访问。

---

## 6. 推荐用法（信息性）

expose 推荐用于暴露：

- **方法**（例如 `reset()`、`focus()`、`scrollTo()`）
- **state handle**（官方语法，便于宿主侧订阅与生命周期对齐）
- **常量/静态配置**（例如 `version`、`capabilities`）

不推荐：

- 直接暴露一个可变变量但缺少订阅语义

> 原因：App Maker 无法可靠监听其变化；推荐改为暴露 state handle 或显式订阅 API。

---

## 7. 错误模型（v0）

必须抛错的情况：

- `def.expose` 在 setup 之外调用（阶段违规）
- `key` 非字符串
- 同一实例重复 expose 同一 key
- dispose 后访问 exposes

### 7.1 推荐错误代码

- `EXPOSE_PHASE_VIOLATION`
- `EXPOSE_INVALID_KEY`
- `EXPOSE_DUPLICATE_KEY`
- `EXPOSE_DISPOSED`

---

## 8. v0 契约测试（最小覆盖）

实现至少应通过：

1. setup-only 约束：setup 之外调用 `def.expose` 抛错
2. key 规则：非字符串 key 抛错
3. 重复 key：同一实例重复 expose 抛错
4. adapter 获取：
   - 单个 key 可取回暴露值
   - 全量获取为 `Record<string, ...>`
5. dispose 规则：dispose 后访问 exposes 失败

---

## 9. 相关契约（非规范性链接）

- props 输入通路：`internal/contracts/props/*.v0.md`
- state handle：`internal/contracts/state/base-text/state.v0.md`
- runtime 阶段守卫：`internal/contracts/runtime/*.v0.md`
