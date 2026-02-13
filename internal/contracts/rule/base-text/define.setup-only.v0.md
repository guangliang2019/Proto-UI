# define.setup-only.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 **rule 的 setup-only 声明与编译**：组件在 setup 期通过 `def.rule` 声明规则，编译为纯数据的 RuleIR。RuleIR 必须可序列化，且不得携带运行时闭包。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- `def.rule(spec)` 仅允许在 setup 期调用
- RuleSpec 的形态与约束（when/intent 必须由 Builder 构造）
- 编译结果 RuleIR 的结构与不变量
- 多规则的确定性排序语义
- 明确的错误边界（setup 期违规、非法 builder 使用等）

### 0.2 非目标（v0）

- 不定义 when/intent 的语义细节（见对应契约）
- 不定义运行期评估与计划输出（见 `runtime.apply.v0.md`）
- 不提供动态/运行期规则声明能力

---

## 1. API 形态（v0）

```ts
def.rule(spec: RuleSpec<Props>): void
```

- `def.rule` 在 setup 期之外调用 **必须抛错**。

---

## 2. RuleSpec（v0）

```ts
type RuleSpec<Props> = {
  label?: string;
  note?: string;

  when: (w: WhenBuilder<Props>) => WhenExpr<Props>;
  intent: (i: IntentBuilder) => void;
};
```

规则：

- `when` **必须**通过 `WhenBuilder` 构造表达式
- `intent` **必须**通过 `IntentBuilder` 记录意图
- RuleSpec 必须在 setup 期完全静态地确定
- **不得**让运行期闭包泄漏进 RuleIR

---

## 3. 编译产物：RuleIR（v0）

```ts
type RuleIR<Props> = {
  label?: string;
  note?: string;

  deps: RuleDep<Props>[];
  when: WhenExpr<Props>;
  intent: RuleIntent;
};
```

### 3.1 RuleIR 不变量

- RuleIR 必须是纯数据
- RuleIR 必须“原则上可序列化”
- RuleIR **不得**包含函数或宿主引用

---

## 4. 多规则排序语义（v0）

当多个规则同时为 active：

1. 仅按声明顺序排序

意图应用必须遵循该确定性顺序，冲突解析委托给语义合并。

---

## 5. 错误规则

以下情况 **必须同步抛错**：

- 在 setup 期之外调用 `def.rule`
- 在 `when` 中使用非 Builder 构造的值
- 在 `intent` 中使用不支持的操作
