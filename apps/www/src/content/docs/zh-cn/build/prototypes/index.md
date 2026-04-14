---
title: '原型专题'
description: '面向 Proto UI 原型作者的专题入口。'
---

这一组文档面向真正准备编写、扩展或评审 Proto UI 原型的人。

它不是快速开始，也不是完整 API 手册。  
它更像一套工作文档，用来回答下面这些更具体的问题：

- 我到底需不需要新写一个原型？
- 如果要写，一个单体原型的最小结构是什么？
- 如果要做复合组件，原型边界应当怎么拆？
- 如果我要的不是新交互，而是新的风格库，应该复用哪些东西？

## 推荐阅读顺序

如果你还没有明确自己是否真的需要新原型：

1. 先读 [为什么你通常不需要新写一个原型？](/zh-cn/build/prototypes/when-not-to-write-a-new-prototype/)
2. 再读 [编写一个定制的单体原型](/zh-cn/build/prototypes/writing-a-custom-primitive-prototype/)
3. 然后视需要进入 [编写一个定制的复合原型](/zh-cn/build/prototypes/writing-a-compound-prototype/)
4. 如果你主要想做新的组件风格或 UI 库，再读 [基于 Base 长出一个带风格的原型库](/zh-cn/build/prototypes/building-a-styled-library-on-top-of-base/)

## 这一组文档主要不做什么？

- 不试图在一处讲完全部 `Prototype API`
- 不替代白皮书中的边界论证
- 不把内部 runtime 结构当作原型作者的前置知识

## 你应该先带着什么心态来读？

Proto UI 的原型语法并不是为了让所有人都频繁发明新原型。  
更常见、也更推荐的路径是：

- 先使用现有原型库
- 如果只是想重组一部分现有交互，优先考虑 `asHook`
- 只有当现有原型和现有 `asHook` 都无法表达你的交互边界时，才认真考虑定义新的原型

这也是为什么这一专题的第一篇，不是“怎么写”，而是“为什么你通常不需要写”。
