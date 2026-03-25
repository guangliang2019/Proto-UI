---
title: '你刚刚看到的是什么？'
description: 'Landing Demo 的快速回顾'
---

## 你刚刚看到的是什么？

在 [Proto UI 官网首页](https://www.proto-ui.com) 的 Demo 中，你可以在 React、Vue、Web Component 等不同框架之间切换，而组件的交互行为保持完全一致。

这不是视觉模拟，也不是简单的样式切换。  
每一次切换，都会重新加载对应框架的运行时环境。

你看到的，不是三份组件实现，而是同一份交互定义，在不同宿主中被执行。

> 如果你还没有体验首页 Demo，建议先回到[首页](https://www.proto-ui.com)看一眼。  
> 它不是阅读本文的前置条件，但会帮助你更快理解 Proto UI 到底在展示什么。

## 这些组件是怎么来的？

你可以先把 Proto UI 理解成一种组合关系：

- 选择一个 Prototype（组件的交互定义）
- 再选择一个宿主对应的 Adapter
- 两者结合后，在该宿主中得到对应的组件实现

比如，你可以：

- 选择一个 `shadcn/ui` 风格的 Button Prototype
- 再选择 React Adapter
- 得到 React 中的 Button 实现

同样的 Prototype，也可以和别的 Adapter 组合，得到 Vue 或 Web Component 里的实现。

这一页先记住这件事就够了：

Proto UI 不是把现成组件在不同框架中复制一份，而是把组件拆成“定义”和“实现”两部分，再在不同宿主中重新组合。

## 这件事为什么值得在意？

这不只是“同一个组件跑在多个框架里”。

更重要的是，Proto UI 将原本绑定在具体实现中的交互语义抽离出来，让它先以 Prototype 的形式存在，再由 Adapter 在不同宿主中解释。

跨端只是这个模型的一个结果，而不是它的目的。

## 下一步去哪？

- 如果你想先判断这件事值不值得：前往 [Why Proto UI](/zh-cn/start-here/why-proto-ui/)
- 如果你想先理解它最基本的工作方式：前往 [它是怎么工作的？](/zh-cn/start-here/how-it-works/)
- 如果你已经想直接上手：前往 [快速开始](/zh-cn/start-here/quick-start/)
