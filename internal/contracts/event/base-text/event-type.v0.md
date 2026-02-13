# Event Types Contract (v0)

> **状态**：Draft – implementation-ready  
> **版本**：v0
>
> 本文档定义 **Proto UI 的事件类型体系（EventTypeV0）**，以及不同层级事件的语义边界、解释责任与适配约束。
>
> 本文档是 **规范性（Normative）文档**。

---

## 0. 设计目标与哲学前提

Proto UI 的事件系统不是对某一平台（如 Web）的抽象封装，而是对 **人机交互（HCI）中的“意图变化”与“状态转换”** 的建模。

因此：

- Proto UI 的事件类型 **不是 DOM Event 的映射表**
- 也不是对具体设备（鼠标、键盘、触屏）的枚举
- 而是一个 **分层的、可解释的事件语义协议**

事件类型被明确划分为 **三个层级**：

1. **协议核心级事件（Core）**  
   描述人机交互中最抽象、最稳定的意图变化
2. **交互载体级事件（Optional / Medium-specific）**  
   描述特定交互媒介上的通用行为，但仍保持跨框架意义
3. **Host 级事件（Extension）**  
   放弃跨 Host 语义，仅作为原生事件的直通通道

---

## 1. 事件类型分层总览

### 1.1 EventTypeV0 联合类型（规范定义）

```ts
type EventTypeV0 = CoreEventType | OptionalEventType | ExtensionEventType;
```

---

## 2. 协议核心级事件（CoreEventType）

### 2.1 定义与定位

**协议核心级事件**建立在人机交互（HCI）的最基本维度之上：

- 与具体设备无关
- 与具体 Host / 平台无关
- 与具体 UI 框架无关
- 描述的是 **“用户意图的生命周期”**

这些事件具有最高的抽象层级，也是 Proto UI 希望 **优先保证长期稳定性** 的事件集合。

---

### 2.2 Press 事件族：激活意图（Activation Intent）

Press 并不等价于“鼠标点击”或“触屏点击”，它表示的是 **“用户试图激活某个交互目标”** 这一意图的演化过程。

#### 2.2.1 事件列表

```ts
'press.start';
'press.end';
'press.cancel';
'press.commit';
```

#### 2.2.2 语义说明（规范）

- **`press.start`** 激活意图开始用户明确开始对某个交互目标施加激活动作

- **`press.end`** 激活意图结束用户结束了激活动作（不论是否成功）

- **`press.commit`** 激活意图确认用户完成了一个**有效的激活行为**

- **`press.cancel`** 激活意图取消激活过程被中断，且不应被视为一次成功激活

#### 2.2.3 解释责任（Normative）

- Proto UI **不规定**这些事件在具体 Host 中如何触发
- Adapter **必须**在其 Host 环境中，为这些事件提供合理解释
- 同一 Host 中，不同交互媒介可以共享同一组 Core 事件

#### 2.2.4 示例（非规范性）

- Pointer 设备：
  - `press.start` → pointerdown
  - `press.commit` → pointerup 且未离开目标
  - `press.cancel` → pointerup 但目标发生变化

- 键盘：
  - `press.start` → keydown
  - `press.commit` → keyup
  - `press.cancel` → 由 Host 决定（如焦点丢失）

---

### 2.3 Key 事件族：输入激活（Key Intent）

```ts
'key.down';
'key.up';
```

#### 语义说明

Key 事件用于描述 **“某种输入通道被激活 / 释放”**：

- 不限定具体硬件（键盘、按钮、辅助设备等）
- 键值的具体枚举 **在 v0 中不做强约束**
- Adapter 可自行决定如何映射 Host 的输入系统

---

## 3. 交互载体级事件（OptionalEventType）

### 3.1 定义与定位

交互载体级事件：

- 指定了某一类交互媒介（如 pointer、文本输入、导航焦点）
- 但仍然保持 **去框架化、去实现细节** 的语义
- 用于在“完全抽象的 Core”与“完全具体的 Host”之间建立桥梁

这些事件：

- **不是强制要求 Adapter 实现**
- 但一旦实现，必须遵循其约定语义

---

### 3.2 Pointer 事件族

```ts
'pointer.down';
'pointer.move';
'pointer.up';
'pointer.cancel';
'pointer.enter';
'pointer.leave';
```

- 描述基于指针类设备的空间交互
- Adapter 可以直接映射自 Web Pointer Events
- 也可以由其他 Host 的输入系统模拟

---

### 3.3 焦点与文本事件

```ts
'nav.focus';
'nav.blur';
'text.focus';
'text.blur';
'input';
'change';
'context.menu';
```

- `nav.*`：导航焦点（通常用于非文本交互）
- `text.*`：文本输入焦点
- `input` / `change`：值变化语义
- `context.menu`：上下文菜单意图

---

## 4. Host 级事件（ExtensionEventType）

### 4.1 定义

```ts
type ExtensionEventType = `native:${string}` | `host.${string}`;
```

### 4.2 语义定位

Host 级事件表示：

> **放弃跨 Host 语义，只作为原生事件的直通通道**

其特点：

- Proto UI **不对其语义做任何解释**
- 不保证跨平台一致性
- 仅保证生命周期与调用时序正确

---

### 4.3 命名规范（Normative）

- `native:*`
  - 表示直接映射 Host 的原生事件名
  - 例如：`native:click`、`native:keydown`

- `host.*`
  - 表示 Host 自定义的高阶事件
  - 例如：`host.dragStart`、`host.viewResize`

---

### 4.4 Adapter 责任

- Adapter **必须**将 Host 级事件直接绑定到 Host 原生事件
- **不得**对其做语义重解释
- **不得**将其混入 Core / Optional 事件体系

---

## 5. 有效性校验规则（Normative）

实现 **必须拒绝** 以下情况：

- 非字符串事件类型
- 空字符串
- 不符合以下任一条件的事件名：
  - 属于 CoreEventType
  - 属于 OptionalEventType
  - 匹配 `native:*`
  - 匹配 `host.*`

---

## 6. 演进策略（v0 约束）

- v0 **不允许删除或重定义**已有 Core 事件
- v0 允许：
  - 增加 Optional 事件
  - 增加 Host 级事件

- Core 事件的语义调整 **必须通过新版本契约完成**

---

## 7. 与 Event Contract 的关系

- 本文档定义 **事件类型的语义与分层**
- `event.v0.md` 定义 **事件的注册、绑定、生命周期与调用规则**
- 两者共同构成 Proto UI Event 系统的完整 v0 契约

---

## 附录 A：设计原则总结（Informative）

- Core 事件 = 人机交互中的“意图状态机”
- Optional 事件 = 特定交互媒介的通用表达
- Host 事件 = 明确放弃跨平台的逃生舱
- Component Author **不应**关心事件如何被解释
- Adapter **必须**承担语义映射与解释责任
