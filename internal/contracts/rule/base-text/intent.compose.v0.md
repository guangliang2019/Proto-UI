# intent.compose.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 rule 的 intent 结构、Builder 形态与跨通道合并原则。具体通道语义由各 intent 契约定义。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- IntentBuilder 的形态与 setup-only 约束
- RuleIntent / RuleOp 的结构
- 跨通道合并的总体原则

### 0.2 非目标（v0）

- 不定义单个通道的具体语义（见各 intent 契约）
- 不引入通道优先级
- 不允许运行期命令式回调

---

## 1. IntentBuilder（v0）

```ts
interface IntentBuilder {
  feedback: {
    style: {
      use(...handles: StyleHandle[]): void;
    };
  };
  state: <T>(handle: OwnedStateHandle<T> | BorrowedStateHandle<T>): StateIntentBuilder<T>;
}

interface StateIntentBuilder<T> {
  be(value: T): void;
}
```

规则：

- IntentBuilder 仅用于 setup 期
- 其作用是**记录意图操作**，而不是实际执行

---

## 2. RuleIntent（v0）

```ts
type RuleIntent = {
  kind: 'ops';
  ops: RuleOp[];
};

type RuleOp =
  | { kind: 'feedback.style.use'; handles: StyleHandle[] }
  | {
      kind: 'state.set';
      handle: OwnedStateHandle<any> | BorrowedStateHandle<any>;
      value: any;
      reason: any;
    };
```

- 一个 rule 可记录多条 op
- op 顺序必须被保留

---

## 3. 跨通道合并原则（v0）

- 运行期按 **rule 声明顺序** 收集 active rule 的 op
- 每个 intent 通道 **独立合并**，互不干扰
- 通道内合并规则由各通道契约定义

---

## 4. 非目标（提醒）

v0 明确不提供：

- 任意副作用或用户回调
- 宿主特定的实现逻辑

这些能力应交给 adapter 或未来扩展模块。
