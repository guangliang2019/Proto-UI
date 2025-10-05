---
rfc: 0208
title: Output / Styler 参考表：标签映射与 visual 规范化
status: Draft
category: Core
version: 0.1.0
created: 2025-09-29
updated: 2025-09-29
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: [0202]
obsoletes: []
depends_on: [0002, 0100, 0200, 0201, 0202]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要

本文给出 **Template 标签到各宿主构件的映射参考**，以及 **visual 语法的规范化规则**。  
visual 语法大量借鉴 Tailwind CSS 的“**原子化、声明式、可组合**”风格；设计 token（颜色、字号、间距等）可由 Adapter options 的 `styler` 注入与覆盖（在 Web 宿主亦可通过覆盖 CSS 变量实现）。  
**重要**：styler 引起的重绘 **MUST NOT** 重新执行 `render`；样式更新由 Output 层增量完成。

> 本文为参考规范（informative + normative mix）：语义要求以 MUST/SHOULD/MAY 表示；映射表为建议默认值，具体宿主可在 04xx 适配 RFC 中细化。

---

## 1. 术语回顾

- **Template**：见 RFC 0202；仅承载结构与 Output 绑定，不得有事件与控制流。  
- **visual**：Template 中的样式绑定入口（如 `<div visual="p-4 h-10">`）；官方原型 **SHOULD** 使用 `visual` 而非 `class`。  
- **class 语法糖**：允许存在，但在解析阶段 **MUST** 规范化为 `visual`。  
- **Styler**：Adapter 的样式翻译/更新子系统；负责将 `visual` token→宿主样式系统的映射与增量更新。

---

## 2. 标签映射参考（Tag Mapping Reference）

- 目的：在宿主具备“渲染树/构件”的情况下，为常用 HTML 风格标签提供**默认映射**思路。  
- 规则：  
  - **SHOULD**：优先映射到**语义相近**的宿主构件；若不存在，映射到中性容器/文本构件并通过 visual 达到近似外观。  
  - **MUST**：映射不得引入新交互语义（交互统一由 RootElement 的事件系统处理）。

### 2.1 常见标签的建议映射

| Template tag | Web (DOM)             | Flutter                            | Qt/QML                         | React Native            | 备注 |
|--------------|------------------------|------------------------------------|--------------------------------|-------------------------|------|
| div          | `<div>`                | `Container` / `SizedBox`           | `Item` / `Rectangle`           | `View`                  | 中性容器 |
| span         | `<span>`               | `Text`（内联场景）/ `RichText`     | `Text`                         | `Text`                  | 行内/短文本 |
| p            | `<p>`                  | `Text`（段落）                     | `Text`                         | `Text`                  | 段落间距交由 visual |
| img          | `<img>`                | `Image`                            | `Image`                        | `Image`                 | 加载策略交由适配器 |
| button       | `<button>`             | `ElevatedButton` / `TextButton`    | `Button`                       | `Pressable` / `Button`  | 交互语义不在模板层 |
| input        | `<input>`              | `TextField`                        | `TextInput`                    | `TextInput`             | 类型扩展由 props/state |
| ul/ol/li     | `<ul>/<ol>/<li>`       | `Column`/`ListView` + `ListTile`   | `Column`/`ListView`            | `FlatList`/`SectionList`| 列表项标记交由 visual |
| svg          | `<svg>`（限定子树）    | 第三方或 `CustomPaint`             | `Canvas` / `Path`              | `react-native-svg`      | 向量绘制映射 |
| hr           | `<hr>`                 | `Divider`                          | `Rectangle`（1px 高）          | `View`（1px 高）        | 分隔线 |

> 适配器 **SHOULD** 维护“标签→宿主构件”的映射表；缺失时选择最接近策略并记录诊断信息（见 0280）。

---

## 3. visual 语法与规范化

### 3.1 设计目标

- **可移植**：不同宿主共享一个“视觉语义层”。  
- **可组合**：原子化 token 可任意组合生成复杂外观。  
- **可替换**：token 的具体数值由 `styler` 的设计 token 注入/覆盖实现。

### 3.2 语法总览

- **基本形式**：`visual="token token token"`（空格分隔）。  
- **分组/域**：token 按语义分组（spacing、size、layout、typography、color、border、radius、shadow、opacity、transform、effect）。  
- **状态修饰符**（State-driven）：`[state-name]:token`（可链式多前缀）。  
  - 示例：`visual="p-4 [data-hover]:bg-red-500 [data-active]:scale-95"`

> 状态名来自 State 模块的可观察状态；Web 宿主可以使用 `data-` 风格，如 `data-hover`、`data-open`。非 Web 宿主由适配器映射到等价状态源。

### 3.3 核心 token（示例级，不是穷举）

- **Spacing / Size**：`p-4 px-2 py-3 m-2 mx-auto w-10 h-10 min-w-... max-h-...`  
- **Layout**：`flex inline-flex grid inline-grid block inline-block contents`，`flex-row flex-col items-center justify-between gap-2`  
- **Typography**：`text-sm text-base text-lg font-medium leading-tight tracking-wide`  
- **Color**：`bg-red-500 text-gray-700 border-blue-400`  
- **Border/Radius**：`border border-2 border-dashed rounded rounded-md rounded-full`  
- **Shadow/Opacity**：`shadow-sm shadow-lg opacity-80`  
- **Transform/Effect**：`scale-95 rotate-6 translate-x-2 backdrop-blur-sm`

> 具体刻度（如 `-500`, `-sm`, `-lg`）由 `styler` 的 design tokens 决定，可通过 Adapter options 的 `styler` 配置覆盖；Web 宿主可通过 CSS 变量覆盖。

### 3.4 class 语法糖与禁止 style

- **MUST**：`class` 在解析阶段 **规范化为** `visual`，语义等价。  
- **MUST NOT**：Template 中 **不允许** 使用 `style` 行内样式。  
- **MUST**：官方原型 **不得** 用 `class` 代替 `visual`；`class` 仅为兼容 Web 心智的输入语法。

### 3.5 冲突与优先级

- **组内互斥**：同一组（如 `bg-*`）多次出现时，**最后出现者生效**（last-wins），并 **SHOULD** 产生诊断告警。  
- **组间组合**：不同组（如 `bg-*` + `rounded-*`）可并存。  
- **状态修饰符优先**：有状态修饰的 token **优先于** 无状态 token；**更具体** 的状态优先于 **更宽泛** 的状态（适配器需定义具体顺序策略并公开文档）。

### 3.6 状态驱动语法与更新

- **MUST**：`[state-name]:token` 会由 styler 监听对应 State 的变化并触发**样式层重绘**；  
  - **MUST NOT**：此类重绘 **不得** 重新执行 `render`。  
- **MAY**：允许多状态级联（如 `[data-hover][data-active]:bg-blue-500`），适配器需定义冲突解析顺序。

### 3.7 动画与过渡（可选能力）

- **MAY**：支持过渡 token（如 `transition-colors duration-200 ease-out`）；  
- **SHOULD**：在能力矩阵中声明是否支持以及“由谁实现”（CSS/宿主动画/自定义引擎）。

---

## 4. 规范化流程（Adapter 端）

适配器在解析 Template → hostTemplate 时 **MUST** 执行以下规范化步骤：

1. **吸收 `class`**：将 `class` 内容合并进 `visual`。  
2. **拒绝 `style`**：检测到行内 `style` 时，**MUST** 抛出错误或至少警告并忽略。  
3. **token 解析**：按分组解析 `visual` 字符串，生成统一的样式中间表示（IR）。  
4. **冲突处理**：应用“组内 last-wins、状态优先”的规则，给出诊断。  
5. **宿主翻译**：将 IR 翻译为宿主样式系统（CSS 类名/变量、Flutter `TextStyle/BoxDecoration`、Qt 属性等）。  
6. **增量更新**：订阅 State 驱动的 token，样式层增量更新，不触发 `render`。  
7. **性能策略**（SHOULD）：批量更新、去抖/合并、复用缓存的 IR/样式对象。

---

## 5. 例子（非规范性）

### 5.1 基本 visual 与状态修饰

<example-tpl>
<div visual="p-4 h-10 bg-gray-100 [data-hover]:bg-gray-200 [data-active]:scale-95">
  <span visual="text-sm font-medium">Hello</span>
</div>
</example-tpl>

### 5.2 使用 class 语法糖（解析为 visual）

<example-tpl>
<div class="p-4 h-10 bg-gray-100"></div>
</example-tpl>

解析后等价于：

<example-tpl>
<div visual="p-4 h-10 bg-gray-100"></div>
</example-tpl>

### 5.3 根元素样式设置（禁止在模板中）

<example-js>
// 在 setup / 外围：
// p.output.visual = "p-4 h-10 bg-gray-100"
</example-js>

---

## 6. 能力矩阵挂钩（与 0290 对齐，示例命名）

- `VisualTokens = YES`  
- `VisualStateModifiers = YES`（支持 [state]:token）  
- `VisualNoInlineStyle = YES`  
- `VisualClassAsSugar = YES`  
- `VisualLastWins = YES`（组内冲突处理策略）  
- `VisualNoReRenderOnStyle = YES`（样式更新不触发 render）  
- `TagMappingTable = PROVIDED`（适配器提供映射表）  
- `AnimationTokens = YES|NO`（可选）

---

## 7. 兼容性与迁移

- 从 CSS/内联样式迁移：  
  - 用 `visual` token 替代 `style`；颜色/尺寸/间距使用 `styler` 的设计 token。  
  - Web 宿主可通过 CSS 变量覆盖设计 token；其他宿主通过 Adapter options 的 `styler` 注入主题。  
- 从带事件的模板迁移：  
  - 移除模板层的事件，改由 RootElement 的事件系统注册（见 0204）。  

---

## 8. 实现提示（Adapter/Styler）

- Web：可将 token→CSS 类或变量，首选 **原子类缓存** 与 **CSS 变量**，组合时最小化样式表膨胀。  
- Flutter：token→`TextStyle` / `BoxDecoration` / `ThemeData`，复用对象避免 rebuild 抖动。  
- Qt/QML：token→`Rectangle`/`Text` 属性或自定义 `Style` 对象，借助 `Binding` 做增量更新。  
- RN：token→`StyleSheet.create()` + 动态合并，注意状态驱动的批量更新。

---

## 变更记录

- 0.1.0 (2025-09-29): 初稿。引入标签映射表；定义 visual 语法、状态修饰、冲突/优先级、class 语法糖与禁用 style；明确“样式重绘不触发 render”与适配器规范化流程。
