# Proto UI Package 分工地图

> 内部治理参考文档。本文用于解释 Proto UI 各主要 package 层级的职责分工、主要面向谁，以及贡献者和维护者在扩展系统时应如何理解 package 边界。

---

## 1. 本文目的

Proto UI 当前拥有多个 package 层级，它们服务的用户与工程目标并不相同。

这份文档用于帮助贡献者和维护者回答以下问题：

- 每一层 package 是干什么的
- 它主要应该被谁直接消费
- 哪些层是 public entry point，哪些层是架构支撑层
- Prototype、Adapter、核心能力扩展这些工作，各自通常应该落在哪一层

本文主要写给：

- 贡献者
- 维护者
- `Prototype Author`
- `Adapter Author`

它补充但不替代：

- 各 package 自己的 README
- 架构记录文档
- 首发 package 治理文档

---

## 2. 读者模型

Proto UI 的不同 package 层，本质上服务于不同的用户。

为了方便做工程判断，可以使用以下几类角色：

- `Maker`：想直接消费 Proto UI 组件或生成组件的人
- `Prototype Author`：编写或扩展 prototype 的人
- `Adapter Author`：编写或扩展 adapter 的人
- 贡献者 / 维护者：调整架构、契约、runtime 或 package 边界的人

一个人可以同时扮演多个角色，但 package 体系仍然应按其主要消费者来描述。

---

## 3. 分层模型

Proto UI 的 package surface 可以大致理解为以下几层：

1. 概念与契约层
2. 作者语法层
3. runtime 与 adapter 构建层
4. 面向宿主的 adapter 层
5. prototype library 层
6. module 能力层

这些层之间彼此关联，但并不面向同一批用户。

---

## 4. 概念与契约层

### 4.1 `@proto.ui/core`

`@proto.ui/core` 负责定义 Proto UI 的核心概念、函数签名、API 形状以及内部 SPI 形状。

它的重心是：

- 定义
- 术语
- 核心语义

而不是：

- 大量具体实现
- 宿主行为
- 首次上手体验

它主要面向：

- `Prototype Author`
- `Adapter Author`
- 贡献者
- 维护者

当工作属于以下类型时，应优先考虑落在 `@proto.ui/core`：

- 定义核心概念
- 调整 API 契约
- 扩展 SPI 预期

不要把它当成普通 first-user package 去讲述。

### 4.2 `@proto.ui/types`

`@proto.ui/types` 用于聚合共享公共类型以及偏协议语义的类型描述。

它存在的价值是：在不引入运行时代码耦合的前提下，让共享语义可以被多处复用。

它主要面向：

- 贡献者
- 维护者
- 需要协议级类型的作者

当一个 package 只需要共享类型，而不应该引入 JS 运行时代码时，应优先依赖它。

---

## 5. 作者语法层

### 5.1 `@proto.ui/hooks`

`@proto.ui/hooks` 是一个较为特殊的作者层。

它允许顶层作者语法与更底层的能力 port，以尽可能接近 `asHook` 心智模型的形式并存。

它本身不负责实现能力。

它更像是连接以下三者的桥：

- 面向作者的语法
- 底层能力 port
- 后续由 runtime 提供实现的能力面

它主要面向：

- `Prototype Author`
- 扩展作者语法面的贡献者

当工作属于以下情况时，应优先考虑 `@proto.ui/hooks`：

- 设计面向作者的能力语法
- 定义某个特权 `asHook` 的契约形状
- 用作者更容易理解的方式暴露底层能力 port

如果一个改动只涉及宿主实现细节，那它通常不该落在这里。

---

## 6. Runtime 与 Adapter 构建层

### 6.1 `@proto.ui/runtime`

`@proto.ui/runtime` 负责实现编排逻辑，并落实 core API 与 SPI 的行为。

它是 Proto UI 通用运行时哲学的具体实现聚合层，但它仍然不直接和真实宿主打交道。

它的职责重心是：

- 编排
- 语义落地
- 面向 adapter 的能力组装

它主要面向：

- 贡献者
- 维护者

它的正常直接消费者应当主要只有：

- `@proto.ui/adapter-base`

经验规则上，如果有其他 package 想直接依赖 `@proto.ui/runtime`，应视为特殊情况，并明确说明理由。

### 6.2 `@proto.ui/adapter-base`

`@proto.ui/adapter-base` 是面向 adapter 编写的 facade 与模版层。

它将 runtime 支撑的能力包装成更适合 `Adapter Author` 使用的结构。

它的职责是：

- 提供 adapter 构建模版
- 引导 adapter wiring
- 作为 runtime 面向 adapter 作者的 facade

它主要面向：

- `Adapter Author`
- 处理 adapter 结构的贡献者

具体 adapter 应优先建立在这一层之上，而不是绕过它直接向下耦合。

---

## 7. 面向宿主的 Adapter 层

### 7.1 `@proto.ui/adapter-react`

负责把 Proto UI prototype 翻译成 React 组件。

它主要面向：

- `Maker`
- 需要验证 React 产物的 `Prototype Author`

### 7.2 `@proto.ui/adapter-vue`

负责把 Proto UI prototype 翻译成 Vue 组件。

它主要面向：

- `Maker`
- 需要验证 Vue 产物的 `Prototype Author`

### 7.3 `@proto.ui/adapter-web-component`

负责把 Proto UI prototype 翻译成 Web Component。

它主要面向：

- `Maker`
- 需要验证 Web 产物的 `Prototype Author`

对于所有具体 adapter，贡献者最重要的问题通常不是：

“API 形状表面上长什么样？”

而是：

“这个 adapter 选择支持哪些 module 能力，宿主又能在多大程度上忠实表达它们？”

---

## 8. Prototype Library 层

### 8.1 `@proto.ui/prototypes-base`

`@proto.ui/prototypes-base` 是官方基础 prototype library。

它同时承担两个角色：

- `Maker` 可直接消费的基础能力面
- 其他 styled library 推荐继承的交互根基

它应被视为官方 headless foundation，而不是一个“可有可无的 demo 包”。

它主要面向：

- `Maker`
- `Prototype Author`

### 8.2 `@proto.ui/prototypes-shadcn`

`@proto.ui/prototypes-shadcn` 是建立在 base library 之上的 styled prototype library。

它用于支持更贴近真实使用场景的 styled usage，同时不替代 base library 在交互层面的地位。

它主要面向：

- `Maker`
- `Prototype Author`

在维护这层时，应优先考虑对 base 的继承关系和行为忠实度，而不是短期样式便利性。

---

## 9. Module 能力层

### 9.1 `@proto.ui/module-base`

`@proto.ui/module-base` 是所有 module 包的共同根基。

它定义 module 体系共享的结构预期。

module 包不是通用 end-user package。

它们主要被以下对象消费：

- `@proto.ui/adapter-base`
- 具体 adapter

对于 adapter 设计来说，最重要的问题不是：

“我能不能把所有 module 都接进来？”

而是：

“这个宿主里，哪些 module 是必要的、推荐的、可选的，哪些能力不应该假装自己支持？”

### 9.2 各个 `@proto.ui/module-*` package

每个 module package 都代表一个能力家族。

例如：

- state
- props
- event
- feedback
- focus
- overlay
- rule
- expose
- boundary

这些 package 更适合被理解为：

- 宿主能力契约
- adapter wiring 单元
- Proto UI 架构中的能力边界

它们主要面向：

- `Adapter Author`
- 扩展能力家族的贡献者
- 演进架构的维护者

它们通常**不是** `Maker` 的默认入口层。

### 9.3 必要、推荐与可选 module

并不是每个 module 的地位都相同。

有些 module 基本上是 Proto UI 在宿主中成立的前提。

有些 module 是强烈推荐项。

有些 module 则是可选项，只有在宿主能忠实表达时才应支持。

这件事很重要，因为 adapter 的质量，不只取决于它“支持了多少”，也取决于它“有没有假装支持自己其实表达不好的能力”。

---

## 10. 常见工作应该如何落层

### 10.1 编写或扩展 prototype

通常重心应落在：

- `@proto.ui/prototypes-base` 或其他 prototype library
- `@proto.ui/hooks`
- `@proto.ui/core`

只有当 prototype 工作真实暴露出架构能力缺口时，才应进一步触碰 module、runtime 或 adapter 内核。

### 10.2 编写或扩展 adapter

通常重心应落在：

- `@proto.ui/adapter-base`
- 某个具体 adapter package
- 若干相关的 `@proto.ui/module-*` package

除非有明确架构理由，否则不要直接依赖 `@proto.ui/runtime`。

### 10.3 新增一个特权 `asHook`

这类工作通常会横跨多层：

- `@proto.ui/core`
- `@proto.ui/hooks`
- 一个或多个 `@proto.ui/module-*` package
- 可能还包括 `@proto.ui/adapter-base`
- 如果需要宿主支持，也会影响具体 adapter

如果一个新的特权 `asHook` 无法被解释为一个清晰的能力边界，那它的形状往往还没有准备好。

### 10.4 扩展核心 API 或 SPI

通常重心应落在：

- `@proto.ui/core`
- `@proto.ui/types`
- `@proto.ui/runtime`

并且经常还会波及：

- `@proto.ui/hooks`
- `@proto.ui/adapter-base`

这类改动应首先被视为架构工作，而不是局部 package 改动。

---

## 11. 依赖方向指导

默认情况下，建议按以下方向理解依赖：

- `Maker` 应主要通过 adapter 与 prototype library 接触 Proto UI
- `Prototype Author` 应主要通过 prototype library、hooks 与 core surface 工作
- `Adapter Author` 应主要通过 adapter-base 与 module package 工作
- `@proto.ui/runtime` 正常情况下应位于 `@proto.ui/adapter-base` 背后
- `@proto.ui/module-*` package 通常应由 adapter 消费，而不是由普通业务代码直接消费

如果一个依赖关系一口气跨越过多层级向下耦合，应把它视为值得 review 的设计味道。

---

## 12. 非目标

这份文档不会：

- 取代各 package README
- 永久冻结所有依赖规则
- 详尽穷举每个 package 的全部细节

它的目标，是给贡献者和维护者提供一张稳定、够用的方向地图。

---

## 13. 总结

Proto UI 的 package 分层在受众和职责上是有意区分的：

- `core` 与 `types` 负责定义共享概念
- `hooks` 负责塑造作者语法层
- `runtime` 负责通用编排落地
- `adapter-base` 负责组织 adapter 编写方式
- 具体 adapter 负责暴露面向宿主的消费能力
- prototype library 负责暴露可复用的组件行为
- module package 负责定义能力家族与 adapter wiring 边界

当拿不准一个工作该落在哪时，贡献者应先问三件事：

- 这个 package 的直接用户是谁
- 这个职责应由哪一层拥有
- 当前依赖方向是否仍然符合预期架构
