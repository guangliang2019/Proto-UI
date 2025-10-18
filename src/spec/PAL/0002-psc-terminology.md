---
rfc: 0002
title: 术语与约定（PAL 术语表）
status: Draft
category: Meta
version: 0.1.0
created: 2025-09-28
updated: 2025-09-28
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: []
obsoletes: []
depends_on: [0001]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

本文件给出 PAL 系列 RFC 的**统一术语与书写约定**。目标是为后续规范提供一致的词典，降低歧义与重复定义。  
本文**不**展开机制细节；机制性的选择（例如渲染范式、命名策略等）在 02xx 段具体规范中阐述。  

> 规范性关键词 **MUST/SHOULD/MAY** 按 RFC 2119/8174 解释。

## 1. 命名与大小写

- **类型名 vs 实例名**：类型名使用帕斯卡命名（如 `Prototype`、`Adapter`）；实例名使用小驼峰。  
- **asHook 前缀**：用于声明“对现有 Prototype 的行为扩展/重混合”的组合单元（如 `asScrollThumb`）。  
- **状态/样式导出名称**：本术语表不规定具体命名；相关约束见 `0205: State` 与视觉系统相关 RFC。  
- **Element 术语冲突约定**：PAL 中的 **RootElement** 指“交互必须附着的根元素”。当需指代 Web DOM 的 Element 时，使用 **DOMElement**。

## 2. 顶层抽象维度

- **Prototype**（原型）：  
  交互的协议化抽象单元，描述组件的结构、行为与最小能力；可被适配或编译为不同宿主的实现。  

- **asHook / Behavior**（行为钩子）：  
  用于对 Prototype 进行组合、重用与角色切换的机制。`asHook` 影响交互行为与外在语义，而不直接生成宿主对象。  

- **Adapter**（适配器）：  
  纯函数与运行时薄层，将 `Prototype` 映射为目标宿主中的 **Component** 实例及其生命周期绑定。  

- **Compiler**（编译器）：  
  纯函数与工具链，将 `Prototype` 静态化为目标宿主的代码/资源工件；产物在宿主环境内作为 **Component** 使用。  

- **Component**（组件）：  
  目标宿主环境中的具体实例化产物，承载渲染与交互。  

- **Host / 宿主**：  
  运行 Component 的技术环境或框架（如 WebComponent、React、Vue、Flutter、Qt 等）。  

- **RootElement**（根元素）：  
  每个 Prototype **MUST** 拥有且仅拥有一个 RootElement。所有交互事件必须绑定到 RootElement。  
  - 如果某个子元素需要独立的交互事件，则必须被拆分为新的 Prototype。  
  - 该约束迫使组件的设计者以交互为中心划分子原型，避免“幽灵事件”或不透明绑定。  

## 3. 原型基础能力维度

- **Lifecycle**：  
  组件/元素在时间维度下的阶段与过渡（如 `create`、`connect`、`disconnect`）；在不同宿主可能映射到不同的挂载/卸载语义。  

- **Event**：  
  用户交互维度下的输入通道与监听约定（含局部与全局监听）。  

- **State**：  
  组件向外部**可观察**的交互状态。PAL 规定其可见性与最小一致性，但不强制具体存储/推送机制。命名与导出细节由 `0205: State` 规定。  

- **Props**：  
  由开发者/设计师在调用 Component 时传入的参数配置；用于确定行为与表现的初值或策略。  

- **Context**：  
  组件之间的共享数据与依赖关系，通常沿父子结构传播，并在生命周期的特定时机建立订阅。  

- **Output**：  
  面向最终用户的可见/可交互输出。没有 Output 的 Prototype 无法构成完整交互流程。  

- **Expose**：  
  面向**开发者**的非交互暴露面，用于配置、检查或与外部系统集成（例如样式变量、监控钩子、内部句柄）。  

## 4. 诊断与可观测性（Debug / Diagnostics）

- **Debug / Diagnostics**：  
  指错误报告、日志、指标与追踪等**可观测性**能力。其属于跨领域的辅助能力，**不改变组件的对外语义**。  
  - PAL 在术语层面承认其为基础能力之一，但**机制细节**（错误分类、严重级别、日志传输、DevTools 钩子等）另行定义于 `0280: Diagnostics & Observability`。  
  - 实现者 **SHOULD** 提供可重现实验与最小诊断通道，以支撑合规检测与问题定位。  

## 5. 规范引用与关系声明

- RFC 引用优先使用编号（例如 *见 RFC 0200*），标题为辅。  
- 文档关系通过 front-matter 的 `updates`、`obsoletes`、`depends_on`、`conflicts_with` 声明。  

## 6. 变体与合规

- **Variants**：PAL 允许多条并行表达（例如 PAL-PSC）。术语定义对所有变体生效，除非在变体专属 RFC 中另行限定。  
- **Compliance Levels**：术语层仅声明存在 **PAL-Core** 等级；具体能力项与验收标准见 `0290: Capability Matrix`。  

## 7. 非目标

- 本术语表**不**决定渲染范式、状态命名、样式系统或具体 API 形状；相关内容在 02xx 规范或 03xx 实验路线中阐述。  

## 变更记录

- 0.1.0 (2025-09-28): 初稿。确立 RootElement 的 PAL 语义；Output 并入基础能力；引入 Debug/Diagnostics 作为辅助能力（细节留待 0280）。
