# when.deps.props.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 **when 可以观察的 props 依赖**。props 在 rule 中只作为只读、可序列化的输入。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- when 对 props 的依赖合法性
- 依赖记录方式
- 依赖变化与重评估约束

### 0.2 非目标（v0）

- 不定义 props 的解析规则（见 props 契约）
- 不定义 intent 的实现（见 `intent.*.v0.md`）
- 不引入 props 写入能力

---

## 1. 依赖形式

when 通过 `w.prop(key)` 建立对 props 的依赖：

```ts
w.prop(key) -> { kind: "prop", key }
```

- 依赖必须被记录在 RuleIR 中
- 依赖记录必须去重且稳定

---

## 2. 值语义

- rule 读取的是 **resolved props** 的当前值
- props 为只读输入，rule 不得写入或变更 props

---

## 3. 重评估要求

- 当被依赖的 prop 发生变化时，rule 必须被重评估
- 具体调度可由 runtime 决定，但语义必须等价于“变化即重评估”

---

## 4. 总结

- props 是 rule 的合法输入通道
- when 仅观察，不具备写入能力
- 依赖变化必须触发重评估
