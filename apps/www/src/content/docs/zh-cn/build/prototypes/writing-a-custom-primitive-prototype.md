---
title: '编写一个定制的单体原型'
description: '从最小结构出发理解 Proto UI 单体原型的写法。'
---

这一篇只讨论最小的、单体的原型。  
它不讨论复合组件的拆分，也不试图讲完所有能力。

目标只有一个：

> 让你知道一个 Proto UI 原型最小是怎样长出来的。

## 单体原型到底在描述什么？

Proto UI 的单体原型通常对应一个相对完整、边界明确的交互主体。  
例如 `button`、`toggle`，这类对象通常不需要先拆成多个 part，才能成立。

从白皮书角度讲，它已经是一个能独立承担信息通路责任的对象。  
从代码角度讲，它通常会体现为：

- 一个 `setup(def)` 过程
- 一组最小 props
- 几个核心 state
- 必要的 event / expose
- 如果需要复用，再导出一个 `asHook`

## 一个最小例子：`base-button`

[packages/prototypes/base/src/button/button.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/button/button.ts) 是当前仓库里最适合作为起点的例子之一。

它的结构很典型：

1. 先定义 `setupButton(def)`
2. 在里面声明 `props`
3. 建立内部状态与 exposed state
4. 绑定事件
5. 最后同时导出 `asButton` 和 `base-button`

这背后的思路是：

- 行为先被组织成一段可复用的 setup
- `asHook` 与 `prototype` 共用同一份核心交互逻辑

## `def` 和 `run` 的分割到底是什么意思？

Proto UI 里一个很重要的分界是：

- `def` 负责定义结构、能力和规则
- `run` 负责在真实执行中读取当前值、更新上下文、发出效果

简单理解：

- 在 `def` 阶段，你是在说“这个原型允许什么、会有哪些能力、要监听什么”
- 在 `run` 阶段，你才真正面对某一次实例化后的当前数据

例如在 `base-button` 里：

- `def.props.define()` 是定义 props 契约
- `def.state.fromInteraction()` 是声明要使用哪些交互状态
- `def.event.on('press.commit', (run) => { ... })` 则是在实际事件触发时通过 `run` 处理当前实例

如果你把这两层混在一起，通常会很快丢掉 Proto UI 对执行期的基本秩序。

## 单体原型最小会碰到哪些能力？

对一个基础单体原型来说，最常见的是下面这几类：

- `props` 用来承接 Maker 侧的输入，例如 `disabled`
- `state` 用来保存原型内部需要稳定表达的状态
- `event` 用来承接用户输入或宿主输入
- `expose` 用来把状态或方法交还给外部

`base-button` 就几乎把这一组最小能力都走了一遍：

- 通过 `def.props.define()` 声明 `disabled`
- 通过 `def.state.fromInteraction()` 建立 `hovered`、`pressed`、`focused`
- 通过 `def.event.on()` 监听 `pointer.enter`、`press.commit` 等事件
- 通过 `def.expose.state()` 和 `def.expose.method()` 向外暴露能力

## `asHook` 在这里是什么角色？

在 Proto UI 里，`asHook` 不是一个次要配件，而是“把一段原型能力拿出来重组”的标准入口。

在 `base-button` 里，`asButton` 与 `base-button` 共用同一份 `setupButton`。  
这意味着：

- 原型作者可以直接消费 `base-button`
- 更高层的原型作者也可以只复用 `button` 的交互骨架

因此，当你在写一个新的单体原型时，最好尽早判断：

- 这段逻辑以后是否值得被别的原型复用？

如果答案是“很可能会”，那通常值得像 `base-button` 一样，把共享的 setup 单独整理出来，再同时导出 `asHook` 和 `prototype`。

## 单体原型最常见的误区

### 1. 一开始就试图把所有能力都塞进去

Proto UI 的原型不是“能力越多越完整”。  
单体原型更适合先围绕一个稳定的交互核心收敛最小能力。

### 2. 把风格表达和交互边界混在一起

如果你还在定义交互主体本身，先不要急着把 design system 的变体、视觉规则也一起塞进来。  
这类东西更适合在库层长出来。

### 3. 只导出 prototype，不导出 `asHook`

如果你写出来的是一个明显可能被复用的基础能力，却没有提供 `asHook`，后面别人更容易被逼着重新写一遍。

## 什么样的单体原型比较像“写对了”？

你可以先用很现实的标准判断：

- 它描述的是一个独立交互主体，而不是一段局部拼图
- 它只承诺自己真正应该承诺的能力
- 它能被更高层原型复用，而不是只能作为最终产物存在
- 它暂时不依赖某个特定 design system 才成立

## 下一步

- 如果你已经发现自己写的不是单体对象，而是一个复合组件系统，继续读 [编写一个定制的复合原型](/zh-cn/build/prototypes/writing-a-compound-prototype/)
- 如果你其实想做的是风格库，继续读 [基于 Base 长出一个带风格的原型库](/zh-cn/build/prototypes/building-a-styled-library-on-top-of-base/)
