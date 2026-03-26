---
title: '编写原型'
desp: '原型作者指南'
description: '原型作者指南'
---

## 这篇文章是做什么的？

这篇文章写给准备为 Proto UI 生态新增原型的人。

它不试图替代完整规范，也不把你直接推进工程细节里。  
它要解决的是一个更实际的问题：

- 从当前 `packages/prototype-libs` 的已有实现来看，一份“合格的原型”到底要做到什么程度？
- 第一次写原型，应该先写到哪里停下，才既有价值，又不至于失控？
- 什么时候应该先做 `base`，什么时候才值得继续做 `shadcn` 这类参考实现？

如果你现在的感觉是“知道大概要写，但不知道该拆到多细、写到多完整”，那这篇就是给你的。

不过在继续往下读之前，最好先把两篇白皮书放在脑子里：

- [Whitepaper / 信息通路模型](/zh-cn/whitepaper/information-flow-model/)
- [Whitepaper / 原型边界](/zh-cn/whitepaper/prototype-boundary/)

这不是“扩展阅读”。  
它们其实就是这篇作者指南背后的判断依据。这里会直接引用那两篇文档的结论，但会把它们重新翻译成更接近贡献实践的语言。

如果你在阅读过程中频繁遇到术语卡住，也可以随时跳到 [Wiki / Wiki 导读](/zh-cn/wiki/) 查词。

## 开始之前，先知道原型代码大概长什么样

在进入“该不该写”“该怎么拆”之前，先有一个最小直觉会更好：  
Proto UI 里的原型，代码上通常就是一个 `definePrototype(...)`。

最常见的骨架大致像这样：

```ts
const button = definePrototype({
  name: 'base-button',
  setup(def) {
    asButton();
    return (r) => r.el('button', r.r.slot());
  },
});
```

这里可以先抓住四个点：

- `name` 是原型的稳定标识，现有原型库基本都使用 kebab-case，例如 `base-button`、`shadcn-switch-root`
- `setup(def)` 是原型定义阶段，`def` 可以先把它理解成“原型各种 API 的统一入口”
- 你会在 `setup(def)` 里定义 props、state、event、feedback、rule、context、expose，也会在这里复用 `as-*` 行为
- `setup` 的返回值是 render 函数；render 函数再返回 template 结构，例如 `r.el(...)`、`r.r.slot()`

如果你用过 React 或 Vue，可以先做一个很粗略的类比：

- `setup(def)` 有点像“声明这个组件能力和行为的地方”
- 返回出来的 render 函数有点像“这个原型最终渲染什么结构”

但这个类比只能帮助建立直觉，不能完全等同。  
Proto UI 的重点不是组件实例里的局部写法，而是如何把原型语义组织成可复用协议。

再往下一层看，当前原型库常见的目录组织也比较稳定：

- `index.ts` 负责导出原型条目、类型和 `as-*`
- `as-*.ts` 放可复用的行为语义
- `types.ts` 放 props、exposes、contract 等类型
- `shared.ts` 只在复合原型里出现，用来放 family、context、共享常量
- `root.ts`、`trigger.ts`、`content.ts` 这类文件放具体 part 的 prototype 定义
- `test/*.test.ts` 验证语义是否成立

这部分在这篇里只做定向说明。  
如果你想系统理解 `definePrototype`、`def` 句柄、render 结构和 `asHook` 机制，应该继续读 [Engineering / Prototype API](/zh-cn/engineering/prototype-api/)。

## 先看结论：现有原型库呈现出什么规律？

看完当前 `packages/prototype-libs/base` 和 `packages/prototype-libs/shadcn`，可以先得到三个稳定结论：

- `base` 原型主要负责语义、状态、事件、结构关系和反馈条件，不负责具体视觉风格。
- `shadcn` 这类参考原型主要复用 `base` 的语义能力，再额外补上样式、主题和视觉反馈。
- 一份成熟原型通常不是从“把页面画出来”开始，而是从“把这个组件最小但正确的交互协议写出来”开始。

换句话说，Proto UI 里的原型不是“某个组件长什么样”，而是“这个组件在交互上应该怎样工作，并且这种工作方式可以被不同宿主复用”。

## 现有原型大致分成哪几类？

从仓库里已经存在的实现来看，可以粗分为三层难度。

### 1. 单体语义原型

代表：`button`、`toggle`

这类原型的特点是：

- 边界单一
- 自己就能闭合主要语义
- 主要处理状态、事件、无障碍状态暴露
- 不需要复杂的上下文协作

例如：

- `button` 重点处理 `disabled`、`hovered`、`focused`、`focusVisible`、`pressed`，并在 `press.commit` 时暴露 `click`
- `toggle` 在 button 语义之上增加 `checked / defaultChecked` 与切换行为

这是最适合作为第一份原型贡献的类型。

### 2. 复合原型

代表：`switch`、`dropdown`、`tabs`、`hover-card`

这类原型的特点是：

- 一个组件由多个 part 组成
- part 之间需要共享上下文
- 需要 anatomy family 来约束结构关系
- 往往要处理 controlled / uncontrolled 两种模式
- 往往要把某个低层能力复用到更高层语义上

例如：

- `switch` 的 root 复用 `toggle` 语义，thumb 再通过 anatomy 读取 root 状态
- `tabs` 需要 root / list / trigger / content 协同，还要处理 focus group、方向、激活模式
- `dropdown` 和 `hover-card` 都会围绕 open state 展开，但各自的打开条件、关闭条件和内容协作方式不同

这类原型已经不是“写一个组件”，而是在定义一个小型协议族。

### 3. 主题化参考原型

代表：`shadcn/*`

这类原型的特点是：

- 不重新发明交互语义
- 直接复用 `@prototype-libs/base`
- 主要增加 `feedback.style`、`rule`、主题条件、视觉布局
- 用来说明“同一套语义可以如何落成一个具体设计系统风格”

这意味着：如果你的目标是为生态补一个新原型，通常应该先把 `base` 做对，再考虑要不要补一个参考风格实现。

## 先用白皮书的视角重述一次：Proto UI 到底在写什么？

如果按《信息通路模型》的说法，Proto UI 不是先从“组件 API 长什么样”开始，而是先看：

> 这个组件正在和谁交换信息。

白皮书把这种关系先分成三类：

- `User`
- `Maker`
- `Other Component`

于是才会自然导出 Proto UI 的几类核心能力：

- `event`：User -> Component
- `feedback`：Component -> User
- `props`：Maker -> Component
- `expose`：Component -> Maker
- `context`：Other Component <-> Component

这对原型作者很重要，因为它意味着：

- 你不是先列一个组件 API 清单，再勉强塞进 Proto UI
- 你应该先判断这个组件实际激活了哪些信息通路
- 然后再决定需要哪些 props、event、feedback、expose、context

换句话说，写原型的第一步不是“我想做一个 X 组件”，而是：

> 这个交互主体到底在和谁交换什么信息？

## 写原型前，先判断这件事值不值得做

在 Proto UI 里，不是每个组件名词都值得成为一个独立原型。

建议先问自己四个问题：

1. 这是不是一个稳定的交互边界，而不只是某个页面里的视觉组合？
2. 它的行为是否足够明确，能提炼成可复用语义？
3. 它是不是应该建立在现有原型之上，而不是平地起一套新的状态机？
4. 这份能力进入公共生态后，别人是否真的能复用，而不只是你当前项目刚好需要？

如果这四个问题里有两个以上答不上来，通常不建议直接开新原型。  
先组合现有原型，或者先做私有实验，会更稳。

再进一步说，可以直接用《信息通路模型》来过一遍：

- 它真的形成了稳定的 `User` 通路吗？
- 它对 `Maker` 来说真的需要独立的配置或消费面吗？
- 它是否会稳定地和其他组件发生协作关系？

如果这些问题本身就还不稳定，那么你多半还没有遇到一个应该沉淀为公共原型的对象，而只是遇到了一段暂时的页面结构。

## 一个比较合适的渐进路线

结合当前仓库的做法，比较合理的路线不是“一口气做完整组件库”，而是下面这条。

### 第一步：先写行为核，不先写皮肤

第一次实现时，优先问：

- 它对 `User` 开放了哪些 `event`，又必须给出哪些 `feedback`？
- 它对 `Maker` 需要哪些 `props`，又必须 `expose` 哪些能力？
- 它和其他组件之间是否需要 `context` 协作？
- 哪些 `state` 是为了支撑这些通路而存在的？

这一步最像当前的 `as-button`、`as-toggle`、`as-open-state`。

也就是说，先把“会发生什么”写清楚，再决定“渲染成什么”。

### 第二步：先做 `as-*`，再做 `definePrototype`

当前原型库里，一个很明显的规律是：

- 可复用语义逻辑放在 `as-*`
- 最终的原型条目放在 `definePrototype`

这样做有两个直接好处：

- 同一套语义可以被多个原型复用
- `base` 和 `shadcn` 可以共享同一批行为能力

如果你一开始把状态、事件、样式、DOM 结构全部揉进一个 prototype 文件里，后面几乎一定会拆回来。

### 第三步：先做最小 root，再决定要不要拆 part

不是所有组件一上来都要拆成 `root / trigger / content / item`。

这里最好直接按《原型边界》的判断来：

- 如果一个子结构激活了除 `feedback` 之外的任一信息通路，它就应该被拆成独立原型
- 如果一个子结构只承担 `feedback`，它可以拆，也可以先留在父原型内部
- 如果一个子结构没有激活任何信息通路，它就不应该被拆出来

这比“看起来像不像一个子组件”更准确。  
Proto UI 关心的不是视觉切块，而是这个子结构是否已经承担了独立的交互责任。

例如：

- `button` 不需要复合结构
- `switch` 虽然简单，但因为 thumb 是稳定 part，所以拆了 `root / thumb`
- `tabs` 天然就需要多 part，不能假装成单体组件

不要为了“看起来完整”而过早拆分。  
过早拆 part，通常意味着你在维护还没被证明有必要的公共边界。

### 第四步：只在确实需要时引入 context / anatomy / overlay / focus group

当前仓库给出的经验很明确：

- 有 part 协作时，用 anatomy family 明确角色和关系
- 有共享状态时，用 context 同步语义
- 有浮层语义时，复用 overlay 相关能力
- 有 roving focus 时，引入 focus group

不要把这些能力当成“高级实现模板”，而应该把它们看成“只有出现某类问题时才引入的工具”。

例如：

- `tabs` 需要 `context + anatomy + focus group`
- `hover-card` 需要 `context + anatomy + overlay`
- `switch` 只需要 anatomy，不需要自己再造一套复杂上下文

### 第五步：等 `base` 稳住后，再决定是否补参考风格

如果一个原型的语义还没稳定，就不要急着写 `shadcn` 版。

因为参考风格实现会放大两个问题：

- 你会过早把注意力转到 class 和视觉细节上
- 一旦 `base` 语义变动，参考实现也要跟着返工

更稳的顺序是：

1. 先把 `base` 的 props / state / event / expose / 边界拆分做稳
2. 再确认它值得作为生态能力长期存在
3. 最后再补 `shadcn` 这类参考实现

## 第一次贡献，写到什么程度算合适？

一个比较现实的标准是：

### 合格的第一份原型贡献

- 有清晰的边界判断
- 有最小可工作的 `base` 实现
- props、state、event、expose 是自洽的
- 至少覆盖一条明确的核心交互路径
- 有最小测试证明这个语义成立

### 不要求第一步就做到的事

- 不要求一次补完整个设计系统风格
- 不要求一开始就覆盖所有宿主差异
- 不要求把所有相邻组件一并做完
- 不要求先把所有高级场景全部吃下

对第一次贡献来说，最重要的是边界清楚、语义站得住、测试能证明，而不是“表面上看起来已经很全”。

## 一份原型通常至少要交付什么？

参考当前仓库，一个相对稳妥的交付清单通常包括：

- 对外导出的 prototype 条目
- 对应的 `as-*` 行为实现
- 明确的 `types.ts`
- 必要时的 `shared.ts`，用于 family、context、关系约束
- 最小测试
- 如果文档或 demo 已经依赖它，再补最小展示入口

如果是复合原型，再额外检查：

- part 的角色是否稳定
- root 和 part 的关系是否真的长期成立
- 哪些信息通路属于 root，哪些已经是 part 自己的责任
- state 应该放在 root、context，还是由 part 自己推导
- controlled / uncontrolled 的行为是否已经想清楚

## 从现有实现里，可以直接总结出哪些设计原则？

### 1. 能复用就不要重写语义

`switch` 直接站在 `toggle` 上，`dropdown` 和 `hover-card` 直接复用 open state 思路。  
这说明新增原型时，应该优先判断自己是在“新建协议”，还是在“组合已有协议”。

如果只是后者，就不要重新发明一套 props 和状态命名。

### 2. 先定义 expose，再倒推内部状态

现有实现里，很多状态不是为了内部方便而存在，而是为了形成稳定协议面。

例如：

- `button` 会 expose `disabled / hovered / focused / focusVisible / pressed`
- `tabs` root expose `value`，trigger expose `selected`，content expose `current`

这说明原型作者要先想清楚“外界需要观察什么”，再决定“内部怎么实现”。

换成《信息通路模型》的语言，其实就是：

- 先判断你要不要建立一条 `Component -> Maker` 的信息通路
- 再决定为了支撑这条通路，内部需要沉淀哪些 state

### 3. controlled / uncontrolled 是原型边界的一部分

`toggle`、`tabs`、`dropdown`、`hover-card` 都体现了同一个事实：

- 只要一个原型存在外部驱动值，就应该认真处理 controlled / uncontrolled

这不是“以后再补”的细节。  
如果边界里本来就有外部控制能力，第一版就应该想清楚。

### 4. 样式反馈也是语义表达的一部分，但它不等于视觉皮肤

`base` 里也会出现像 `hidden` 这样的反馈规则。  
这不是在做设计系统，而是在表达语义结果。

这点和《原型边界》里的判断也是一致的：  
`feedback` 的确属于信息通路，但它比 `props / event / expose / context` 更接近呈现层，所以 `feedback-only` 的子结构可以保留一定弹性，不必一律强拆。

所以要区分两类反馈：

- 语义必需的反馈：可以进入 `base`
- 风格化、主题化、品牌化的反馈：更适合放到 `shadcn` 这类参考实现

### 5. 测试不要只测“能渲染”，要测“语义有没有成立”

现有测试基本都围绕这些问题：

- 状态有没有同步
- part 之间有没有协作成功
- controlled / uncontrolled 是否符合预期
- disabled 是否抑制了不该发生的行为
- 暴露给外界的能力是否真实可用

这也是原型测试最应该覆盖的部分。

## 什么时候该拆成多个原型？

如果想让判断更接近白皮书原文，可以直接这样理解：

- 子结构是否开始独立接收 `event`
- 子结构是否需要独立的 `props`
- 子结构是否开始向外 `expose` 能力
- 子结构是否开始订阅或分发 `context`

如果其中任意一项成立，它通常就不该再只是父原型内部的一段结构。

只有两类情况可以不拆：

- 它只承担 `feedback`
- 它根本没有激活任何信息通路

如果只是为了“结构看起来更像某个现成组件库”，通常还不值得拆。

## 常见误区

### 一开始就照着视觉组件库逐项复刻

Proto UI 的原型不是按组件库目录机械对齐。  
应该先看交互协议是否成立，再看名字是不是常见。

### 把样式实现误当成原型实现

如果没有 props、state、event、expose、协作关系这些语义层内容，只有 className，通常还不算 Proto UI 的原型贡献。

### 把私有页面模式直接抽成公共原型

公共原型需要稳定边界。  
页面里偶然出现的一组组合，不一定值得沉淀进生态。

### 第一次就试图做“完整大组件”

对新贡献者来说，更好的路线通常是：

- 先补一个单体原型
- 或先补一个复合原型里最确定的那部分语义
- 或先为现有原型补测试与文档

而不是第一步就把一个复杂组件族全部铺开。

## 如果你现在准备开始，推荐的落点是什么？

对于第一次动手的人，比较推荐的顺序是：

1. 先模仿 `button` / `toggle` 这种单体行为原型
2. 再尝试 `switch` 这种“小型复合原型”
3. 然后再进入 `tabs`、`dropdown`、`hover-card` 这种需要上下文协作的原型
4. 最后再考虑补 `shadcn` 这类参考实现

这条路线的好处是，你会先掌握 Proto UI 里最核心的东西：

- 信息通路是怎么落成具体能力的
- props 怎么定义
- 状态怎么流转
- 事件怎么进入
- expose 怎样形成协议面
- 什么时候该复用已有原型
- 什么时候一个子结构已经必须拆成独立原型

而不是一开始就被复杂结构和样式细节拖住。

## 下一步怎么读？

- 回看 [Whitepaper / 原型边界](/zh-cn/whitepaper/prototype-boundary/)
- 回看 [Whitepaper / 信息通路模型](/zh-cn/whitepaper/information-flow-model/)
- 遇到概念卡点时：查阅 [Wiki / Wiki 导读](/zh-cn/wiki/)
- 查阅 [Specifications / 规范导读](/zh-cn/specs/introduction/)
- 进入 [Engineering / Prototype API](/zh-cn/engineering/prototype-api/)
- 如果准备把能力带入生态：前往 [生态 / 契约与测试](/zh-cn/ecosystem/contracts/)
