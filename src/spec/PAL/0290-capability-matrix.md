---
rfc: 0290
title: 能力矩阵（Capability Matrix）
status: Draft
category: Meta
version: 0.1.0
created: 2025-10-01
updated: 2025-10-01
authors: [Proto UI Core Team]
reviewers: []
discussions: https://github.com/proto-ui/proto-ui/discussions
updates: []
obsoletes: []
depends_on: [0200, 0201, 0202, 0203, 0204, 0205, 0206, 0207, 0208]
conflicts_with: []
variant: PAL-PSC
affects_compliance: [PAL-Core]
---

## 摘要
本文件定义 **PAL-Core 能力矩阵** 的结构与标注方式，供 Adapter/Compiler/Host 报告实现覆盖度，及 RFC 互相引用的合规断言。  
矩阵条目按模块分组（Prototype/Adapter/Template/Lifecycle/Event/State/Props/Context/Output/Diagnostics 等），每项能力给出实现状态与备注。

---

## 1. 评分与标注
- **实现状态**（`impl`）取值：
  - `YES`：完全实现；  
  - `NEAR`：近似实现（语义等价但机制不同，或存在小限制）；  
  - `PARTIAL`：部分覆盖（注明缺口）；  
  - `N/A`：宿主不适用；  
  - `NO`：未实现。
- **证据与备注**：每项建议填写 `notes`（实现要点/限制/链接）与 `evidence`（测试/文档/PR 链接）。

> 可选：为关键 MUST 条目设置 **阻断门**（gating），当未达成时不得宣称“PAL-Core 兼容”。

---

## 2. 快速概览（清单式）
> 供人审阅的缩略清单；详细含义见各模块章节与对应 RFC。

- Prototype/Model：`SetupRequired` `RenderOptional` `RootElementSingleton` `PSC`  
- Adapter：`PureFunction` `FactoryOptional` `RootMapping` `SemanticNoChange` `SemanticBridging` `Modular`  
- Template：`Tree` `NoEvents` `NoCtrlFlow` `OutputBinding` `ClassAsSugar` `NoInlineStyle` `SingleSlot` `HostTreeMapping`  
- Lifecycle：`SetupBeforeCreate` `ContextInitBeforeConnected` `ConnectedEnablesEvents` `FirstRenderAfterConnected` `ExplicitUpdateRerenders` `StyleRepaintNoRender` `AutoDisposeOnUnconnect`  
- Event：`on/off/onGlobal/offGlobal` `BindToRoot` `QueueBeforeConnect` `ImmediateAfterConnect` `IdempotentOff` `DedupOn` `NestedAllowed` `Ownership` `Namespace` `HookExposeHandlers`  
- State：`FSM` `ExposeToOutput` `DataAttrLowFreq` `SignalHighFreq` `NoImplicitRender` `DefineInSetup` `WatchExternalPreferred`  
- Props：`DefineInSetup` `CreateFreeze` `NoImplicitRender` `WatchOnlyInSetup` `GetAnytime` `RepeatDefineOverwrite`  
- Context：`DI` `ProvideTopLevel` `WatchTopLevel` `GetAfterConnected` `NearestAncestor` `ResubOnProviderInsert` `SharedMemoryDefault` `ImmutableModeOptional`  
- Output/Styler：`VisualTokens` `StateModifiers` `ClassSugar` `NoInlineStyle` `LastWins` `NoReRenderOnStyle` `TagMappingTable`  
- Diagnostics（提要）：`ViolationsLogging` `LeakGuard` `PerfCounters` `DevInspectHooks`  

---

## 3. 全量矩阵（逐项）
> 建议实现方复制此表并填写 `impl/notes/evidence`。如条目不适用，标为 `N/A` 并说明原因。

### 3.1 Prototype / Core Model（0200）
| capability | impl | notes | evidence |
|---|---|---|---|
| SetupRequired |  |  |  |
| RenderOptional |  |  |  |
| RenderAccessSetupContext(Closure\|Handle) |  | 模式： |  |
| RootElementSingleton |  |  |  |
| PSC(Supported) |  |  |  |
| HookSupported(asHook) |  |  |  |
| HookConflictDetection |  |  |  |

### 3.2 Adapter（0201）
| capability | impl | notes | evidence |
|---|---|---|---|
| PureFunction(Adapter(Prototype):Component) |  |  |  |
| FactoryOptional(createAdapter) |  |  |  |
| RootMapping |  |  |  |
| SemanticNoChange |  |  |  |
| TemplateToHostTree(renderer) |  |  |  |
| ModularAbilities(Props/State/Context/...) |  | 列出模块： |  |
| SemanticBridging(MissingHostFeatures) |  | 例：Context on Web Components; Styler on Flutter |  |
| NoCompilerDependency |  |  |  |
| FinalProductIsComponent |  | 若宿主强制有节点不可空 → SHOULD |  |

### 3.3 Template（0202）
| capability | impl | notes | evidence |
|---|---|---|---|
| TemplateTree |  |  |  |
| TemplateNoEvents |  |  |  |
| TemplateNoControlFlow |  |  |  |
| TemplateOutputBinding(visual, …) |  |  |  |
| TemplateClassAsSugar |  |  |  |
| TemplateNoInlineStyle |  |  |  |
| TemplateSingleSlot |  |  |  |
| HostTreeMapping(YES/NEAR) |  |  |  |

### 3.4 Lifecycle（0203）
| capability | impl | notes | evidence |
|---|---|---|---|
| SetupBeforeCreate |  |  |  |
| ContextInitBeforeConnected |  |  |  |
| ConnectedEnablesEvents |  |  |  |
| FirstRenderAfterConnected |  |  |  |
| ExplicitUpdateReRenders |  |  |  |
| StyleRepaintNoRender |  |  |  |
| AutoDisposeOnUnconnect |  |  |  |
| ErrorBoundary(Optional) |  |  |  |

### 3.5 Event（0204）
| capability | impl | notes | evidence |
|---|---|---|---|
| EventAPIs(on/off/onGlobal/offGlobal) |  |  |  |
| EventBindToRoot |  |  |  |
| QueueBeforeConnect |  |  |  |
| ImmediateAfterConnect |  |  |  |
| IdempotentOff |  |  |  |
| DeduplicateOn |  |  |  |
| NestedCallsAllowed |  |  |  |
| Ownership |  |  |  |
| Namespace |  |  |  |
| HookExposeHandlers |  |  |  |
| MappingTablesProvided |  | Pointer/Keyboard/Global… |  |

### 3.6 State（0205）
| capability | impl | notes | evidence |
|---|---|---|---|
| StateAsFSM |  |  |  |
| StateExposeToOutput |  |  |  |
| LowFreqDataAttr(data-*) |  |  |  |
| HighFreqSignal(--*) |  |  |  |
| NoImplicitRenderOnSet |  |  |  |
| DefineInSetup |  |  |  |
| WatchExternalPreferred |  |  |  |

### 3.7 Props（0206）
| capability | impl | notes | evidence |
|---|---|---|---|
| DefineInSetup |  |  |  |
| CreateFreeze |  |  |  |
| WatchOnlyInSetup |  |  |  |
| GetAnytimeAfterCreate |  |  |  |
| RepeatDefineOverwrite |  |  |  |
| NoImplicitRender |  |  |  |

### 3.8 Context（0207）
| capability | impl | notes | evidence |
|---|---|---|---|
| DIModel |  |  |  |
| ProvideTopLevel |  |  |  |
| WatchTopLevel |  |  |  |
| GetAfterConnected |  |  |  |
| NearestAncestorWins |  |  |  |
| ResubscribeOnProviderInsert |  |  |  |
| SharedMemoryDefault |  |  |  |
| ImmutableMode(Optional) |  |  |  |

### 3.9 Output / Styler（0208）
| capability | impl | notes | evidence |
|---|---|---|---|
| VisualTokens |  |  |  |
| StateModifiers([[state]]:token) |  |  |  |
| ClassAsSugar |  |  |  |
| NoInlineStyle |  |  |  |
| LastWins |  | 规则文档： |  |
| NoReRenderOnStyle |  |  |  |
| TagMappingTableProvided |  |  |  |
| AnimationTokens(Optional) |  |  |  |

### 3.10 Diagnostics / Tooling（提要，分 RFC 另述）
| capability | impl | notes | evidence |
|---|---|---|---|
| ViolationsLogging |  |  |  |
| LeakGuard |  |  |  |
| PerfCounters |  |  |  |
| DevInspectHooks |  | Hook/Events/State/Context 只读视图 |  |

---

## 4. 断言与门控（示例）
- **PAL-Core 合规** 至少要求以下 MUST 级条目为 `YES` 或 `NEAR`（详见各 RFC 的 MUST 列表）：  
  - Prototype：`SetupRequired` `RootElementSingleton` `PSC`  
  - Adapter：`PureFunction` `RootMapping` `SemanticNoChange` `TemplateToHostTree` `SemanticBridging`  
  - Template：`TemplateNoEvents` `TemplateNoControlFlow` `TemplateOutputBinding` `TemplateNoInlineStyle`  
  - Lifecycle：`ConnectedEnablesEvents` `ExplicitUpdateReRenders` `StyleRepaintNoRender` `AutoDisposeOnUnconnect`  
  - Event：`EventAPIs` `EventBindToRoot` `QueueBeforeConnect` `ImmediateAfterConnect`  
  - State：`StateAsFSM` `ExposeToOutput` `NoImplicitRenderOnSet`  
  - Props：`DefineInSetup` `WatchOnlyInSetup` `GetAnytimeAfterCreate`  
  - Context：`DIModel` `Provide/WatchTopLevel` `NearestAncestorWins`

---

## 5. 填写样例（片段）
> 供实现方参考如何填写 `impl/notes/evidence`。

| capability | impl | notes | evidence |
|---|---|---|---|
| TemplateNoEvents | YES | 模板解析阶段拦截 on* 属性并报错 | link:tests/template-no-events.spec.ts |
| SemanticBridging | NEAR | Web Component Context 以事件总线+ShadowRoot 实现 | link:rfc/host-web.md#context-bridge |
| HighFreqSignal | PARTIAL | `--*` 仅支持 number；不支持 struct | PR#123 |

---

## 变更记录
- 0.1.0 (2025-10-01): 初稿。定义评分体系、分模块清单与总表、PAL-Core 合规门控与示例填写。
