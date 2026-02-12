# intent.feedback.style.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 rule 的 `feedback.style` intent。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- `feedback.style.use` 的允许形式
- 支持的 handle 类型与 token 约束
- 合并与回滚语义（通过语义合并）

### 0.2 非目标（v0）

- 不定义 CSS 具体实现
- 不定义 adapter 的调度策略

---

## 1. 支持的 Handle（v0）

- 仅允许 Tailwind 风格的 `tw` handle
- token 语法必须符合 feedback v0 约束

不支持的 handle 类型在编译期 **必须抛错**。

---

## 2. 合并语义（v0）

- 运行期按 rule 声明顺序收集 `feedback.style.use`
- tokens 按顺序拼接，并交由 feedback 的语义合并处理
- 规则失效时，对应 tokens 会在下一次评估中移除

> 说明：该通道不采用“last-wins”，而采用语义合并。

---

## 3. 运行期执行与优化（v0）

- 运行期**可以**根据 rule 评估结果执行 `feedback.style` 的动态应用
- 在满足特定条件时，可被编译为静态样式而跳过运行期执行
- 具体优化由 adapter / 扩展模块决定
