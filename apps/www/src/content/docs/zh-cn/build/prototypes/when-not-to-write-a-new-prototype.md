---
title: '为什么你通常不需要新写一个原型？'
description: 'Proto UI 原型作者最先需要建立的边界判断。'
---

Proto UI 提供了原型语法，不代表你应该频繁新写原型。  
恰恰相反，大多数时候更合理的判断是：

> 先不要写新的原型，先确认现有原型和 `asHook` 是否已经足够。

## 为什么这是第一步？

Proto UI 里的原型，不只是一个方便组织代码的壳。  
它代表的是一个独立的交互主体，以及一组会长期被维护、被适配、被验证的协议边界。

一旦你定义了新的原型，后面通常还会跟着这些成本：

- 需要明确它的交互边界
- 需要考虑它进入不同宿主后的承接方式
- 需要决定它是否值得进入某个原型库
- 需要逐步补上文档、契约和测试

如果这件事其实只是“把现有能力重新拼一下”，那直接新写原型通常是在过早发明抽象。

## 优先判断：你是不是其实想要 `asHook`

在当前 Proto UI 里，更常见的需求不是“发明新的交互对象”，而是：

- 想复用已有原型中的一部分逻辑
- 想取消某一段默认行为
- 想保留同样的交互语义，但在更高层做不同组织
- 想基于现有原型长出新的风格或新的库

这类需求更适合优先考虑 `asHook`。

以 [packages/prototypes/base/src/button/button.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/button/button.ts) 为例，同一套 `setupButton` 同时被导出为：

- `asButton`
- `base-button`

这说明 `asHook` 在 Proto UI 里不是“附加辅助函数”，而是原型能力的一种可重组入口。

## 什么情况下写新原型是在造轮子？

下面这些情况，通常都还没有到“必须新写原型”的程度：

- 你只是想换一套样式
- 你只是想删掉或替换现有逻辑中的某一段
- 你只是想在现有原型之上组合出一个更高层的 API
- 你只是想把已有交互迁移进另一套设计语言

这类需求更像是在：

- 复用 `asHook`
- 在库层重新组织 anatomy
- 用 `feedback` 和 `rule` 补风格表达

而不是在发明新的交互边界。

`shadcn-button` 就是一个很直接的例子。  
它并没有重新发明 Button 的交互语义，而是在 [packages/prototypes/shadcn/src/button/index.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/shadcn/src/button/index.ts) 中先调用 `asButton()`，再叠加：

- `variant` / `size` 这类库级 props
- 样式 token
- 基于状态与 meta 的 rule

这是一种“在 base 上长风格”的写法，而不是重新定义一个新的底层 button 交互原型。

## 什么情况下才值得认真考虑新原型？

通常至少要满足下面一类情况：

- 你引入了新的交互媒介，现有原型没有可复用的边界
- 你在做一个确实不同于现有原型的新组件类型
- 你发现现有 `asHook` 组合后仍然无法表达该组件的核心交互责任
- 你遇到的不是“风格差异”，而是“交互主体已经不同”

这时你真正需要问的不是“能不能写”，而是：

> 这个对象是否已经构成一个新的 `Prototype Boundary`？

这正是白皮书 [原型边界](/zh-cn/whitepaper/prototype-boundary/) 那篇要你先建立的判断。

## 一条更实用的判断线

在决定是否新写原型之前，先依次问自己：

1. 我是否只是想换风格？
2. 我是否只是想改写现有交互的一部分？
3. 现有 `asHook` 是否已经可以组合出我要的行为？
4. 我面对的是否真的是一个新的交互主体，而不是旧主体的另一种实现？

如果前 3 个问题里有一个答案是“是”，那大概率还不该新写原型。

## 下一步

- 如果你已经确认自己面对的是一个新的基础交互对象，继续读 [编写一个定制的单体原型](/zh-cn/build/prototypes/writing-a-custom-primitive-prototype/)
- 如果你面对的是复合组件，继续读 [编写一个定制的复合原型](/zh-cn/build/prototypes/writing-a-compound-prototype/)
- 如果你主要想做新的风格库，继续读 [基于 Base 长出一个带风格的原型库](/zh-cn/build/prototypes/building-a-styled-library-on-top-of-base/)
