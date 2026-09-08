# 后续 M/HC/A 批量编目安排

日期：2026-09-08。当前用户要求减少同时关注多个编目 PR 的成本。本文记录本批次选择与观察，不定义产品语义。

## 基线与提交方式

Context PR #627 已于 2026-09-07 14:05:20 UTC 获批准并合入，merge commit 为 `19a3f85116eb90300b12405a4d09f8a221d9fe20`。新分支 `codex/module-host-adapter-catalog-batch` 从该最新 main 建立；原文档工作分支保持不变。

默认一个活跃编目 PR，按完整语义切片组织独立 commit。既有契约下的 evidence、projection 和局部 drift 修复留在同一 PR；架构变化另行处理。持久工作规则见 `spec/MODULE-HOST-CAP-ADAPTER-CATALOGING.zh-CN.md` 的 10.1 节。

## 首批队列

| 顺序 | 领域 | 当前依据 | 本批次处理意图 |
| --- | --- | --- | --- |
| 1 | Feedback | 已有 C-FEEDBACK、C-FEEDBACK-STYLE 和 T 实体；尚无 M-FEEDBACK 或对应 Effects HC；四个 Adapter 已有 effects wiring | 先审查 style 子集的 facade/port、mixed ownership、view replay 与 commit/flush，形成第一条完整切片 |
| 2 | Rule | 已有 Rule / When / Intent / Extension 的 C/T；create.ts 的 optionalDeps 包含 props、state、context、feedback，尚无 M-RULE | 在 Feedback 边界确认后审查条件求值与反馈 bridge；不预设所有 extension 属于一个实体 |
| 3 | Anatomy | 已有 C-ANATOMY / ORDER 与 T；实现依赖 Expose、mixed ownership，尚无 M-ANATOMY | 沿既有 claim/domain/order、host targets 与生命周期补 M/HC/A；注意 #553 的 same-domain 设计重叠，涉及未定语义时暂停该部分 |

这些是候选顺序，不是已完成的 conformance 声明。首次边界审查如发现架构依赖，应调整队列，不制造占位实体。

A11y、Collection、Positioning、Text Control、Scroll、Image View 已有 M 实体；后续应检查其粒度、HC、A 和 executable evidence 的完整程度，不能按“缺少某个文件”重复创建身份。A11y 的 #625 / #621 direct-reference transport 正在进行，暂不在本批次并行改动该协议。Focus、Presence、Boundary、Overlay 可在首批基础组合完成后评估；不预先扩成无限队列。

## Feedback 第一轮 trace 起点

权威入口：`C-FEEDBACK-0001/0002`、`C-FEEDBACK-STYLE-0001..0005`、`C-RULE-INTENT-FEEDBACK-STYLE-0001` 与既有 Lifecycle 契约；这些 Feedback 契约目前为 draft，不能据编目自动提升。

实现入口：

- `packages/modules/feedback/src/create.ts`：setup baseline、runtime patch/suppress、privileged contributions、view epoch replay 与 afterRenderCommit。
- `packages/modules/feedback/src/types.ts`：author facade、privileged port 和内部 hooks。
- `packages/modules/feedback/src/caps.ts`：`EFFECTS_CAP`；HC 应按宿主最小责任建模，不机械复刻 token 名。
- `packages/runtime/src/kernel/handles/def.ts`、`run.ts` 与 `packages/runtime/src/instance/session.ts`：author projection 和 commit 边界。
- `packages/adapters/{react,vue,vue2,web-component}/src/runtime/modules.ts`：四个 profile 都有 effects wiring；source inspection 本身不构成 passing conformance。

可执行证据起点：

- `packages/runtime/test/contract/feedback.style.setup-only.v0.contract.test.ts`
- `packages/runtime/test/contract/feedback.style.runtime-patch.v0.contract.test.ts`
- `packages/runtime/test/contract/lifecycle.module-resources.v1.contract.test.ts`
- `packages/adapters/{react,vue,vue2,web-component}/test/feedback-style.test.ts`

已观察到的审查重点：反馈通路整体大于现有 style realization，不宜宣称所有感知通道都已实现；`resourceOwnership: mixed` 要拆清 instance style 和 view effects；现有 Vue 2 测试主要证明 token 投射及 user class 保留，尚不能单独证明所有 epoch/replay/缺失 capability 语义。模块没有独立 `packages/modules/feedback/test` 目录，需要根据实际标准补直接边界证据，而不能只统计现有 Adapter 测试数。

## 当前进度

- 已完成：合并基线核对、批量分支建立、PR 组织规则更新、首批队列及 Feedback 入口定位。
- Feedback 已形成工作区 candidate：`M-FEEDBACK-0001`、`HC-FEEDBACK-STYLE-SINK-0001`、`T-FEEDBACK-0001`，以及四个 Adapter 的支持、能力与 evidence relation。新实体保持 draft，既有 Adapter profile lifecycle 不变。
- 本批次尚未发布 PR；Rule、Anatomy 尚未开始。

## Feedback 实施记录

本 slice 只覆盖视觉样式。宿主能力按“接收最终 StyleHandle 并应用到当前 view”建模，queue/apply 是同一完整 sink；不按 EFFECTS_CAP 的宽泛名称推断 auditory/tactile 支持。surfaceTarget 与 boundaryTarget 的差异继续由 `C-HOST-SURFACE-PROJECTION-0001` 管理，不新建 target ownership。

边界回归测试确认并修复以下既有契约漂移：

- Module facade 返回的 setup `unUse` 缺少本层 phase guard；此前 Runtime wrapper 已有 guard，直接 Module 路径仍可绕过。
- `applyMergedStyle`、`afterRenderCommit` 与 flush notification 的 host entry 未统一拒绝 detached/unmounting；延迟 temporary projection 还需绑定原 view epoch，不能作用到下一 view。
- Module 没有 terminal dispose hook，记录与 patch 可残留；现在清理 recorder 和 pending work，已保留的内部写入口不能复活样式，内部 disposer 在终止后安全失效。

证据新增于 `packages/modules/feedback/test/catalog-boundary.test.ts`、`packages/adapters/base/test/feedback-effects-conformance.test.ts` 与四个 Adapter 的 `feedback.integration.test.ts`，并加强 actual Runtime 的 `lifecycle.module-resources.v1.contract.test.ts`。四个 Adapter 共用 `packages/adapters/base/test/fixtures/feedback-conformance.ts`，以真实 framework owner 驱动 Rule、patch、suppress、clearPatch，并检查 user class、child identity、Proto render count 和 fresh-owner baseline。

测试边界：Module/Runtime 证明重复 view epoch、capability 缺失/恢复、terminal disposal；实际 Adapter journey 证明普通 root 的样式 translation 与 fresh owner，未据此声称所有 framework view transition、浏览器 CSS 外观、几何布局或非 Web conformance。readonly render 中 runtime style write 的限制仍是 `C-FEEDBACK-STYLE-0005` open question，本轮没有替用户决定。

legacy Feedback README、export 和 setup-use 说明已同步 runtime patch 与两条生命周期轴，避免继续把静态 setup 子集写成整个 Feedback 的限制。
