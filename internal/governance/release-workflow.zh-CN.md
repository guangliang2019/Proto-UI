# Proto UI 发版工作流

> 内部治理文档。本文定义 Proto UI 在公开发布前应如何组织准备分支、准备分支与 `main` 的关系，以及最终 release 应如何打 tag。

---

## 1. 本文目的

本文用于定义 Proto UI 首轮公开发布阶段的发版工作流。

它主要回答以下问题：

- 发版前准备工作应集中在哪个分支上
- 该分支应如何与 `main` 互动
- 何时才应该出现 release branch 或 release tag
- 版本决策应如何映射到实际发版动作

---

## 2. 当前工作模型

对于当前这一轮首次公开发布，Proto UI 使用一条专门的准备分支：

- `feat/v0-release-prep`

这条分支**不是**最终的 release branch。

它是以下工作的主承载分支：

- release 加固
- package 发布准备
- 文档口径对齐
- 治理与流程文档
- v0 首发 checklist 与剩余任务收口

`main` 仍然是受保护分支，也是最终 release tag 的来源。

---

## 3. 分支角色

### 3.1 `feat/v0-release-prep`

在首发前大约四周的准备周期中，`feat/v0-release-prep` 应作为主要集成分支使用。

这条分支可以：

- 持续积累面向发版的改动
- 多次从 `main` 合入，保持同步
- 承载那些不适合继续散落在多个临时分支中的收口工作

但不应把这条分支本身视为对外 release 信号。

### 3.2 `main`

`main` 仍是受保护的权威分支。

当发版准备工作被判断为完成时，应：

- 将 `feat/v0-release-prep` 合入 `main`
- 在 `main` 的合入结果上完成最终验证
- 从 `main` 打出最终 release tag

### 3.3 Release tag

对于第一次公开发布，最终 tag 应从 `main` 打出。

推荐 tag 形式：

- `v0.1.0`

如有需要，配套 release note 中仍可使用 `release/v0.1.0` 作为发布线描述，但 Git tag 本身应保持简洁、唯一、规范。

---

## 4. 为什么准备分支不直接叫 `release/v0.1.0`

在真正发布之前，Proto UI 仍有不少较大的准备工作。

如果过早使用 `release/v0.1.0`，会把两层语义混在一起：

- 一条用于持续收口的工作分支
- 一次真正落地的最终发布身份

把二者区分开后，整个模型会更清晰：

- `feat/v0-release-prep` 表示“我们正在为首发做准备”
- `v0.1.0` 表示“`main` 上这一刻的状态就是首个公开发布”

---

## 5. 推荐发版顺序

推荐采用以下顺序：

1. 在 `feat/v0-release-prep` 上持续推进发版准备工作。
2. 按需要多次从 `main` 合入 `feat/v0-release-prep`，保持最新。
3. 在准备分支上完成首发门槛项。
4. 将 `feat/v0-release-prep` 合回 `main`。
5. 以计划对外发布的 `main` 状态为准，完成最终 release 验证。
6. 从 `main` 打出 `v0.1.0` tag。

这样可以把最终 release 身份牢牢绑定在受保护的权威分支上，而不是绑定在一条长期工作的准备分支上。

---

## 6. `v0` 阶段的版本协同要求

发版工作流应遵守版本策略：

- 公开包保持相同 minor 版本
- patch 是同一条 minor 线内部的安全升级边界
- 当 Proto UI 的生态协同边界发生变化时，应进入新的 minor 线

对 `v0.1.0` 来说，这意味着首发应呈现为一条一致的 package line，而不是多个彼此无关的 minor 混搭。

---

## 7. 准备窗口中的维护者规则

在发版准备窗口中，维护者应优先：

- 让 release 叙事更真实，而不是更宏大
- 在临近发版时主动收窄范围，而不是继续扩张
- 足够频繁地从 `main` 合入，避免最后一次集成过重
- 把治理、文档、packaging、发版标准放在同一条准备分支里持续收口

准备分支的目的不是隐藏未完成工作。

它的目的是把发版关键项集中起来，直到它们可以安全落到 `main`。

---

## 8. 总结

Proto UI 当前的发版工作流可概括为：

- 在 `feat/v0-release-prep` 上准备
- 持续与 `main` 同步
- 满足发版标准后合回 `main`
- 最终从 `main` 打出 `v0.1.0` tag

这样既保留了准备期的灵活性，也保证了公开 release 身份足够清晰。

---

## 9. GitHub 手动/半自动发包流程（2026-04-16 起）

为适配首发窗口内的 package 治理与 npm 限流风险，新增 GitHub Actions 发布工作流：

- `.github/workflows/release-packages.yml`
- 触发方式：`workflow_dispatch`（手动触发）
- 运行模式：
  - `scan`：只扫描（可产出 JSON 工件）
  - `stage`：dry-run 发包演练
  - `publish`：真实发布（要求显式提供版本号）

### 9.1 首发治理口径

发布工作流默认支持 `--profile launch`，并启用 `--check-governance`。

这意味着：

- 发布集合与 `internal/governance/launch-package-governance.json` 对齐
- 若 workspace 新增 package 但未进入治理文件，流程会失败并提示补齐治理映射
- 候选包只有在状态为 `approved` 且显式开启 `--include-approved-candidates` 时才允许上车

### 9.2 npm 429 风险控制

发布流程内建三个限流控制参数：

- `--publish-delay-ms`：包与包之间的请求间隔
- `--max-publish-retries`：遇到 429/限流报错时重试次数
- `--retry-delay-ms`：每次重试前等待时间（含递增退避）

推荐首发默认值：

- `publish_delay_ms=3000`
- `max_publish_retries=2`
- `retry_delay_ms=15000`

若观察到 429，可优先提高 `publish_delay_ms` 与 `retry_delay_ms`，而不是继续提高并发或缩短节奏。

### 9.3 管理策略要求

`publish` 模式应由维护者手动触发，不建议纯自动触发。

建议治理动作：

- 将 `publish` 操作绑定到受控分支（如 `feat/v0-release-prep` 与后续 `main` release 点）
- 使用 GitHub Secrets 管理 `NPM_TOKEN`
- 通过仓库权限或环境审批控制“谁可以按下 publish”
