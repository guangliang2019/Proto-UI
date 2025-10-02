---
rfc: 0001
title: PAL RFC 流程与版本治理
status: Active
category: Meta
version: 1.0.0
created: 2025-09-28
updated: 2025-09-28
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: []
obsoletes: []
depends_on: []
conflicts_with: []
variant: PAL-PSC
affects_compliance: []
---

## 摘要

定义 PAL RFC 的编号、元信息、生命周期、变更与弃用策略，以及“多变体（Variant）/合规模型（Compliance Levels）”的治理方式。目标是保证：
1) **可引用性**（编号稳定且可追溯），2) **演化可见性**（Updates/Obsoletes 链），3) **工程可比较性**（能力矩阵与合规等级）。

> 术语“**MUST/SHOULD/MAY**”按 RFC 2119/8174 解释。

## 1. 编号与命名

- 四位编号，按范围表达职能（见 `README` 号段约定）。
- 文件名：`####-short-slug.md`。编号一经分配，**MUST NOT** 因修订而改变。
- 同一主题的重大修订产出**新编号**，并在元信息中声明关系（`updates` / `obsoletes`）。

## 2. 元信息（front‑matter）

必填字段：

```yaml
rfc: <number>            # 0001
title: <string>          # 文档标题
status: Draft|Review|Active|Deprecated|Obsoleted|Experimental
category: Meta|Core|Extension|Adapter|Informational|Experimental
version: x.y.z           # 语义化版本
created: YYYY-MM-DD
updated: YYYY-MM-DD
authors: [Name, ...]
discussions: <URL>       # 公开讨论或 Issue
updates: [####, ...]
obsoletes: [####, ...]
depends_on: [####, ...]
conflicts_with: [####, ...]
variant: PAL-PSC|PAL-<VariantName>
affects_compliance: [PAL-Core, PAL-Extended-State, ...]
```

## 3. 生命周期

1. **Proposal**（提议） → 以 PR/Discussion 形式提出，分配草案编号（可临时）。  
2. **Draft**（草案） → 进入仓库；**MAY** 发生破坏性更改。  
3. **Review / Last Call** → 设定最少 7 日窗口；收敛变更。  
4. **Active** → 成为规范文本；破坏性变更须走“弃用策略”。  
5. **Deprecated** → 宣布弃用，保留迁移期。  
6. **Obsoleted** → 被新 RFC 完全取代，仅存档。

状态变更 **MUST** 在文首加入“变更记录”。

## 4. 变更类型

- **Editorial**（编辑性）：排版、措辞澄清、错别字；**MUST NOT** 改变技术含义；不增版本主号。  
- **Normative**（规范性）：影响行为/兼容性；需要版本号递增（次/主）。重大变更应作为新 RFC，使用 `updates/obsoletes`。

## 5. 弃用与迁移策略

- 宣布弃用后 **SHOULD** 提供：
  - 影响面与替代方案；
  - 最短 **一个次版本周期** 的迁移窗口；
  - 迁移清单（Breaking Changes）与机械可检校的规则（Lint/CI 纲要）。
- 移除已弃用接口 **MUST** 明确目标版本与时间点。

## 6. Variants / Profiles（多路线治理）

- **Variant**：不同的协议切分表达（如 PAL‑PSC、PAL‑Roles）。  
- 变体在 front‑matter 的 `variant` 标识；**MUST** 映射到统一的**能力矩阵**与**合规等级**（见 7）。  
- 主线默认是稳定度更高的变体（当前为 PAL‑PSC）。

## 7. 能力矩阵与合规等级

- `0290: Capability Matrix` 定义可观察行为与最小能力集合。  
- 合规等级示例：
  - **PAL-Core**：生命周期、事件绑定、状态暴露的最小集合；
  - **PAL-Extended-State**：高级 state 语义；
  - **PAL-Context-Advanced**：多层上下文与订阅拓扑；
- 任一变体或 Adapter **MUST** 声明其达成的合规等级，并提供最小验收用例。

## 8. 接受标准（何为 PAL 1.0）

PAL 主线（当前 PAL‑PSC）晋级 1.0 **MUST** 满足：
1) 能力矩阵稳定（无频繁重命名）；
2) ≥2 个 Adapter 达到 **PAL-Core** 合规（例如 WebComponent、Flutter）；
3) 存在公共测试套件与基线实现。

## 9. RFC 结构模板（建议）

```
## 摘要
动机与要点

## 动机（问题背景）
问题域、痛点、范围界定

## 术语与定义
关键名词、记号

## 规范（Normative Specification）
对象模型、状态机、API、事件、时序、错误

## 语义保证与安全性
可见性、原子性、竞态、性能语义、退化行为

## 兼容性与迁移
向后/向前兼容、弃用策略、迁移指南

## 实现建议（Informative）
参考实现、边界条件、测试线索

## 参考与致谢
相关工作、讨论线程
```

## 10. 变更记录

- 1.0.0 (2025‑09‑28): 初始采纳。
