## Trace Map（v0）

本 Trace Map 用于追踪 **Template 相关契约条款** 在代码与测试中的落点，确保协议语义具备可执行、可验证的实现基础。

### 目的

- 防止契约成为“仅供阅读的说明文档”
- 为 adapter / compiler 实现者提供**可对齐的最小验证集合**
- 支持后续版本（v1+）在不破坏 v0 语义的前提下演进

---

## Core / Template（v0）

### Template Normalize（v0）

**契约文档**

- `internal/contracts/template/normalize.v0.md`

**实现**

- `packages/core/src/template.ts`
  - `normalizeChildren`
  - `DEFAULT_NORMALIZE`

**测试（Contract-level）**

- `packages/core/test/contracts/template.normalize.v0.contract.test.ts`
- 覆盖用例定义：
  - `packages/core/test/cases/normalize.v0.cases.ts`

**验证要点**

- `undefined` → canonical `null`
- 默认 deep flatten
- `null` 过滤（`keepNull=false`）
- boolean / undefined child 必须 throw
- v0 边界：不校验 TemplateNode 对象形态

---

### Template Slot（Protocol Constraint, v0）

**契约文档**

- `internal/contracts/template/slot.v0.md`

**实现（Core）**

- `packages/core/src/template.ts`
  - `createRendererPrimitives().r.slot()`

**实现（Adapter：Web Component）**

- `packages/adapters/web-component/src/commit.ts`
  - slot shadow / light DOM 行为
  - slot 防御性校验（多 slot / 非匿名）

**测试（Contract-level）**

- Core：
  - `packages/core/test/contracts/template.slot.v0.contract.test.ts`

- Adapter（Web Component）：
  - `packages/adapters/web-component/test/contract/template.slot.protocol.v0.contract.test.ts`
  - `packages/adapters/web-component/test/contract/slot-light-dom.v0.contract.test.ts`

**验证要点**

- slot 必须匿名（`r.slot()` 不接受参数）
- 单一 template 中最多一个 slot
- shadow DOM → `<slot>`
- light DOM → 投影，不生成 `<slot>` 节点
- update / MutationObserver 不得重复或丢失投影子节点

---

### Renderer Primitives（Template Authoring API, v0）

**契约文档**

- （当前隐含于 Template / Normalize / Slot 契约，v0 未单独拆文档）

**实现**

- `packages/core/src/template.ts`
  - `createRendererPrimitives`
  - `el(type, props?, children?)`

**测试（Contract-level）**

- `packages/core/test/contracts/template.renderer-primitives.v0.contract.test.ts`

**验证要点**

- `el(type, {})` 识别为空 TemplateProps，`children === null`
- `el()` 内部必须使用默认 normalize 策略
- 非法 TemplateProps（非法 key / 非 TemplateStyleHandle）必须 throw

---

## Adapter / Template Consumption（v0）

### No Prototype-Level Composition（v0）

**契约文档**

- `internal/contracts/template/no-prototype-composition.v0.md`

**实现（Adapter：Web Component）**

- `packages/adapters/web-component/src/commit.ts`
  - `createElementForType`
  - `ERR_TEMPLATE_PROTOTYPE_REF_V0`

**测试（Contract-level）**

- `packages/adapters/web-component/test/contract/template.no-prototype-composition.v0.contract.test.ts`

**验证要点**

- 当 `TemplateNode.type` 为 `PrototypeRef` 时，adapter **必须抛出指定错误**
- 不允许任何形式的 prototype-level composition

---

## 备注

- 本 Trace Map **不保证**覆盖 adapter 的 patch / diff / lifecycle 细节（非 Template 契约范围）。
- Frameworks built on top of Proto UI（如 React/Vue binding）：
  - 可以提供更丰富的 authoring 体验
  - 但 **必须可编译为本 Trace Map 所覆盖的 v0 语义子集**
