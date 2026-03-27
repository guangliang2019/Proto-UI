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
