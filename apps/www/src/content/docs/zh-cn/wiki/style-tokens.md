---
title: 'Style Token'
description: 'Proto UI 中用于表达反馈样式的 token 形式'
---

## 一句话解释

Proto UI 的 `Style Token` 是用来表达反馈样式的 token 形式。  
它的表达风格明显借鉴了 Tailwind。

## 为什么它看起来像 Tailwind？

因为它本来就参考了 Tailwind 的表达习惯。

这样做有几个直接好处：

- 作者更容易上手
- token 粒度更适合组合
- 很多现成的样式经验可以直接迁移过来

## 它和 Tailwind 是什么关系？

当前可以先这样理解：

- 它不是“重新发明另一套 CSS 工具类语言”
- 它更像是把一部分 Tailwind 式表达收敛成 Proto UI 可承接的反馈 token
- 在很多场景里，Tailwind utility 形态可以直接兼容 Proto UI 的 Style Token 用法

## 它主要服务哪一层？

它主要服务 `feedback.style` 这一层。  
也就是：当原型要把自己的状态结果反馈给用户时，如何用一组可组合 token 来表达视觉结果。

这也是为什么它在 `shadcn` 这类“带设计风格的原型”里会特别常见。
