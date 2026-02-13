# Runtime Internal Notes (non-contract)

> 说明：本文档用于固定 runtime 的内部职责划分与工程约束。  
> 不属于 Proto UI contract 体系，不具有哲学语义的规范地位。  
> 其作用是让实现可稳定演进，并为单元测试提供边界依据。

---

## 1. 核心目标

本次拆分的目标是：

- 将 `engine` 拆为 `kernel` + `instance`
- 让 **port 合法存在于 Instance**，但 **Kernel 无法读取**
- 将模块管理演进为 **ModuleOrchestrator**（未来具备 deps graph 能力）
- 让 adapter 只面对 Instance（而非 kernel/module 细节）

---

## 2. 三方职责划分

### 2.1 Kernel（内核）

**定位**：生命周期与时序的“法官”。  
**只关心时间线与规则，不接触 port。**

**负责：**

- Proto lifecycle 的时序与 phase 变迁
- phase/guard 规则与错误模型
- callback 调度与执行时机
- timeline/trace 的记录
- 使用 module facade 创建 `def` 句柄与 `run` 句柄（面向 Component Author 的 Runtime API）

**不负责：**

- module 的创建与销毁
- port/facade 的聚合与暴露
- adapter 对接

---

### 2.2 ModuleOrchestrator（模块编排器）

**定位**：模块的“编排与治理中心”。  
**面向模块生态，管理 module 的生命期与接线。**

**负责：**

- module 实例创建/销毁
- port、facade、hooks 的聚合
- 接线顺序与卸载顺序
- 对外暴露的扁平化 wiring 接口（或由 Instance 进一步封装给 adapter）
- 未来 deps graph 的解析与处理

**不负责：**

- phase 规则与执行顺序的最终裁决
- adapter 的对接策略

---

### 2.3 Instance（运行时会话 + 适配层入口）

**定位**：runtime 的“对外适配层”，服务于 adapter-base。  
**它是 kernel 与 orchestrator 之间的组织层与边界层。**

**负责：**

- 管理 Kernel 与 ModuleOrchestrator 的组合关系
- 对 adapter/host 暴露统一入口（唯一入口）
- 承载 port（合法可见），并隔离 Kernel
- 作为运行时 session 的实体标识与生命周期容器
- 封装并透传 wiring 接口，使 adapter 能为 host-caps 完成接线

**不负责：**

- 自己定义语义；语义由 kernel + module contract 决定

---

## 3. Port 可见性规则

**原则：** port 对 Instance 合法可见，对 Kernel **不可见**。

建议实现约束（可组合使用）：

- Type 级别隔离：Kernel 的构造参数中不包含 port 相关类型
- 模块接口拆分：ModuleOrchestrator 返回的 port 聚合只进入 Instance
- 代码结构隔离：Kernel 与 Orchestrator/Instance 分目录，避免误用

---

## 4. Adapter 入口规则

**Adapter 只通过 Instance 与 runtime 交互。**

- adapter-base 仅依赖 Instance 公共接口
- adapter 不直接接触 kernel/module
- 如需扩展能力，通过 Instance 的稳定接口暴露

---

## 4.1 host-caps 与 wiring 的必要性

Proto UI 的 module-\* 通常无法由 runtime 单独完成构建：

- module 会主动索取 **host-caps** 来完善自身能力
- runtime 无法直接提供这些 caps
- ModuleOrchestrator 负责收集所需 caps
- Instance 负责将 wiring 接口对外暴露
- adapter-\* 负责使用 host 原生方式完成接线

这一链路是将 **组件原型（setup 为主体的语义载体）**  
翻译为具体 host 原生实现的关键步骤。

---

## 5. module-base / core 的调整方向

由于 core 中存在部分 module 类型，本次拆分允许影响：

- port 类型与可见性
- module 实例与 facade 的边界
- module hooks 的组织方式

**目标是让 port “合法出现在 Instance 上”，但 Kernel 无法读取。**

---

## 6. 迁移策略（保存点）

为了避免中途返工扩大：

1. 先保持行为一致，做结构迁移与目录重组
2. 再做接口封装与类型隔离
3. 最后补齐必要单测（非契约测试）

每一步保持可运行与可回退。

---

## 7. 术语对齐

- **Component Author**：Proto UI 语境中的组件原型编写者
- **Runtime API**：服务于 Component Author 的顶层 API
- **Module**：原子能力单元
- **Port**：模块对运行时侧的能力出口

---
