---
rfc: 0100
title: 设计目标与非目标
status: Draft
category: Philosophy
version: 0.1.0
created: 2025-09-28
updated: 2025-09-28
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: []
obsoletes: []
depends_on: [0002]
conflicts_with: []
variant: PAL-PSC
affects_compliance: []
---

## 摘要

本文件定义 PAL 的总体目标与非目标，确立协议的关注范围。  
PAL 的宗旨是：**将交互本身协议化**，以“组件（Component）”作为落地点，为不同宿主的 UI 技术提供可重用的交互语义。  

## 1. 背景与动机

UI 世界中，新的框架与宿主层出不穷。工程是权衡与取舍的艺术，每个框架都有其合理性，也总会有更新的替代方案。  
相比之下，**交互模式变化极少**。点击、滚动、聚焦、拖拽等模式已经被一代又一代框架重复实现。  
PAL 的任务不是成为又一个框架，而是把这些**相对稳定的交互语义**提炼为协议，让它们在未来或过去的任意宿主中都可复用。  

## 2. 核心目标

PAL 的设计目标是：

1. **交互语义优先**  
   - 最终产物必须具备一致的交互表现与语义。  
   - 这是 PAL 的首要目标。  

2. **性能优化为次要收益**  
   - 通过合理的 Prototype 设计，性能往往自然得到提升，但这不是核心诉求。  
   - 性能相关的约束 **SHOULD** 存在，但优先级低于交互语义。  

3. **以 Component 为最终落地形态**  
   - 组件是“能够构建任意 UI”的交互元件。  
   - Prototype → Adapter/Compiler → Component，是 PAL 的基本路径。  
   - PAL 关心 Component（交互元件），而不关心 UI 整体布局或跨端运行。  

4. **RootElement 强制约束**  
   - 所有交互必须附着于 Prototype 的 RootElement。  
   - 若子元素需要独立交互，必须拆分为新的 Prototype。  
   - 此约束保证交互边界清晰、可预测。  

## 3. 非目标

PAL **不**追求以下内容：

- **视觉规范的制定**  
  PAL 不会定义类似 Material、Ant Design 的设计语言。  

- **应用层框架**  
  PAL 不提供路由、状态管理、服务端渲染等应用级框架功能。  

- **跨端框架**  
  PAL 不直接承担“写一份代码跑全平台”的任务。宿主框架天然多样，PAL 专注于协议化交互，交由 Adapter/Compiler 去对接。  

- **性能至上哲学**  
  PAL 不会将极限性能作为核心目标；当性能与语义冲突时，语义优先。  

- **银弹化**  
  PAL 不承诺提供唯一正确的抽象。它允许多条变体路线（Variants）并存，只要能映射到统一的能力矩阵。  

## 4. 读者预期

本 RFC 面向：  
- **适配器实现者**：需要知道 PAL 的边界与优先级。  
- **规范贡献者**：在提出新 RFC 时，需确保不超越本文件定义的目标范围。  
- **研究人员**：理解 PAL 为什么选择“组件”作为最终产物，而非其他抽象。  

## 变更记录

- 0.1.0 (2025-09-28): 初稿，确立语义优先、性能次优先；确立 Component 为最终产物；声明 RootElement 约束与非目标。
