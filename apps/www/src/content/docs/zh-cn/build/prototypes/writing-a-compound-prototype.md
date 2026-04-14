---
title: '编写一个定制的复合原型'
description: '如何按 Proto UI 的原型边界拆分复合组件。'
---

复合原型不是“单体原型写大一点”。  
它真正困难的地方，不在语法量，而在边界判断。

白皮书 [原型边界](/zh-cn/whitepaper/prototype-boundary/) 里已经给出了一个核心原则：

> 看一个子结构是否开始承担独立的信息通路责任。

这一篇讨论的就是：  
当你已经确认自己面对的是复合组件时，代码层面该怎样把这条边界落下来。

## 什么时候该把它当成复合原型？

比较典型的信号包括：

- 组件天然由多个 part 组成
- 不同 part 之间需要共享状态或上下文
- 至少有一部分子结构已经不是“纯内部 DOM”，而是独立承担交互责任

`tabs` 是当前仓库里最典型的例子。  
在 `base` 里它被拆成：

- `root`
- `list`
- `trigger`
- `content`

对应文件见：

- [packages/prototypes/base/src/tabs/root.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/tabs/root.ts)
- [packages/prototypes/base/src/tabs/list.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/tabs/list.ts)
- [packages/prototypes/base/src/tabs/trigger.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/tabs/trigger.ts)
- [packages/prototypes/base/src/tabs/content.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/tabs/content.ts)

## 复合原型不是先拆文件，而是先拆交互主体

很多框架里，复合组件的第一反应是：

- 先按 DOM 区域拆
- 先按视觉区域拆
- 先按开发方便拆

Proto UI 更关心的是：  
谁已经形成了独立交互责任。

在 `tabs` 里：

- `trigger` 会接收输入并影响 value
- `content` 会根据当前选中值切换自己的可见状态
- `list` 会承担焦点移动与 focus group
- `root` 则维护共享的上下文与整体状态

这就不是“视觉切块”能解释的了，而是多个交互主体在共同组成一个 family。

## `anatomy` 的作用是什么？

在 Proto UI 里，复合原型不是一堆松散 part 的约定俗成，而是显式的 anatomy family。

在 [packages/prototypes/base/src/tabs/shared.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/tabs/shared.ts) 里，`TABS_FAMILY` 定义了：

- 有哪些 role
- 每个 role 的 cardinality
- 哪些 role 之间允许存在 `contains` 关系

这意味着 anatomy 在 Proto UI 里不只是“给 part 起名字”，而是：

- 定义 family 的结构约束
- 给 part 之间的协作提供稳定身份
- 让原型作者和 adapter 作者都能知道“谁是谁”

如果你在写复合原型，通常应该尽早判断：

- 这个 family 有哪些 part
- 哪些 part 是必须存在的
- 哪些 part 是可选的
- part 之间是否有明确的结构关系

## `context` 在复合原型里通常承担什么？

`context` 在复合原型里最常见的职责，不是“偷懒传值”，而是承接 family 内部共享的交互语义。

在 `tabs/root.ts` 里，`root` 通过 `def.context.provide(TABS_CONTEXT, ...)` 提供：

- 当前值
- orientation
- activationMode
- 是否 controlled

而 `trigger` 与 `content` 再各自订阅它。  
这是一种非常典型的复合原型写法：

- `root` 维护共享语义
- part 订阅上下文并据此工作

如果你发现不同 part 之间需要共享“当前属于谁”的状态、模式或协作环境，通常就该认真考虑 `context` 了。

## 复合原型里常见的拆分模式

### Root

通常承担：

- shared state
- 共享 props
- `context.provide`
- 对整个 family 的 expose

### Part

通常承担：

- 自己那一段局部职责
- 对共享上下文的订阅
- 必要时对 anatomy family 的 claim

### Shared

通常放：

- family 定义
- context key
- 共享类型
- 共享工具常量

`tabs/shared.ts` 正是这种角色。

## 什么时候说明你拆错了？

### 1. 某个 part 没有独立交互责任，却被强行拆成原型

这通常会得到一堆“只是多了名字”的 part，而不是更清晰的原型边界。

### 2. 所有状态都还塞在 root，part 只是视觉壳

如果 `trigger`、`content` 这些 part 已经承担独立 event 或 state 责任，却还被写成纯内部结构，边界通常就偏大了。

### 3. `context` 里装了过多宿主细节或风格细节

`context` 更适合放共享交互语义，不适合变成一个随手塞所有信息的大袋子。

## 一个值得注意的现实

复合原型最大的工作量，常常不是“把语法写出来”，而是先把边界想对。  
如果边界判断没有成立，后面的 `anatomy`、`context` 和 part 组织通常都会越来越乱。

所以在 Proto UI 里，复合原型首先是一项建模工作，其次才是编码工作。

## 下一步

- 如果你已经有了稳定的 base 交互，只是想长出不同设计风格，继续读 [基于 Base 长出一个带风格的原型库](/zh-cn/build/prototypes/building-a-styled-library-on-top-of-base/)
- 如果你想先用现有代码建立直觉，继续读 [参考实现应该怎么看](/zh-cn/build/prototypes/reference-patterns/)
