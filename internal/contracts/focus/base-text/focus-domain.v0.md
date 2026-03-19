# focus-domain.v0.md

> Status: Draft - v0
>
> This document defines the **focus domain** in Proto UI v0: its semantic position, internal layers, and relationship to event, state, expose, and privileged asHooks.

---

## 0. Positioning

Focus in Proto UI is:

- a **host-mediated interaction domain**
- not a primary information channel
- not reducible to a single channel such as `event` or `state`

Focus semantics may surface through:

- `event`: focus/blur-like occurrences
- interaction-derived `state`: focused/focusVisible/focusWithin-like facts
- `expose`: outward focus commands
- privileged asHooks: focus structure and focus governance

Proto UI therefore treats focus as a **system domain**, not as a first-level information channel.

---

## 1. Internal Layers

The focus domain is composed of four layers:

1. **Focus Facts**
   - persistent system-owned facts such as `focused` and `focusVisible`

2. **Focus Commands**
   - host-directed requests such as "request focus" or "restore focus"

3. **Focus Nodes**
   - instances that may participate as focus targets

4. **Focus Scopes**
   - local focus coordination boundaries responsible for entry, restore, trap, and local navigation

---

## 2. Ownership Boundary

Focus facts are **system-owned**:

- Component Authors may observe them
- Component Authors must not write them directly as author-owned state

Focus commands are **requests**, not direct state mutation:

- issuing a focus command does not itself prove focus has changed
- actual facts must come from host/runtime resolution

---

## 3. Primary Authoring Entry

The primary authoring entry for focus is:

- `asFocusable(...)`
- `asFocusScope(...)`

They are privileged asHooks because they:

- coordinate multiple subsystems
- require runtime/adapter participation
- carry structure-level semantics that ordinary authored asHooks cannot safely reproduce

---

## 4. Relationship to Other Systems

### 4.1 Event

- focus events describe occurrences
- they do not define long-lived focus truth on their own

### 4.2 State

- focus facts may be projected into interaction-derived state
- such state remains system-owned in semantics

### 4.3 Expose

- focus capabilities may be exposed outward
- expose is a projection surface, not the focus domain itself

### 4.4 Assembly

- assembly may later coordinate structurally related prototypes
- routine intra-scope navigation and scope-local target resolution should belong to the focus system itself whenever possible

---

## 5. Host Variance

v0 does not require a single universal host focus model.

In particular, v0 does not require:

- globally unique focus across all hosts
- identical focus granularity across adapters
- a single implementation strategy such as DOM roving tabindex

Adapters must preserve **internal consistency** for the focus semantics they implement.

---

## 6. v0 Design Principle

The focus system should prefer:

- explicit structure membership
- deterministic setup-time configuration
- scope-local default navigation
- minimal public API surface

The focus system should avoid:

- manual author scripting for routine intra-scope navigation
- arbitrary cross-instance querying
- conflating focus governance with generic context distribution
