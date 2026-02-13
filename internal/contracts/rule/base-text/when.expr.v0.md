# when.expr.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 rule 的条件表达式（when）语言：其语义必须可分析、可序列化，并支持依赖收集。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- WhenExpr 的 AST 结构
- WhenValue 的输入类型与语义
- WhenBuilder 的依赖收集规则
- 等价性与逻辑运算语义

### 0.2 非目标（v0）

- 不定义具体的运行期调度策略（见 wiring 契约）
- 不提供深度比较或自定义比较
- 不允许副作用或命令式逻辑

---

## 1. WhenExpr AST（v0）

```ts
type WhenExpr<Props> =
  | { type: 'true' }
  | { type: 'false' }
  | { type: 'eq'; left: WhenValue<Props>; right: WhenLiteral }
  | { type: 'not'; expr: WhenExpr<Props> }
  | { type: 'all'; exprs: WhenExpr<Props>[] }
  | { type: 'any'; exprs: WhenExpr<Props>[] };
```

```ts
type WhenValue<Props> =
  | { type: 'prop'; key: keyof Props }
  | { type: 'state'; id: StateId }
  | { type: 'context'; key: ContextKey<any> };

type WhenLiteral = string | number | boolean | null;
```

---

## 2. WhenBuilder 规则

`WhenBuilder` 仅用于 setup 期，并且必须记录依赖。

```ts
w.prop(key)   -> { kind: "prop", key }
w.state(s)    -> { kind: "state", id: s.id }
w.ctx(key)    -> { kind: "context", key }
```

依赖记录必须满足：

- 完整：每次引用都能形成依赖
- 去重：同一依赖不会重复记录
- 确定性：推荐“第一次出现顺序”作为稳定顺序

---

## 3. eq 语义（v0）

- 使用 JS 严格相等（`===`）
- v0 不进行深度比较

---

## 4. 逻辑运算语义

- `all([])` 的值为 `true`
- `any([])` 的值为 `false`
- 其余按标准逻辑真值表计算

---

## 5. 事件与可逆性（v0 约束）

- v0 的 rule 仅接受**状态化输入**。
- `when(event.happens)` **不允许**。
- 若要引入事件维度，必须先将事件转为可逆状态对（例如 pressed/released），再由 rule 依赖该状态。

---

## 6. 不变量

- 表达式求值必须是纯函数
- 评估过程中不得产生副作用
- 相同输入必须得到相同结果
