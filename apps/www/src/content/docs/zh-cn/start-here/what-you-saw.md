---
title: "你刚刚看到的是什么？"
description: "Landing Demo 的快速回顾"
---

## 你刚刚看到的是什么？

在 [Proto UI 官网首页](https://www.proto-ui.com) 的 Demo 中，你可以在 React、Vue、Web Component 等不同框架之间切换，而组件的交互行为保持完全一致。

这不是视觉模拟，也不是简单的样式切换。  
每一次切换，都会重新加载对应框架的运行时环境。

同一份组件逻辑，运行在不同的宿主中。


## Proto UI 是如何做到的？

核心在于一个分离：

- **交互逻辑**
- **技术实现**

在 Proto UI 中：

- 交互逻辑被抽象为 **Prototype（原型）**
- 技术实现由 **Adapter（适配器）** 或 **Compiler（编译器）** 负责

可以用一条简单的链路表示：

```
Prototype → Adapter / Compiler → Host Framework
```
Prototype 描述“组件做什么”。  
Adapter 或 Compiler 决定“组件如何在某个技术环境中运行”。

换句话说：

> 你写的不是 React 组件，也不是 Vue 组件，而是一份独立的交互原型。


## 这意味着什么？

框架可以变化。  
Prototype 不必重写。

组件的交互语义与具体实现解耦，使其可以在不同宿主中运行，而保持一致的行为表现。

这就是你刚刚看到的效果。


## 下一步

- 想知道它为什么存在 → [Why Proto UI]()
- 想理解整体结构模型 → [High-Level Model]()
- 想亲自试试 → [CodeSandbox]()