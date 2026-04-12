# Interaction Boundary / Hit Participation 路线推进计划

> 目标：从“跨平台可用的 outside click / outside interaction 判定”这个实际问题出发，逐步建立 Proto UI 的 `interaction boundary` 与 `hit participation` 基础能力，并把 `overlay / modal / dismiss / dropdown / select / dialog` 迁移为这些能力的 consumer。
>
> 本计划以仓库现状为前提，强调“小步推进、每步落文档、每步有测试”。

---

## 0. 现状对齐

当前仓库里已经有几个很重要的承接点：

- `packages/hooks/src/as-overlay.ts` 已经是特权级 `asHook`
- `packages/modules/overlay` 已经是独立 module，并通过 adapter host-cap 接入 portal / modal lock / layer scheduler
- `packages/adapters/base/src/wiring/caps-builder.ts` 已经具备“module 申请宿主能力，adapter 提供 cap”的扩展形态
- `packages/adapters/*/src/runtime/modules.ts` 已经是 React / Vue / Web Component adapter 的能力接入点
- `packages/prototypes/base/src/dialog/content.ts` 目前仍自行监听全局 `pointerdown` 做 outside close
- `packages/prototypes/base/src/dropdown/content.ts` 与 `packages/prototypes/base/src/select/content.ts` 目前只有 `Escape` 关闭，没有正式的 outside-close 抽象

这意味着我们不是从零开始，而是在已有 `module + hook + adapter cap` 体系上补齐新的交互基础能力。

---

## 1. 本计划的硬约束

- [x] `event` 通路不承载 boundary / hit 语义，只继续负责注册与分发
- [x] `outside` 必须来自 boundary classification，而不是各组件各自 `contains(...)`
- [x] boundary 必须支持多 region，且不能绑定组件树
- [x] boundary 必须允许 `unknown`，adapter/host 不能伪造 outside
- [x] `asBoundary` / `asHitParticipation` 作为基础能力存在，不新增 `asClickOutside` / `asDismiss` / `asModal`
- [x] 每个阶段都必须同步更新文档与测试，再进入下一阶段

---

## 2. 总体分期

### Phase 0: 契约与回归基线

先把语义和验收面钉死，不做大迁移。

### Phase 1: `asBoundary` + `module-boundary` 最小落地

先实现“交互域”本身，但不急着改 dialog。

### Phase 2: 用 boundary 验证 outside 语义

优先迁移 `dropdown` / `select`，把 outside-close 跑通。

### Phase 3: `asHitParticipation` + `module-hit-participation`

补“是否参与命中 / 是否穿透”的能力，但先不做完整 blocking。

### Phase 4: overlay 开始消费 boundary

让 `asOverlay` 不再各处自己处理 outside，先接入 boundary 与弱栈。

### Phase 5: dialog / modal 语义重写

重写现有 `modal` 的实现方式，把 dialog outside-close / alert / mask 逻辑放回统一模型。

### Phase 6: policy 抽象与长期整理

把 modal / focus isolation / scroll lock / interaction blocking 整理成可扩展 policy。

---

## 3. 每阶段统一交付模板

每个阶段都必须按下面顺序推进：

1. 先补或更新契约文档
2. 再落 module / hook / adapter wiring
3. 再迁移 consumer
4. 最后补 prototype docs / demos / regression tests

每阶段 merge 前都必须满足：

- [x] 至少一份契约/设计文档已经更新
- [x] 至少一层 module/runtime 测试已覆盖
- [x] 至少一层 adapter 或 prototype 行为测试已覆盖
- [x] 已记录“这一阶段暂不解决什么”

---

## 4. 建议文件落点

### 新契约 / 设计文档

- `internal/contracts/interaction-boundary/interaction-boundary.v0.md`
- `internal/contracts/hit-participation/hit-participation.v0.md`
- `docs/superpowers/specs/2026-04-12-interaction-boundary-architecture.md`

### 预计新增模块

- `packages/core/src/boundary.ts`
- `packages/modules/boundary/*`
- `packages/hooks/src/as-boundary.ts`
- `packages/core/src/hit-participation.ts`
- `packages/modules/hit-participation/*`
- `packages/hooks/src/as-hit-participation.ts`

### 预计修改入口

- `packages/runtime/src/instance/instance.ts`
- `packages/adapters/base/src/wiring/caps-builder.ts`
- `packages/adapters/react/src/runtime/modules.ts`
- `packages/adapters/vue/src/runtime/modules.ts`
- `packages/adapters/web-component/src/runtime/modules.ts`
- `packages/hooks/src/as-overlay.ts`
- `packages/modules/overlay/src/*`
- `packages/prototypes/base/src/dropdown/*`
- `packages/prototypes/base/src/select/*`
- `packages/prototypes/base/src/dialog/*`

### 预计新增测试

- `packages/modules/boundary/test/*.test.ts`
- `packages/modules/hit-participation/test/*.test.ts`
- `packages/runtime/test/contract/boundary.v0.contract.test.ts`
- `packages/runtime/test/contract/hit-participation.v0.contract.test.ts`
- `packages/adapters/web-component/test/contract/boundary.*.test.ts`
- `packages/adapters/react/test/boundary.*.test.ts`
- `packages/adapters/vue/test/boundary.*.test.ts`
- `packages/prototypes/base/test/dropdown.test.ts`
- `packages/prototypes/base/test/select.test.ts`
- `packages/prototypes/base/test/dialog.test.ts`

---

## 5. Phase 0: 契约与回归基线

**目标：** 先把边界清楚地写出来，并补一批会保护后续重构的回归测试。

### Phase 0.1 文档先行

- [x] 基于 `internal/records/2026-04-12-Proto UI 交互能力抽象路线（阶段性整理）.md`，整理出正式契约草案
- [x] 新增 `interaction-boundary.v0.md`
- [x] 新增 `hit-participation.v0.md`
- [x] 新增 architecture note，明确 boundary / hit / overlay / focus / event 的关系
- [x] 更新 `internal/contracts/overlay/as-overlay.v0.md`
  - 明确 `modal` 在过渡期只是 policy 声明，不再被解释为“overlay 自己拥有底层拦截能力”

### Phase 0.2 回归基线

- [x] 为当前 dialog outside-close 行为补更明确的 adapter / prototype 测试
- [x] 为 dropdown / select 新增正式 outside-close regression case，避免后续迁移时遗漏
- [x] 为 overlay contract test 补 boundary 协同 outside 语义说明与回归

### Phase 0 退出条件

- [x] boundary / hit / overlay 三者职责边界在文档里已经固定
- [x] 当前 dialog / dropdown / select 的交互现状有测试保护
- [x] 团队后续不会再围绕“outside 算不算 event 语义”反复争论

---

## 6. Phase 1: `asBoundary` + `module-boundary` MVP

**目标：** 建立“交互域”这件事本身，但暂时不迁移 dialog。

### Phase 1.1 API 约束

- [x] 新增 `packages/core/src/boundary.ts`
- [x] 定义最小结果模型：
  - `inside`
  - `outside`
  - `unknown`
- [x] 定义 boundary handle 最小能力：
  - 创建/获取当前 boundary
  - 注册 region
  - 注销 region
  - classify 某次交互
  - 订阅 outside
- [x] 明确 `unknown` 是一等结果，不能在 module 内偷转成 `outside`

### Phase 1.2 新 module 与特权 hook

- [x] 新增 `packages/modules/boundary`
- [x] 新增 `packages/hooks/src/as-boundary.ts`
- [x] 在 `packages/runtime/src/instance/instance.ts` 注册 `BoundaryModuleDef`
- [x] 采用与 `focus` / `overlay` 类似的“特权可配置 hook + module facade/port”结构

### Phase 1.3 adapter host-cap

- [x] 在 `packages/adapters/base/src/wiring/caps-builder.ts` 增加 `useBoundary(...)`
- [x] 为三套 adapter 提供 boundary 所需 host-cap
- [ ] host-cap 职责至少包括：
  - 将注册 region 映射为宿主可识别目标
  - 在宿主层收集 global pointer/focus 采样
  - 返回 `inside / outside / unknown`
- [x] 第一版必须覆盖 portal / relocated host 的判定
- [x] 第一版如果某平台无法可靠判断，必须返回 `unknown`

### Phase 1.4 测试

- [ ] module 单测：region 注册、去注册、多 region、unknown 传播
- [x] runtime contract：重复 `asBoundary` 调用的行为、setup-only 限制、trace
- [x] adapter 测试：普通 DOM、portal 后 content、trigger/content 分离场景

### Phase 1 退出条件

- [x] boundary 已能独立工作
- [x] 还没有强推 overlay 或 dialog 迁移
- [x] outside 终于有统一来源，但 consumer 还没全面接入

---

## 7. Phase 2: 用 boundary 跑通 dropdown / select 的 outside-close

**目标：** 先在非 modal overlay 上验证 boundary 语义，而不是一上来改 dialog。

选择 `dropdown` / `select` 作为第一批 consumer，有三个原因：

- [x] 它们已经依赖 `asOverlay`
- [x] 它们的 outside-close 需求真实，但比 dialog 的 modal/alert 语义简单
- [x] 它们能同时验证 trigger / content / item / portal 的 region 组合

### Phase 2.1 迁移 dropdown

- [x] 在 `packages/prototypes/base/src/dropdown/content.ts` 接入 `asBoundary`
- [x] 把 outside close 改为 boundary subscription，而不是本地 DOM 判定
- [x] 把 trigger 与 content 纳入同一 boundary
- [x] 保证 item commit 与 outside press 的 close reason 可区分

### Phase 2.2 迁移 select

- [x] 在 `packages/prototypes/base/src/select/content.ts` 接入 `asBoundary`
- [x] 让 trigger / content / value 呈现路径在 boundary 内协同
- [x] 验证“打开后点击外部关闭，且 restore focus 到 trigger”路径

### Phase 2.3 文档与测试

- [x] 更新 `internal/contracts/prototype-base/dropdown.v0.md`
- [x] 更新 `internal/contracts/prototype-base/select.v0.md`
- [x] 补 `dropdown.test.ts` 的 outside-click case
- [x] 补 `select.test.ts` 的 outside-click case
- [ ] 在至少一个 adapter 层补 portal/teleport 后 outside 判定测试

### Phase 2 退出条件

- [x] dropdown / select 已不再各自发明 outside 逻辑
- [x] outside 的来源已经是 boundary classification
- [x] 仓库里有了第一个“boundary 真正可用”的业务验证面

---

## 8. Phase 3: `asHitParticipation` + `module-hit-participation` MVP

**目标：** 把“是否参与命中 / 是否允许穿透”从 boundary 与 event 中独立出来。

### 当前进度（2026-04-12）

- [x] `packages/core/src/hit-participation.ts` 已落最小 core types
- [x] `asHitParticipation(...)` 与 `module-hit-participation` 已接入 runtime
- [x] runtime contract 已全部 executable，覆盖 capability 复用、`disabled`、`passthrough`、feedback 独立性、overlay-adjacent passthrough、host bridge sync 与 unmount cleanup
- [x] adapter host-cap 与 web host bridge 已接入 React / Vue / Web Component wiring
- [x] `dialogMask` 已开始消费 `hit participation`，支持显式 `passthrough` 声明并有 adapter / prototype 回归
- [ ] overlay / decorative wrapper 等更多 consumer 仍待迁移到这一能力之上

### Phase 3.1 契约与 core types

- [x] 新增 `packages/core/src/hit-participation.ts`
- [x] 定义最小模型：
  - enabled / disabled
  - passthrough
- [x] 明确它发生在 event 之前，不属于 feedback/style，也不等价于 CSS `pointer-events`

### Phase 3.2 新 module 与 hook

- [x] 新增 `packages/modules/hit-participation`
- [x] 新增 `packages/hooks/src/as-hit-participation.ts`
- [x] 在 runtime 注册 `HitParticipationModuleDef`

### Phase 3.3 adapter host-cap

- [x] 在 `caps-builder` 增加 `useHitParticipation(...)`
- [x] 由 adapter 提供宿主桥接
- [x] 第一阶段只支持：
  - 声明宿主节点不参与命中
  - 声明穿透
- [x] 暂不实现统一 block layer / gesture 分类

### Phase 3.4 验证用例

- [x] 为 overlay mask 设计验证样例
- [x] 保证 passthrough 不会被误解释成 outside
- [x] 验证 hit participation 与 boundary 是独立能力：一个决定“能否命中”，另一个决定“命中后属于谁”

### Phase 3 退出条件

- [x] hit participation 已与 boundary 分离
- [x] pointer-events 类问题有正式抽象承接点
- [x] event 没有被迫继续膨胀

---

## 9. Phase 4: overlay 开始消费 boundary，并引入弱 boundary 栈

**目标：** 让 overlay 从“自己处理外部交互”转为“消费 boundary 的判定结果”。

### 当前进度（2026-04-12）

- [x] overlay 已开始把 `trigger / anchor / content` 注册为 boundary region
- [x] `closeOnOutsidePress` 已改为消费 boundary outside notification
- [x] boundary 弱栈 MVP 已落地，`BOUNDARY-0800` 已有可执行契约测试
- [x] boundary runtime contract 已全部 executable，包含 unmount cleanup 与弱栈语义
- [ ] `closeOnFocusOutside` 仍待迁移到统一 boundary / focus 协同模型
- [ ] nested dropdown / submenu 的专门回归测试仍待补齐

### Phase 4.1 overlay 内部迁移

- [x] 更新 `packages/modules/overlay/src/create.ts` / `packages/modules/overlay/src/impl.ts`
- [x] 让 overlay 把 `trigger / anchor / content` 注册为 boundary region
- [ ] 让 `closeOnOutsidePress` 与 `closeOnFocusOutside` 来自 boundary subscription
- [x] 保留现有公开 API，先不大改 author-facing surface

### Phase 4.2 弱栈

- [x] 为 boundary 引入 top-most 概念
- [x] 一次 outside interaction 只能关闭最顶层 consumer
- [ ] 先满足 dropdown submenu / nested overlay 的最小需求
- [x] 暂不开放复杂的公开查询 API

### Phase 4.3 文档与测试

- [x] 更新 `internal/contracts/overlay/as-overlay.v0.md`
- [x] 新增 overlay + boundary 协同测试
- [ ] 增加 nested dropdown / submenu 防止“一次点击关多层”的测试

### Phase 4 退出条件

- [x] overlay 已经不是 outside 判定的源头
- [x] top-most boundary 行为有最小保障
- [x] 现有 overlay API 基本保持兼容

---

## 10. Phase 5: dialog / modal 语义重写

**目标：** 重写现有 dialog 的 outside-close 与 modal 实现方式，让它建立在 boundary + hit + focus 之上。

### 当前进度（2026-04-12）

- [x] `dialog/content.ts` 已从 DOM `contains(...)` 风格 outside 判定迁到 boundary notify
- [x] `dialog/content.ts` 已把 trigger 纳入 boundary / overlay 注册路径
- [x] `dialogMask` 已开始消费 `hit participation`，支持显式 `passthrough`
- [ ] `closeOnFocusOutside` 仍未进入统一 boundary / focus 协同模型
- [ ] `modal` 仍是过渡期 policy 声明，尚未完成底层治理模型重写

### 为什么把 dialog 放到这一步

- [ ] 现在 `packages/prototypes/base/src/dialog/content.ts` 仍有自定义 global `pointerdown` outside-close
- [ ] dialog 还叠加了 `alert`、`mask`、`focusScope`、portal、scroll lock 等复杂语义
- [ ] 如果 boundary / hit / weak stack 还没站稳，太早迁移 dialog 会把问题揉在一起

### Phase 5.1 dialog 内容区迁移

- [ ] 移除 `dialog/content.ts` 中手写的 outside 判定路径
- [ ] 将 `content`、`trigger`、必要时的 `mask` 纳入明确 boundary 设计
- [ ] `alert=true` 时 outside 结果可以存在，但 dismiss policy 不消费它

### Phase 5.2 `modal` 参数重写

- [ ] 保持 `modal` 对外可用，但内部语义改成 policy declaration
- [ ] 将 body scroll lock、focus isolation、interaction blocking 拆到明确 consumer/bridge
- [ ] overlay 不再被视为“直接拥有底层拦截能力”

### Phase 5.3 文档与测试

- [ ] 更新 dialog contract / docs / demos
- [ ] 扩展 `packages/prototypes/base/test/dialog.test.ts`
- [ ] 扩展 React / Vue / Web Component dialog adapter tests
- [ ] 覆盖：
  - outside press close
  - alert dialog outside 不关闭
  - portal 后 outside 判定
  - restore focus
  - modal policy 仍生效

### Phase 5 退出条件

- [ ] dialog outside-close 已进入统一模型
- [ ] `modal` 不再意味着 overlay 自己做底层命中治理
- [ ] dialog 成为 boundary/focus/policy 协同 consumer

---

## 11. Phase 6: policy 抽象与长期整理

**目标：** 把阶段性兼容方案整理为更清晰的长期模型。

### Phase 6.1 policy surface

- [ ] 评估是否引入 `interactionPolicy`
- [ ] 将 `modal / non-modal` 归一成正式策略对象或枚举
- [ ] 为 scroll lock / focus isolation / interaction blocking 预留位置

### Phase 6.2 清理过渡语义

- [ ] 清理 overlay 内部仍残留的旧 modal 假设
- [ ] 清理组件侧 fallback outside 实现
- [ ] 为 boundary / hit / overlay / focus 建立稳定术语表

### Phase 6 退出条件

- [ ] policy 是显式的
- [ ] overlay 已经彻底降级为 consumer
- [ ] 核心语义不再依赖过渡兼容说法

---

## 12. 推荐实施顺序

按下面顺序推进，可以把风险拆开：

1. `Phase 0` 先锁文档与测试基线
2. `Phase 1` 只做 `module-boundary` MVP，不碰 dialog
3. `Phase 2` 先迁移 `dropdown` / `select`，验证 outside 语义
4. `Phase 3` 再补 `module-hit-participation`
5. `Phase 4` 让 overlay 改为消费 boundary，并补弱栈
6. `Phase 5` 最后重写 dialog / modal 方案
7. `Phase 6` 再做长期 policy 清理

这个顺序刻意避免两种风险：

- [x] 一上来把 dialog、overlay、modal、outside 全部揉在一起
- [x] 在没有 boundary/unknown 语义前，就开始让 adapter 伪造“外部点击”

---

## 13. 每阶段必须回答的验收问题

在进入下一阶段前，都要回答下面的问题：

- [ ] 新能力的契约是否已经写进正式文档，而不只是讨论记录
- [ ] `unknown` 是否被保留，还是被某层偷偷吞掉了
- [ ] outside 是否已经只有一个来源
- [ ] 是否有任何组件重新引入了 `contains(...)` 风格的私有 outside 判定
- [ ] adapter host-cap 是否清楚说明了平台能力边界
- [ ] 至少有一层测试证明 portal / relocated host / trigger-content 分离场景可用

---

## 14. 第一批建议直接开工的事项

如果按“小步推进”的原则，本周只建议开下面三件事：

- [x] 写出 `interaction-boundary.v0.md`
- [x] 写出 `hit-participation.v0.md`
- [x] 给 `dropdown` / `select` / `dialog` 现状补一轮更明确的回归测试

原因很简单：

- [x] 这是争议最少、沉淀价值最高的一步
- [x] 它会直接决定后续 module API 和 host-cap 形态
- [x] 它能在不大改实现的前提下，先把后续重构的安全网搭起来

---

## 15. 总结

这条路线的关键不是“尽快写出点击外部关闭”，而是先把 Proto UI 里“谁有交互资格、哪些区域属于同一交互域、命中发生在什么层、overlay 只是消费谁的结果”讲清楚。

按这份计划推进，短期能先解决 dropdown / select / dialog 的 outside-close，一步步把能力真正沉到 `boundary + hit participation`；长期则能把 modal、focus isolation、scroll lock 也统一到同一套交互治理模型里。
