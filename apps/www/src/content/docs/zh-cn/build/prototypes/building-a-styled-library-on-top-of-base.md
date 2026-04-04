---
title: '基于 Base 长出一个带风格的原型库'
description: '当你想做新的表现层，而不是新的交互边界时，该怎样复用 Base。'
---

有时候你想做的并不是新的交互，而是新的表现。

这时最重要的判断不是“要不要新写原型”，而是：

> 这是不是应该建立在现有 `base` 原型之上，而不是重新发明交互语义？

如果答案是“是”，那你更像是在写一个带风格的原型库，而不是在写新的基础原型。

## 为什么风格库不应该从零重写交互？

`base` 库的职责，是把更稳定、更可复用的交互语义先收敛下来。  
如果你做的是另一套视觉风格、另一套设计语言，通常真正变化的是：

- token
- variant
- size
- part 的呈现方式
- 某些 style rule

而不是：

- 组件与用户之间的基本 event
- 组件的核心 state
- 组件的基础 expose 能力

因此，更自然的路径通常是：

- 先复用 `base` 的 `asHook`
- 再叠加库级 props、feedback、rule 和 anatomy 组织

## `shadcn` 是怎样长在 `base` 之上的？

当前仓库里最直接的例子，就是 `@proto.ui/prototypes-shadcn`。

### `button`

在 [packages/prototypes/shadcn/src/button/index.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/shadcn/src/button/index.ts) 里，`shadcn-button` 不是从零处理 button 交互，而是先：

```ts
asButton();
```

然后再补：

- `variant`
- `size`
- `feedback.style`
- 基于 `hovered / pressed / focusVisible / invalid / expanded` 的 `rule`

这说明 `shadcn-button` 的主要工作不是重新定义交互，而是把一组稳定的视觉与库级 API 长在共享行为之上。

### `switch`

在 [packages/prototypes/shadcn/src/switch/root.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/shadcn/src/switch/root.ts) 里，`shadcn-switch-root` 同样是先：

```ts
asSwitchRoot();
```

然后围绕：

- `checked`
- `hovered`
- `pressed`
- `focusVisible`
- `disabled`

去补样式 token 和 dark-mode 相关 rule。

### `tabs`

在 [packages/prototypes/shadcn/src/tabs/root.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/shadcn/src/tabs/root.ts) 里，`shadcn-tabs-root` 更极端，它几乎就是：

```ts
asTabsRoot();
def.feedback.style.use(...)
```

这说明当 base 边界已经足够稳时，风格库的工作量可以主要集中在表现层。

## 写风格库时最该理解什么？

### 1. `asHook` 的返回值和语义来源

你不一定总是直接消费返回值，但你必须知道：

- 自己复用的是哪段交互骨架
- 它已经暴露了哪些 state / expose
- 你后续的 rule 是建立在哪些共享语义之上

### 2. `anatomy`

一旦是复合组件，风格库往往不只是给 root 上色。  
你需要知道哪些 part 存在、它们如何组合、哪些状态属于哪个 part。

### 3. `feedback style token`

在当前 Proto UI 里，这通常是风格层最直接的表达手段。  
像 `shadcn-button` 里的 `BUTTON_BASE_TOKENS`、`VARIANT_TOKENS`、`SIZE_TOKENS` 就是典型做法。

### 4. `rule`

`rule` 的价值不只是“根据状态加点样式”，而是把样式变化仍然建立在协议层状态之上，而不是重新回到宿主私有的 selector 语义里。

例如 `shadcn-button` 并没有把 `hover:*`、`focus-visible:*` 硬编码回宿主伪类，而是根据：

- `hovered`
- `focusVisible`
- `pressed`
- `meta('colorScheme')`

来表达风格变化。

这会让风格层仍然站在 Proto UI 的状态与规则模型里。

## 什么情况下说明你其实不是在写风格库？

如果你发现自己开始大量重新定义：

- 基础 event
- 核心 state 迁移逻辑
- 根本性的 context 关系
- 新的 prototype boundary

那你做的就不再只是“给 base 换皮”，而更像是在定义新的交互对象。

这时应当回退一步，重新判断自己到底是在：

- 长出一个 styled library
- 还是在发明新的 prototype

## 一个更务实的目标

带风格的原型库不一定追求所有宿主下都出现完全一样的 API。  
但它至少应该尽量做到：

- 共享同一套交互骨架
- 在主要宿主中保持足够高的还原度
- 不把宿主私有实现细节提前写死进 prototype

## 下一步

- 如果你想从现有库里挑几个最值得参考的实现，继续读 [参考实现应该怎么看](/zh-cn/build/prototypes/reference-patterns/)
- 如果你想在动手前先做一次自检，继续读 [原型作者检查清单](/zh-cn/build/prototypes/checklist/)
