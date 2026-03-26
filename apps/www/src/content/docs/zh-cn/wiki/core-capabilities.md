---
title: '核心能力'
description: '原型作者最常接触的几类能力及其关系'
---

## 一句话解释

对原型作者来说，最常接触的能力主要包括：

- `props`
- `event`
- `feedback`
- `expose`
- `context`
- `state`
- `lifecycle`

## 这些能力为什么会一起出现？

因为它们几乎就是 Proto UI 描述组件的主语言。

其中前五项和白皮书里的《信息通路模型》直接对应：

- `event`：User -> Component
- `feedback`：Component -> User
- `props`：Maker -> Component
- `expose`：Component -> Maker
- `context`：Other Component <-> Component

而 `state`、`lifecycle` 则更偏内部执行维度。

## 原型作者应该怎么理解它们？

一个实用方式是：

- 先看你的原型在和谁交换信息
- 再看需要激活哪些能力
- 最后再决定内部 state 和 lifecycle 怎么配合这些能力

这比先罗列 API 清单再硬拼原型，更接近 Proto UI 的思路。
