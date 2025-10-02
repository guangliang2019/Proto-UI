# PAL RFC Index

This directory contains the **Proto UI – PAL (Protocol Adapter Layer)** RFC series.
RFCs capture long‑lived decisions, specifications, and their evolution. They are *not* tutorials or marketing copy.

> **Normative keywords**: “MUST”, “MUST NOT”, “SHOULD”, “SHOULD NOT”, and “MAY” are to be interpreted as in RFC 2119/8174.

## Number ranges (convention)

- **0001–0099 — Meta & Process**
  - 0001: PAL RFC 流程与版本治理
  - 0002: 术语与约定（术语表、符号、关键名词定义）
- **0100–0199 — Philosophy & Goals**
  - 0100: 设计目标 / 非目标
  - 0101: 与现有生态的关系（React/Vue/Flutter/Qt/...）
- **0200–0299 — Core Specification**
  - 0200: Prototype 基本模型（PSC 线：props/state/context）
  - 0201: Adapter 基本模型
  - 0202: PrototypeElement 协议（可代理根节点的最小能力）
  - 0203: 生命周期（create/connect/disconnect；Context 建立顺序）
  - 0204: 事件系统（EventManager）
  - 0205: 状态系统（State.define / State.watch 与命名约束）
  - 0290: 能力矩阵（Capability Matrix）与合规等级（Compliance Levels）
- **0300–0399 — Experimental Tracks（替代表达/设计空间）**
  - 0300: 设计空间地图（Alternative Decompositions）
  - 0301+: PAL-<Variant> 草案（例如 PAL-Roles）
- **0400–0499 — Adapter-Specific**
  - 0400: Web Component Adapter
  - 0401: React Adapter
  - 0402: Vue Adapter
  - 0403: Flutter Adapter
  - 0404: C++/Qt Adapter
- **0500–0599 — Implementation Guidance**
  - 0500: 如何编写新 Adapter
  - 0501: 性能与测试基准
  - 0502: 兼容性与迁移策略
- **0600–0699 — Informational / Background**
  - 0600: 历史与演化
  - 0601: 案例研究（Shadcn / Material 对接）

## File naming

Each RFC is a single Markdown file named:

```
####-short-slug.md
```

Examples:
- `0001-pal-rfc-process.md`
- `0200-prototype-model.md`

## Status values

- **Draft** — 草案；可随时发生破坏性变化。
- **Review** — 进入公开评审期（Last Call）。
- **Active** — 被采纳；变更须遵循弃用/迁移策略。
- **Deprecated** — 已弃用；给出迁移路径与移除时间线。
- **Obsoleted** — 被新 RFC 完全取代；仅保留为档案。
- **Experimental** — 实验性路线（不承诺兼容性）。

## Variants & Profiles

PAL 允许多条并行表达（**Variant**）。当前主线是 **PAL‑PSC**（以 props/state/context 为切分）。
不同变体需映射到统一的 **能力矩阵** 与 **合规等级**，以保持工程上的可比较性。

## Cross‑linking

RFCs SHOULD declare relationships via front‑matter keys:
- `updates`, `obsoletes`, `depends_on`, `conflicts_with`

---

For tutorials and API usage, see the main site. RFCs are archival specs and decision records.
