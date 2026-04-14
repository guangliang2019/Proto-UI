---
title: '构建'
desp: '如何阅读 Proto UI 面向构建者的文档章节'
description: '如何阅读 Proto UI 面向构建者的文档章节'
---

这一章面向真正准备构建 Proto UI 的人。

它回答的是 Proto UI 如何在代码、runtime、adapter 和宿主边界中成立，而不是第一次接触项目的读者该如何快速上手。

这里适合放：

- runtime 与模块如何协作
- adapter 如何承接规范语义
- compiler 与 host capability 的约束
- 契约、测试与贡献入口的关系
- 原型作者和适配器作者真正会遇到的工作专题

这里不负责：

- 项目动机与哲学论证，那是 `Whitepaper`
- 正式语义裁决，那是 `Specifications`
- 面向普通使用者的起步路径，那是 `Start Here`

零散的实现记录仍先保留在仓库内的 `internal/records/`。当判断稳定后，再提升为这里的工程文、规范文或契约文。

## 从哪里开始？

如果你现在最关心的是 Proto UI 原型到底该怎么写、什么时候不该写、复合原型和风格库该怎么组织，先进入 [原型专题](/zh-cn/build/prototypes/)。
