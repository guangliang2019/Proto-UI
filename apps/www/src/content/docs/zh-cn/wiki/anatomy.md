---
title: 'Anatomy'
description: 'Proto UI 中复合原型家族的角色和结构关系'
---

## 一句话解释

`anatomy` 用来描述同一复合原型家族内部的角色与结构关系。

它解决的问题不是“页面上有几个节点”，而是：

> 在同一个原型族里，哪些 part 分别承担什么角色，它们之间如何建立稳定关系。

## 它通常什么时候出现？

当一个原型不再是单体，而是由多个稳定 part 组成时，`anatomy` 就会出现。

典型例子包括：

- `tabs`：root / list / trigger / content
- `hover-card`：root / trigger / content
- `dropdown`：root / trigger / content / item

## 它和《原型边界》有什么关系？

两者关系很直接：

- 《原型边界》回答“什么时候该拆成独立原型”
- `anatomy` 回答“拆出来之后，这些原型如何被识别为同一家族，并建立角色关系”

也就是说，先有边界判断，后有 anatomy 关系。

## 它不等于 DOM 结构

`anatomy` 关注的是交互角色，不只是标签层级。

例如：

- 谁是 root
- 谁是 trigger
- 谁是 content
- 哪些角色允许包含哪些角色

这类关系在宿主层可能最终表现为 DOM 层级，但概念上它先属于原型协议，而不是 HTML 结构。

## `anatomy.order` 是什么？

在复合原型里，光知道“谁属于同一个 family、谁扮演 item / trigger / content”还不够。  
很多交互还会继续追问：

- 当前 item 在同类里排第几个
- 前一个 / 后一个同类 part 是谁
- 当前顺序是否发生了变化

这时 Proto UI 不会直接把一个新的顶级 `collection` 概念塞进运行时。  
更克制的做法是：让 `anatomy` 提供一个**有序宿主视图增强**，也就是 `anatomy.order`。

它回答的不是新的结构事实，而是：

> 在当前宿主里，这组 anatomy part 如果按“真实元素顺序”观察，会得到怎样的有序视图？

## `anatomy.order` 提供什么能力？

当前 `anatomy.order` 主要提供两类能力：

- 有序查询：`parts()`、`partsOf()`、`indexOfSelf()`、`prevOfSelf()`、`nextOfSelf()`
- 顺序变化信号：`version()`，以及内部可订阅的顺序变化通知

这意味着原型作者可以在不引入完整 collection 语义的前提下，先手工实现很多“列表式交互分支”，例如：

- 当前 trigger 在 tabs 里排第几个
- 当前 item 的上一项 / 下一项是谁
- 某个 root 是否需要根据成员顺序变化重新同步快照

## 它仍然不是 collection

这里要特别区分：

- `anatomy.order` 是 anatomy 的有序宿主视图
- `collection` 是建立在这层视图之上的更高层交互语义

`anatomy.order` 不负责这些事情：

- item 的业务元数据注册
- selection 模型
- roving focus 策略
- `PageUp` / `PageDown` 之类键盘策略

这些能力如果需要，应该继续由上层 `asHook` 来组织。其中 `asCollection()` 只负责有序结构语义本身，不负责 roving focus、active item 或 selection。

## 它和真实元素顺序的关系是什么？

在 Web 宿主里，`anatomy.order` 会优先按真实 DOM 元素顺序理解 part。  
如果宿主没有可比较的真实顺序能力，它可以退回到宿主可提供的稳定顺序。

因此，`anatomy.order` 解决的是：

- “当前宿主里，这组 part 被怎样有序地看见”

而不是：

- “Proto UI 协议层永久定义了某个唯一、绝对的元素顺序”

这也是为什么它被放在 `anatomy` 的增强层，而不是被提升成新的协议主语义。
