---
rfc: 0201
title: Adapter 基本模型
status: Draft
category: Core
version: 0.1.0
created: 2025-09-29
updated: 2025-09-29
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: [0200]
obsoletes: []
depends_on: [0001, 0002, 0100, 0200]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

本文件定义 **Adapter** 在 PAL 中的角色与职责边界：Adapter 是一种**纯函数式映射**，将 `Prototype` 解释为目标宿主的 `Component`。Adapter **不得改变语义**，仅负责把 0200 中定义的 Prototype 语义（结构/表现/行为）投影到具体宿主实现。文档还规定了模块化能力、与 Compiler 的关系、逻辑型原型的处理，以及抹平宿主差异的义务。

## 1. 范围

- 规定 Adapter 的对象模型、职责边界、能力模块与合规要求。
- 不涉及宿主专属细节（放入 04xx 系列，如 Web/Flutter/Qt 的适配细则）。
- 不重复 0200 中对 Prototype 的定义；仅描述其在宿主侧的落地。

## 2. 对象模型与调用方式

### 2.1 纯函数形式

- **MUST**：Adapter 为纯函数，使用形式为  
  <sig>Adapter(Prototype): Component</sig>  
  Adapter **不得**读写任何超出其输入/宿主上下文之外的全局可变状态，**不得**引入与 0200 冲突的新语义。

### 2.2 工厂函数（可选）

- **MAY**：Adapter 可由工厂函数生成：  
  <sig>createAdapter(options): Adapter</sig>  
  用于注入宿主差异、调试开关、性能策略等**实现级参数**；这些参数**不得**改变 Prototype 的对外语义。

### 2.3 RootElement 映射

- **MUST**：0200 所定义的 `RootElement` 在宿主侧必须有明确对应（如 DOMElement、Flutter Widget、Qt 对象等）。  
- **MUST**：所有交互事件在宿主侧应附着到该对应元素/对象，不得“旁路绑定”。

## 3. 职责边界（语义优先）

### 3.1 Adapter 的职责

- **MUST**：解释并落实 PAL-Core 的能力到宿主实现：  
  - Props → 宿主属性/构造参数/配置  
  - State → 宿主可观察属性/绑定机制  
  - Context → 宿主上下文/依赖注入/订阅系统  
  - Lifecycle → 宿主挂载/卸载/可见性生命周期  
  - Event → 事件注册/反注册（附着 RootElement）  
  - Output/Expose/Debug → 宿主侧的对应输出管道与可观测性钩子

- **MUST**：解析渲染模版（Template: Element/Prototype）并转化为宿主的渲染实现。  
  - 说明：0200 要求 `render` 仅描述结构/样式，不含事件绑定；事件在 Adapter 的 Event 模块完成绑定。

- **MUST**：最终产物为宿主的 `Component` 实例。  
  - 对于**不允许存在无渲染节点**的宿主（如某些 Web Component 方案），此约束降级为 **SHOULD**，允许逻辑型原型用“最小占位”策略实现（见 3.3）。

### 3.2 不得更改语义

- **MUST NOT**：Adapter 不得修改 Prototype 的结构/表现/行为语义；不得注入额外交互、额外状态或隐式副作用。  
- **MUST**：Adapter 的优化（批更新、合并重绘、延迟绑定等）**不得改变语义**。

### 3.3 逻辑型原型的渲染

- **MUST**：逻辑型原型（无直接 Output 的 Prototype）是否渲染，由**原型本身**决定；Adapter **不得**强行渲染或强行不渲染。  
- 对于强制要求“必须有渲染节点”的宿主：  
  - **SHOULD**：采用“最小占位”策略（如空容器/透明节点）以满足宿主约束，同时**不引入新语义**。  
  - **MUST**：在实现说明中标注该行为，并在能力矩阵中声明。

### 3.4 抹平不对称能力（Semantic Bridging）

- **MUST**：当宿主缺乏 PAL-Core 所需的能力时，Adapter 必须提供语义等价或最接近的实现。  
  - 示例：  
    - **Web Component** → 没有原生 Context API，Adapter 需要通过属性传递、事件总线或影子 DOM 辅助来实现 Context 的传播与订阅。  
    - **Flutter** → 没有外部样式绘制系统（Styler），Adapter 需要通过 `InheritedWidget`、`ThemeData` 或自定义 `Widget` 来承载暴露的样式变量。  
  - 要求：替代方案 **MUST** 保持与 PAL-Core 一致的外部可观察语义，即调用者看不出差异。  

- **MUST**：当宿主无法完全实现 PAL-Core 的某一能力时，Adapter 必须在能力矩阵（RFC 0290）中声明“部分实现”或“不适用”。  
- **SHOULD**：提供开发者文档，解释宿主差异与补丁策略，以避免误用。  

## 4. 模块化能力（PAL-Core 的适配模块）

- **SHOULD**：Adapter 以**模块化**形式提供 PAL-Core 的能力，便于独立演化与复用：  
  - <mod>PropsAdapter</mod>、<mod>StateAdapter</mod>、<mod>ContextAdapter</mod>、<mod>LifecycleAdapter</mod>、<mod>EventAdapter</mod>、<mod>OutputAdapter</mod>、<mod>ExposeAdapter</mod>、<mod>DebugAdapter</mod>  
- **MAY**：为宿主提供扩展模块（如手势、可访问性、宿主特化动画），但**不得**覆盖或扭曲 PAL 语义。

## 5. 与 Compiler 的关系

- **MUST**：在规范层面，Compiler 与 Adapter **没有直接依赖关系**。  
  - Compiler = **静态生成**；Adapter = **运行时映射**。  
- **MAY**：Compiler **可以**调用 Adapter 的能力模块（作为库）来执行涉及运行时语义的优化（如事件汇总、属性归并），但这不构成规范上的强依赖。  
- **MUST NOT**：Adapter 不得依赖 Compiler 才能运行。

## 6. 合规性要求

- **MUST**：实现 PAL-Core 的全部映射（Props/State/Context/Lifecycle/Event/Output；Expose/Debug 若在宿主不可用，需在能力矩阵中注明“不适用”）。  
- **MUST**：保证 RootElement 映射与事件绑定的一致性。  
- **SHOULD**：以模块化形式暴露各能力模块，声明版本与兼容性。  
- **SHOULD**：提供最小验收用例与可观测性钩子，支持合规测试。  
- **MAY**：对逻辑型原型采用最小占位实现（当宿主强制需要节点时），并在实现说明中披露。

## 7. 典型签名与伪例（非规范性）

### 7.1 工厂与适配签名

<sig>
// 运行时映射
type Adapter = (proto: Prototype) => Component

// 工厂
type CreateAdapter = (options?: AdapterOptions) => Adapter
</sig>

### 7.2 Web 宿主的最小占位策略（逻辑型原型）

<example-js>
// 当宿主必须有节点时，逻辑型原型可由 Adapter 返回“最小占位”元素：
// - 节点仅用于满足宿主的结构要求
// - 不引入任何可感知语义（样式、尺寸、可见性均为“空”或透明）
const element = document.createElement('proto-placeholder')
element.style.display = 'contents' // 或尽可能接近“无容器”语义
return element
</example-js>

（实现者应根据宿主能力选择更稳妥的“无容器”策略，并在适配器说明中披露。）

## 8. 兼容性与迁移

- 宿主 API 演进：Adapter **SHOULD** 通过模块化与版本标注减少破坏性升级；当必须破坏时，遵循 0001 的弃用/迁移策略。  
- 变体共存：当存在 PAL 的其它变体（如 PAL-Roles），Adapter **MAY** 提供并行实现或声明“不适用”，并在能力矩阵（0290）中映射差异。  
- 测试与基线：Adapter **SHOULD** 通过公共测试夹具验证语义一致性（含 RootElement 绑定与事件路径）。

## 9. 关系图（非规范性）

<diagram>
Prototype ──(0201 Adapter)──▶ Component(on Host)
      │             ▲
      │             │ uses (optional)
      └──(Compiler)─┘ capability modules for runtime-aware optimizations
</diagram>

## 变更记录

- 0.1.0 (2025-09-29): 初稿。确立 Adapter 纯函数形态与工厂可选；明确“不得改语义”；逻辑型原型的渲染权归属 Prototype；模块化能力；与 Compiler 的弱耦合关系；RootElement 映射与最终产物约束；新增“抹平不对称能力”条款。
