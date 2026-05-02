# Proto UI CI/CD 使用说明

本文说明仓库内 GitHub Actions 工作流的职责，以及它们与 v0 首发 package 治理的对应关系。

当前对外发布时间目标是 **2026 年 5 月 14 日**，CLI 上线目标日期同样是 **2026 年 5 月 14 日**。

## 工作流总览

| 工作流 | 文件 | 作用 |
| --- | --- | --- |
| CI | `.github/workflows/ci.yml` | PR 与主干质量闸门（`check:types`、`test`） |
| Release Packages | `.github/workflows/release-packages.yml` | 手动/半自动执行 release scan、stage 彩排、真实发包 |

## CI 工作流（`ci.yml`）

- 触发条件：
  - `pull_request`
  - `push` 到 `main` 与 `feat/v0-release-prep`
  - `workflow_dispatch`（手动触发）
- Job：
  - `type-check` 执行 `pnpm -s check:types`
  - `test` 执行 `pnpm -s test`
- 并发策略：
  - 同一分支新的 CI 会取消旧的 in-progress run，减少排队和重复消耗。

## 发布工作流（`release-packages.yml`）

该工作流采用 `workflow_dispatch` 手动触发，目的是降低误发风险。

### 关键入参

- `mode`：`scan` / `stage` / `publish`
- `profile`：`launch` / `workspace`
- `include_approved_candidates`：是否包含已准入候选包
- `version`：`publish` 模式必填
- `tag`：npm dist-tag（默认 `latest`）
- `only`：可选包过滤
- `publish_delay_ms`、`max_publish_retries`、`retry_delay_ms`：429 限流防护参数

### 安全规则

- `publish` 仅允许在以下分支执行：
  - `main`
  - `feat/v0-release-prep`
- `publish` 必须配置 `NPM_TOKEN`。
- 同一 ref 上启用并发互斥，避免重叠发布任务。

## 与治理配置的绑定

`launch` 模式发布集合由以下文件驱动：

- `internal/governance/launch-package-governance.json`

脚本行为：

- `--profile launch` 默认只选首发承诺包。
- `--include-approved-candidates` 会额外纳入状态为 `approved` 的候选包。
- `--check-governance` 会在以下场景直接失败：
  - workspace 新增 package 未进入治理映射
  - 治理文件状态不合法（如候选状态非法、分层重复等）

## 必要 Secrets

- `NPM_TOKEN`：`mode=publish` 时用于真实发布

## 建议发布流程

1. 用 `launch` profile 先跑 `scan`，审阅 `release-scan.json`。
2. 用相同 profile 和过滤条件跑 `stage`（dry-run）。
3. 维护者确认后，带明确 `version` 跑 `publish`。
4. 若遇到 npm `429`，优先提高延时与重试等待，再进行下一次尝试。

## 本地快捷命令

- `pnpm release:scan:launch`
- `pnpm release:stage:launch`
- `pnpm release:publish:launch`
