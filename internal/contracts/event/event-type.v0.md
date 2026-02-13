# Event Types Contract (v0)

> **Status**: Draft – implementation-ready  
> **Version**: v0
>
> This document defines the **Proto UI event type system (EventTypeV0)**, including semantic layering, interpretation responsibilities, and adapter constraints.
>
> This document is **normative**.

---

## 0. Design Goals & Philosophical Premises

Proto UI’s event system is **not** an abstraction of any single platform (e.g. the Web), but a protocol-level model of **human–computer interaction (HCI) intent and state transitions**.

Therefore:

- Proto UI event types are **not a DOM Event mapping table**
- They are **not device enumerations** (mouse / keyboard / touch)
- They form a **layered, interpretable semantic protocol**

Event types are explicitly divided into **three levels**:

1. **Protocol Core Events**  
   Abstract, host-agnostic interaction intent semantics
2. **Interaction Medium Events (Optional)**  
   Medium-specific but still framework-independent events
3. **Host-Level Events (Extension)**  
   Host-bound escape hatches without cross-host guarantees

---

## 1. Event Type Layering Overview

### 1.1 EventTypeV0 Union (Normative Definition)

```ts
type EventTypeV0 = CoreEventType | OptionalEventType | ExtensionEventType;
```

---

## 2. Protocol Core Events (CoreEventType)

### 2.1 Definition & Positioning

**Protocol core events** operate at the most fundamental HCI level:

- Independent of concrete devices
- Independent of specific hosts or platforms
- Independent of UI frameworks
- Modeling **the lifecycle of user intent**

These events have the **highest abstraction level** and are the ones Proto UI aims to keep **maximally stable over time**.

---

### 2.2 Press Event Family — Activation Intent

“Press” does **not** mean “mouse click” or “touch tap”. It represents the **user’s intent to activate an interaction target** and the evolution of that intent.

#### 2.2.1 Event Set

```ts
'press.start';
'press.end';
'press.cancel';
'press.commit';
```

#### 2.2.2 Semantic Definitions (Normative)

- **`press.start`** Activation intent begins. The user explicitly starts an activation action on a target.

- **`press.end`** Activation intent ends. The activation action is released, regardless of success.

- **`press.commit`** Activation intent is confirmed. A **valid activation** has been completed.

- **`press.cancel`** Activation intent is canceled. The activation process is aborted and MUST NOT be treated as successful.

#### 2.2.3 Interpretation Responsibility (Normative)

- Proto UI does **not** prescribe how these events are produced on any host.
- Adapters **MUST** interpret and map host-level input into these semantics.
- Multiple interaction media within the same host MAY share these core events.

#### 2.2.4 Examples (Non-normative)

- Pointer devices:
  - `press.start` → pointerdown
  - `press.commit` → pointerup on the same target
  - `press.cancel` → pointerup on a different target

- Keyboard input:
  - `press.start` → keydown
  - `press.commit` → keyup
  - `press.cancel` → host-defined (e.g. focus loss)

---

### 2.3 Key Event Family — Input Activation

```ts
'key.down';
'key.up';
```

#### Semantic Notes

Key events represent **activation and release of an input channel**:

- Not limited to physical keyboards
- May represent buttons, accessibility devices, or abstract inputs
- Key value enumeration is **intentionally coarse in v0**
- Adapters define how host input systems are mapped

---

## 3. Interaction Medium Events (OptionalEventType)

### 3.1 Definition & Positioning

Interaction medium events:

- Refer to a specific interaction medium (pointer, text, navigation)
- Still remain **framework-agnostic**
- Bridge the gap between abstract Core events and concrete Host events

These events:

- Are **not mandatory** for adapters to support
- But once supported, **MUST follow their semantic contract**

---

### 3.2 Pointer Event Family

```ts
'pointer.down';
'pointer.move';
'pointer.up';
'pointer.cancel';
'pointer.enter';
'pointer.leave';
```

- Describe spatial interaction via pointer-like devices
- May be directly mapped from Web Pointer Events
- Or synthesized by other host input systems

---

### 3.3 Focus & Text Events

```ts
'nav.focus';
'nav.blur';
'text.focus';
'text.blur';
'input';
'change';
'context.menu';
```

- `nav.*`: navigation focus (non-text interaction)
- `text.*`: text input focus
- `input` / `change`: value mutation semantics
- `context.menu`: context menu intent

---

## 4. Host-Level Events (ExtensionEventType)

### 4.1 Definition

```ts
type ExtensionEventType = `native:${string}` | `host.${string}`;
```

### 4.2 Semantic Positioning

Host-level events explicitly mean:

> **Cross-host semantics are abandoned in exchange for direct host access**

Characteristics:

- Proto UI provides **no semantic interpretation**
- Cross-platform consistency is **not guaranteed**
- Lifecycle and invocation ordering **are still guaranteed**

---

### 4.3 Naming Rules (Normative)

- `native:*`
  - Direct mapping to host-native event names
  - e.g. `native:click`, `native:keydown`

- `host.*`
  - Host-defined higher-level events
  - e.g. `host.dragStart`, `host.viewResize`

---

### 4.4 Adapter Responsibility

- Adapters **MUST** bind Host-level events directly to host-native events
- Adapters **MUST NOT** reinterpret their semantics
- Adapters **MUST NOT** mix them into Core or Optional event systems

---

## 5. Validity Rules (Normative)

Implementations **MUST reject**:

- Non-string event types
- Empty strings
- Event names that do not satisfy at least one of:
  - Belongs to `CoreEventType`
  - Belongs to `OptionalEventType`
  - Matches `native:*`
  - Matches `host.*`

---

## 6. Evolution Policy (v0 Constraints)

- v0 **MUST NOT** remove or redefine existing Core events
- v0 MAY:
  - Add Optional events
  - Add Host-level events

- Any semantic change to Core events **MUST require a new contract version**

---

## 7. Relation to Event Contract

- This document defines **event type semantics and layering**
- `event.v0.md` defines **registration, binding, lifecycle, and invocation rules**
- Together they form the complete Proto UI Event contract for v0

---

## Appendix A: Design Principles (Informative)

- Core events model **intent state machines in HCI**
- Optional events express **interaction-medium semantics**
- Host events are a deliberate **escape hatch**
- Component Authors **SHOULD NOT** reason about event interpretation
- Adapters **MUST** own semantic mapping responsibilities
