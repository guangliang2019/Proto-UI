# Template Node Fundamentals (Template / Template Node v0)

This contract defines what the nodes produced by Proto UI’s template syntax (the renderer) are, what they are able to express, and how they relate to the **Root Node / host root container**.

> **Scope**
>
> - The conceptual role and minimal capability boundaries of Template Nodes
> - The boundary and composition relationship between Root Nodes (host root containers) and Template Nodes
> - The base node types and special node entries (slot) required in v0
> - How template return values are consumed by adapters (structure only; patch/commit details excluded)
>
> **Non-goals**
>
> - Defining the concrete field shape (object structure) of TemplateNode
> - Defining adapter diff/patch strategies or lifecycle implementations
> - Defining concrete APIs for props/state/event/feedback (covered by their respective module contracts)
> - Expanding the full set of node types (v0 requires only a minimal set)

---

## 1. Conceptual Positioning

### 1.1 What Is a Template Node?

A Template Node is a **structural node unit produced by Proto UI’s template syntax**, used to describe a component’s internal structure—namely, **the subtree that should be rendered inside the Root Node**.

In different host environments, a Template Node may map to different concepts:

- **React**: typically corresponds to a `ReactNode` (not a Fiber node, and not necessarily a DOM node)
- **Vue**: closer to a `VNode`
- **Web Component / Vanilla JS**: typically a DOM Node
- **Flutter**: closer to a `Widget` (or a composable widget subtree)

Proto UI does **not** mandate which concrete host object an adapter must use as the physical carrier of a Template Node. The only requirement is that it can stably express structure and be deterministically consumed by later stages.

---

## 2. Root Node (Host Root Container) and Template Nodes

### 2.1 What Is the Root Node?

The Root Node is the **component root container that necessarily exists** once a Prototype is adapted to a host environment.

It serves as the carrier of component-level channels, for example:

- Carrying styles / feedback (e.g. style injection points from the feedback module)
- Acting as the anchor for event, state, and exposed APIs (as defined by their respective contracts)
- Acting as the mounting container for structural rendering (the container of Template Children)

In the adapter-web-component implementation, the Root Node typically corresponds to:

- **Light DOM mode**: the custom element itself (e.g. `<component-name>`)
- **Shadow DOM mode**: the custom element plus its `shadowRoot` as the internal mounting container

> **Key boundary**: The Root Node is part of the final output artifact, but it is **not** part of the node sequence returned by the template syntax.

---

### 2.2 What Does the Template Return?

The return value of a Prototype’s render function (constructed via `renderer.el`, `renderer.slot`, etc.) describes:

> **The children (structural subtree) that should be rendered _inside_ the Root Node**

Therefore:

- The template **does not declare the Root Node**
- The outermost node returned by the template (e.g. `r.el('div', ...)`) **is not the Root Node**
- The Root Node is created and guaranteed by the adapter/host; the template only provides its contents

This matches common testing patterns such as:

- `const root = el.shadowRoot ?? el;`
- `root.innerHTML` reflecting only the contents of the Root Node’s internal container, not the Root Node element itself

---

### 2.3 Root Nodes and Template Nodes Are Not Interchangeable

Root Nodes and Template Nodes are entities at **different layers with different responsibilities**:

- **Root Node**: component-level root container, carrying channels and acting as a mounting anchor
- **Template Node**: structural node used to describe the subtree inside the Root Node

Semantically:

- A Template Node **cannot** be “upgraded” into a Root Node, either at authoring time or at runtime
- A Root Node **never** appears as a Template Node in the template return value

If a developer needs to introduce **a new component root container** (a new Root Node), the only valid approach is:

> Define a new Prototype, and use that Prototype within the template (the adapter/host will then produce a new Root Node accordingly).

---

## 3. Capability Boundaries of Template Nodes (v0)

When a node is a Template Node (i.e. produced by the template syntax), it should be treated purely as a structural node, with the following minimal capability boundaries:

- It can participate in tree composition (it may have children)
- It can carry style-related expressions (in a form accepted by the host)

In v0, Template Nodes are **not required** to directly carry component-level channels. Anchors for props/state/event/expose/feedback channels are provided by the Root Node, as defined in their respective contracts.

---

## 4. Node Types (v0)

### 4.1 Base Node Types

In v0, Proto UI requires support for only a **minimal base node type set**, sufficient to make the template system usable and testable.

- Currently required minimal type: `'div'` (as a base container node identifier)
- v0 does not require support for additional types

> Note: `'div'` here represents a _base container node identifier_. In a Web host it typically maps to `HTMLDivElement`; in non-Web hosts it may map to an equivalent container concept.

---

### 4.2 Special Nodes: Slot

Some special nodes are not declared via base node types, but are produced through dedicated renderer entry points, for example:

- `renderer.slot()` (or equivalent)

The concrete semantics and constraints of slot nodes are defined in separate contracts. Within this contract, they are simply treated as a valid form of Template Node output.

---

## 5. Basic Template Authoring and Structural Illustration

A Prototype typically returns a `TemplateChildren` value (a single node, an array, or `null`), which the adapter renders into the Root Node’s internal container.

Example (conceptual):

```ts
const P: Prototype = {
  name: 'x-basic',
  setup() {
    return (r) => [r.el('div', 'hello')];
  },
};
```

### 5.1 Expected Final Structure (Light DOM, Web Component)

When the adapter uses light DOM (`shadow = false` or shadow not enabled), the final structure can be illustrated as:

```html
<x-basic>
  <div>hello</div>
</x-basic>
```

---

### 5.2 Expected Final Structure (Array Expansion)

Example:

```ts
const P: Prototype = {
  name: 'x-array',
  setup() {
    return (r) => [r.el('div', 'a'), r.el('div', 'b')];
  },
};
```

Expected final structure:

```html
<x-array>
  <div>a</div>
  <div>b</div>
</x-array>
```

---

## 6. Relationship to Other Contracts

- Syntax shape constraints and flattening rules for `TemplateChildren` are defined in **Template Normalize (v0)**
- Slot semantics and limitations are defined in separate slot-related contracts
- Channel capabilities carried by the Root Node are defined by the props/state/event/feedback/expose module contracts
- Adapter commit/patch behavior is outside the scope of this contract

---

## 7. Trace Map (Recommended to Keep Updated)

- Reference tests (Web Component adapter):
  - `packages/adapters/web-component/test/commit.test.ts` (basic / array expansion / slot)

- Related contracts:
  - `internal/contracts/template/normalize.v0.md` (Template Normalize v0)
  - `internal/contracts/adapter-web-component/slot-light-dom.v0.md`
