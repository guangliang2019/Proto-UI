---
title: 白皮书概要
description: Proto UI 的简略版白皮书
---

## 为什么会有 Proto UI

- **背景问题**：跨框架、跨平台、跨交互媒介的 UI 技术长期割裂。
- **现状困境**：组件库需要重复造轮子，交互逻辑难以共享，体验一致性难以保障。
- **缺乏协议**：UI 的本质是交互，但目前没有一个抽象层面的“通用语言”。

## 我们要解决什么

- **目标**：找到人机交互的“最小公约数”，并将其表达为协议化的模型。
- **愿景**：一次定义交互原型（Prototype），即可在多种运行环境中复用，保持逻辑与体验一致。

- 这种抽象并非一个新框架，而是一份**跨平台可复用的交互描述协议**，不同运行时只需实现 Adapter 便能遵循。

<details>
<summary>举个例子</summary>
一个最简单的 Button，可能需要在 React、Vue、Flutter、WebComponent 中分别实现一遍，  
每次都要单独处理 focus/hover/disabled 逻辑，最终结果却只能部分对齐。
</details>

## 我们是怎么做的

- **核心哲学公式**：

```
Adapter(Prototype) => Component
```

- **Prototype**：交互元件的抽象模型，不依赖任何框架或平台。
- **Adapter**：翻译器，将 Prototype 转译为目标环境（React、Flutter、WebComponent…）的 **Component**。
- **结果**：跨平台的交互本质得到统一，而实现细节交给 Adapter 完成。

- 成本在于为某个平台编写一次 Adapter，但收益是此后所有 Proto UI 原型都能在该平台运行，无需重复造轮子。
<details>
<summary>收益示例</summary>
为 Web 编写一次 Adapter 后，所有 Proto UI 原型（Button、Input、Modal...）都能直接在浏览器运行，  
下次再适配 React/Flutter，只需重复 Adapter 层的工作，而不是重写全部组件。
</details>

## 下一步往哪里看

- 👉 想快速理解原型体系：参见 **原型总览**
- 👉 想知道如何在不同平台运行：参见 **适配器总览**
- 👉 想深入动机与设计取舍：阅读 **完整白皮书**

- 👉 想直接体验：参见 **安装与使用指南（进行中）**
