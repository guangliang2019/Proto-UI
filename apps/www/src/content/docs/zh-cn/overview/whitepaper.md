---
title: 白皮书概要
description: 为什么？是什么？怎么做？为什么值得做？
---

## 为什么会有 Proto UI

React16、Vue3、Flutter、WebComponent...新的 UI 框架和规范不断出现，让 UI 生态保持了旺盛的活力。然而在这种多样化背后，开发者付出的代价是：相似的组件需要在不同环境中一遍又一遍地重写。

开发者不得不为每个环境单独实现同样的 Button、Input、Dialog，结果自然是逻辑与体验常常无法真正保持一致。

**难不成每当有新框架出现，我们都得从头再写一次 Button？**

因此 Proto UI 想做的并不是新的框架，而是一份 **中间层协议**。

简单来说，Proto UI 更像是一个“组件生成器”：先把交互逻辑抽象为通用原型（Prototype），  
再通过 Adapter 或 Compiler 转换成你所熟悉的技术栈（React、Vue、Flutter…）的组件。

## 有什么收益

**从个人到团队，从社区到企业，每一层都有不同的收获。**

- **开发者**
  - 避免重复劳动：一次编写 Prototype，多个平台都能使用。
  - 熟悉的体验：你依然在 React、Vue、Flutter、WebComponent 等环境中工作，只是组件换成了由 Proto UI 生成的版本。

- **设计语言 & 组件库作者**
  - 例如 **Shadcn Prototypes** 搭配对应 Adapter，就能让 Shadcn 出现在 Flutter、Qt、Vue2、微信小程序等官方和社区鲜少支持的环境里。
  - 原有的设计语言不必重写，只需实现一次 Adapter，就能扩展到更多平台。

- **企业 & 团队**
  - 设计团队可以维护一份**高度定制的原型库**，统一交互和视觉规范。
  - 通过 CI/CD 集成 Compiler，自动生成各技术栈的组件库，减少重复开发成本。

---

## 下一步往哪里看

- 👉 想直接体验：参见 [安装与使用指南（进行中）](/zh-cn/usage/installation/)
- 👉 想快速理解原型体系：参见 [原型总览](/zh-cn/overview/prototypes/)
- 👉 想知道如何在不同平台运行：参见 [适配器总览](/zh-cn/overview/adapters/)
- 👉 想深入动机与设计取舍：阅读 [完整白皮书](/zh-cn/reference/whitepaper/philosophy/)
