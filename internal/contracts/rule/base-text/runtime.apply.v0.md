# runtime.apply.v0.md（中文底本）

> 状态：Draft – v0（实现对齐）
>
> 本契约规定 rule 运行期如何评估 RuleIR 并产出 Plan。rule 运行期不直接触达宿主。

---

## 0. 范围与非目标

### 0.1 范围（v0）

- 规则评估流程
- Plan 输出结构
- Adapter 的消费边界
- 最小依赖 wiring 约束

### 0.2 非目标（v0）

- 不定义渲染/调度策略
- 不定义 host 侧应用细节
- 不引入通道外的冲突解决

---

## 1. 评估模型（v0）

给定：

- 一组 RuleIR
- 其依赖所需的当前可观察值

运行期必须：

1. 评估每条 rule 的 `when`
2. 选出 active rules
3. 按确定性规则排序
4. 依序收集 intent ops
5. 对每种 intent 通道执行对应的合并策略（见 `intent.compose.v0.md`）
6. 产出 Plan（默认），或由扩展包短路执行

---

## 2. Plan 输出（v0）

```ts
type RulePlanV0 = {
  kind: 'style.tokens';
  tokens: string[];
};
```

- `tokens` 必须经过语义合并
- 空 token 表示无激活的 style intent

> 说明：Plan 是默认输出形式，用于承载“合并后的语义结果”。  
> 执行器是独立 module，可由 adapter 定制。  
> 若扩展包短路 Plan，则必须自行承担执行责任。  
> 随着 intent 通道扩展，Plan 的结构可按通道扩展；  
> 不同通道必须定义各自的合并与应用规则。

---

## 3. Adapter 消费边界

Adapter：

- 消费 Plan
- 决定调度与实现策略
- 确保宿主反映最新 tokens

Rule 运行期 **不得**：

- 触达宿主或绕过 adapter 的执行边界
- 主动调度渲染

执行器边界约束：

- 默认执行器必须通过各通路 facade 完成执行，不得直接触达宿主
- adapter 可通过 host-cap 定制/替换执行器（不规定命名与形态）
- 扩展包若短路 Plan，必须自行完成等价执行或明确交由 adapter

---

## 4. 依赖 wiring（v0 最小要求）

- `deps.kind === 'prop'` 必须连接到 resolved props 观察
- 依赖变化时必须触发 rule 重新评估

state/context 依赖可在 v0 测试中被 stub，但 RuleIR 中 **必须**存在这些依赖记录。

---

## 5. state intent 的合并与应用（v0）

当 intent 通道包含 state 相关操作时：

- 运行期必须先对每个 state 合并出“最终目标值”
- 合并采用分层（layer）模型（见 `intent.state.v0.md`）
- 在单次评估周期内，对每个 state **最多执行一次 set**
- 若目标值与当前值相同则不应触发 set

---

## 6. Web 平台优化说明（推荐，非强制）

当同时满足：

- `when` 依赖的是已 expose 的 state
- adapter 启用 `expose-state-web`（映射为 CSS 变量 / DOM Attribute）
- intent 仅为 `feedback.style`

则 rule 可被编译为静态选择器样式，runtime **无需执行**。该优化对语义等价，属于 v0 推荐实践。

---

## 7. 不变量

- 评估必须确定性
- 相同输入必须产生相同合并结果（Plan 或等价执行效果）
- 运行期不得绕过 adapter 的执行边界
