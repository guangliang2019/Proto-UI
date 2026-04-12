---
title: '参考实现应该怎么看'
description: '当现有原型库本身就是最好的文档时，应该怎么看它们。'
---

对 Proto UI 原型作者来说，现有原型库往往比单篇文档更有帮助。  
但“去看代码”本身并不是方法。你还需要知道该看什么。

## 先看哪一层？

一个比较稳的顺序通常是：

1. 先看 `base`
2. 再看某个风格库如何复用它

这样你更容易分清：

- 哪些是共享交互骨架
- 哪些是库层才叠加上去的东西

## 想看单体原型，先看什么？

优先看：

- [packages/prototypes/base/src/button/button.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/button/button.ts)
- [packages/prototypes/base/src/toggle/toggle.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/toggle/toggle.ts)

看这些文件时，重点不是逐行抄写 API，而是看：

- `setup` 里最先声明了什么
- `props / state / event / expose` 是如何组织的
- 是否同时导出了 `asHook`

## 想看复合原型，先看什么？

优先看 `tabs` 和 `hover-card`：

- [packages/prototypes/base/src/tabs/shared.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/tabs/shared.ts)
- [packages/prototypes/base/src/tabs/root.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/tabs/root.ts)
- [packages/prototypes/base/src/tabs/trigger.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/tabs/trigger.ts)
- [packages/prototypes/base/src/tabs/content.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/tabs/content.ts)
- [packages/prototypes/base/src/hover-card/root.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/base/src/hover-card/root.ts)

重点看：

- family 是怎么定义的
- context 是怎么提供和订阅的
- 各 part 的职责是否清楚

## 想看“风格如何长出来”，先看什么？

优先看：

- [packages/prototypes/shadcn/src/button/index.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/shadcn/src/button/index.ts)
- [packages/prototypes/shadcn/src/switch/root.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/shadcn/src/switch/root.ts)
- [packages/prototypes/shadcn/src/tabs/root.ts](/Users/yangguangliang/Desktop/projects/Proto-UI/packages/prototypes/shadcn/src/tabs/root.ts)

重点看：

- 是否先复用了 `base` 的 `asHook`
- 库级 props 是如何叠加的
- style token 和 rule 是如何组织的
- 哪些地方保留了 Proto UI 的共享语义，而没有退回宿主私有写法

## 看代码时最容易看错什么？

### 1. 只看文件数量，不看边界

文件多不代表拆分合理，文件少也不代表边界清楚。  
关键是每个文件是否对应了稳定的交互责任。

### 2. 只看样式，不看它依赖的状态来源

风格库里的 rule 之所以成立，往往因为它站在共享状态上。  
不要只看 `tw(...)`，要先看这些 rule 依赖了哪些 `state` 和 `meta`。

### 3. 把“当前实现这么写”误当成“Proto UI 要求必须这么写”

现有原型库是重要参考，但不是唯一合法写法。  
你更应该学习的是：

- 它为什么这样切边界
- 为什么这里复用了 `asHook`
- 为什么这里用 `context`，而不是别的方式

## 最后一个建议

如果你在读某个实现时，发现自己开始纠结某个局部 API 细节，先退回去问：

> 这个文件在整个原型里承担什么角色？

Proto UI 的原型实现，比起单个 API 名字，更值得优先理解的是角色分工与边界判断。
