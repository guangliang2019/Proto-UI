---
title: 'asHook'
description: 'Proto UI 中用于复用原型逻辑的能力单元'
---

## 一句话解释

`asHook` 是 Proto UI 里用于复用原型逻辑的能力单元。  
它本身不是独立交互主体，而是附着到一个 prototype 上生效。

## 为什么需要它？

Proto UI 里的 prototype 负责描述交互主体。  
但很多行为逻辑会在多个原型之间重复出现，例如：

- 可聚焦行为
- open state 管理
- button 语义
- toggle 语义

这类逻辑如果每个原型都重写一次，维护成本会很高。  
`asHook` 的作用，就是把这些可复用行为抽出来。

## 它和原型是什么关系？

- prototype 是交互主体
- `asHook` 是附着在主体上的可复用逻辑

你可以把它理解成：prototype 负责“我是谁”，`asHook` 负责“我借用了哪些行为能力”。

## 在现有原型库里怎么体现？

例如：

- `asButton()` 为 button 类原型提供通用的按钮交互语义
- `asToggle()` 在 button 基础上补充 checked 切换逻辑
- `asOpenState()` 把 open / defaultOpen / disabled 相关逻辑抽成可复用能力

像 `switch`、`dropdown`、`hover-card` 这类原型，很多地方都依赖这种复用。

随着复合原型继续变复杂，`asHook` 还可以建立在别的协议能力之上继续抽象。  
例如：

- `anatomy.order` 提供同 family part 的有序宿主视图
- `asCollection()`、`asCollectionItem()` 则建立在这层视图上，继续抽出最小 collection 交互核

这里的关键点是：

- `anatomy.order` 仍然属于结构能力的增强
- `asCollection` 才是基于这层能力组织出来的行为复用

也就是说，Proto UI 不是先引入一个新的顶级 `collection` 概念，  
而是先让 `asHook` 站在已有能力之上，逐步长出更高层语义。

## 常见误解

### asHook 不是“小一号的原型”

它不是一个隐藏的子组件，也不是“还没渲染的 prototype”。  
它是逻辑复用单元。

### asHook 不会代替原型边界判断

该拆成独立 prototype 的 part，仍然要按原型边界来拆。  
`asHook` 解决的是逻辑复用，不是结构组合。
