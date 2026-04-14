# Proto UI Package Surface Map

> Internal governance reference. This document explains the intended role of each major Proto UI package layer, who it is for, and how contributors and maintainers should reason about package boundaries when extending the system.

---

## 1. Purpose

Proto UI contains multiple package layers that serve different users and different kinds of engineering work.

This document exists to help contributors and maintainers answer:

- what each package layer is for
- who should directly consume it
- which layers are public entry points versus architecture support layers
- how prototype work, adapter work, and core-extension work should be routed

This document is primarily for:

- contributors
- maintainers
- `Prototype Author`
- `Adapter Author`

It complements, but does not replace:

- package-level READMEs
- architectural records
- launch package governance

---

## 2. Reader Model

Different Proto UI package layers exist for different users.

For practical decision-making, use these user groups:

- `Maker`: wants to consume Proto UI components or generated components
- `Prototype Author`: writes or extends prototypes
- `Adapter Author`: writes or extends adapters
- contributor / maintainer: changes architecture, contracts, runtime, or package boundaries

The same person may play multiple roles, but the package system should still be described by its intended primary consumers.

---

## 3. The Layer Model

Proto UI package surfaces can be understood as the following stack:

1. concept and contract layers
2. authoring layers
3. runtime and adapter-construction layers
4. host-specific adapter layers
5. prototype-library layers
6. module capability layers

These layers are related, but they do not serve the same audience.

---

## 4. Concept And Contract Layers

### 4.1 `@proto.ui/core`

`@proto.ui/core` defines core Proto UI concepts, function signatures, API shapes, and internal SPI shapes.

Its center of gravity is:

- definition
- vocabulary
- core semantics

not:

- heavy implementation
- host behavior
- end-user ergonomics

Primary audience:

- `Prototype Author`
- `Adapter Author`
- contributors
- maintainers

Use `@proto.ui/core` when the work is about:

- defining core concepts
- adjusting API contracts
- extending SPI expectations

Do **not** treat it as a general first-user entry package.

### 4.2 `@proto.ui/types`

`@proto.ui/types` aggregates shared public types and protocol-oriented type descriptions.

It exists to make shared semantics reusable without introducing runtime coupling.

Primary audience:

- contributors
- maintainers
- authors who need protocol-level types

Use it when:

- a package needs shared types only
- JavaScript runtime code should not be pulled in

---

## 5. Authoring Layers

### 5.1 `@proto.ui/hooks`

`@proto.ui/hooks` is a mixed authoring-facing layer.

It allows top-level authoring syntax and lower-level capability ports to coexist in shapes that are close to the `asHook` mental model.

It does not provide implementation by itself.

Instead, it serves as a bridge between:

- author-facing syntax
- lower-level capability ports
- runtime-backed implementation later in the stack

Primary audience:

- `Prototype Author`
- contributors extending authoring surfaces

Use `@proto.ui/hooks` when:

- shaping author-facing capability syntax
- defining the contract of a privileged `asHook`
- exposing a lower-level port in an author-friendly form

If work changes only host implementation mechanics, it probably does not belong here.

---

## 6. Runtime And Adapter-Construction Layers

### 6.1 `@proto.ui/runtime`

`@proto.ui/runtime` implements orchestration logic and realizes core API and SPI behavior.

It is the implementation aggregation layer for Proto UI's generic runtime philosophy, but it still does not talk directly to concrete hosts.

Its role is:

- orchestration
- internal realization of semantics
- adapter-facing capability assembly

Primary audience:

- contributors
- maintainers

Normal direct consumer:

- `@proto.ui/adapter-base`

As a rule of thumb, if another package wants to depend directly on `@proto.ui/runtime`, that should be treated as unusual and justified explicitly.

### 6.2 `@proto.ui/adapter-base`

`@proto.ui/adapter-base` is the facade and template layer for adapter authoring.

It packages runtime-backed capabilities into a structure that is easier for `Adapter Author` work.

Its role is:

- adapter construction template
- adapter wiring guidance
- runtime-to-adapter facade

Primary audience:

- `Adapter Author`
- contributors working on adapter structure

Concrete adapters should normally be built on this layer rather than reaching past it.

---

## 7. Host-Specific Adapter Layers

### 7.1 `@proto.ui/adapter-react`

Translates Proto UI prototypes into React components.

Primary audience:

- `Maker`
- `Prototype Author` validating React output

### 7.2 `@proto.ui/adapter-vue`

Translates Proto UI prototypes into Vue components.

Primary audience:

- `Maker`
- `Prototype Author` validating Vue output

### 7.3 `@proto.ui/adapter-web-component`

Translates Proto UI prototypes into Web Components.

Primary audience:

- `Maker`
- `Prototype Author` validating Web output

For all host-specific adapters, the key contributor question is:

"Which module capabilities does this adapter choose to support, and how faithfully can the host express them?"

That question is usually more important than superficial API shape alone.

---

## 8. Prototype-Library Layers

### 8.1 `@proto.ui/prototypes-base`

`@proto.ui/prototypes-base` is the official foundational prototype library.

It plays two roles at once:

- it is directly usable by `Maker`
- it is the recommended inheritance base for richer styled libraries

It should be treated as the main headless foundation rather than as an optional demo library.

Primary audience:

- `Maker`
- `Prototype Author`

### 8.2 `@proto.ui/prototypes-shadcn`

`@proto.ui/prototypes-shadcn` is a styled prototype library built on top of the base library.

It exists to demonstrate and support practical styled usage without replacing the base library as the underlying interaction foundation.

Primary audience:

- `Maker`
- `Prototype Author`

Contributors should treat base inheritance and behavior fidelity as more important than short-term styling convenience.

---

## 9. Module Capability Layers

### 9.1 `@proto.ui/module-base`

`@proto.ui/module-base` is the common root of all module packages.

It defines the shared structural expectations of the module system.

Module packages are not generic end-user packages.

They are capability units mainly consumed by:

- `@proto.ui/adapter-base`
- concrete adapters

The most important adapter-design question is not "Can I import every module?"

It is:

"Which modules are necessary, recommended, optional, or unsupported for this host?"

### 9.2 Individual `@proto.ui/module-*` packages

Each module package represents a capability family.

Examples include:

- state
- props
- event
- feedback
- focus
- overlay
- rule
- expose
- boundary

These packages should usually be understood as:

- host-capability contracts
- adapter wiring units
- capability boundaries for the Proto UI architecture

They are mainly for:

- `Adapter Author`
- contributors extending capability families
- maintainers evolving the architecture

They are usually **not** the correct default surface for `Maker`.

### 9.3 Optional And Recommended Modules

Not every module has the same status.

Some are effectively required to make Proto UI meaningful in a host.

Some are recommended.

Some are optional and should only be supported when the host can express them faithfully.

This distinction matters because adapter quality is shaped not only by what it supports, but also by what it refuses to pretend to support.

---

## 10. How To Route Common Types Of Work

### 10.1 Writing or extending a prototype

The usual center of gravity is:

- `@proto.ui/prototypes-base` or another prototype library
- `@proto.ui/hooks`
- `@proto.ui/core`

Only touch module, runtime, or adapter internals when the prototype work actually exposes a missing architectural capability.

### 10.2 Writing or extending an adapter

The usual center of gravity is:

- `@proto.ui/adapter-base`
- a concrete adapter package
- selected `@proto.ui/module-*` packages

Only depend directly on `@proto.ui/runtime` when there is a clear architectural reason.

### 10.3 Adding a new privileged `asHook`

This kind of work typically crosses multiple layers:

- `@proto.ui/core`
- `@proto.ui/hooks`
- one or more `@proto.ui/module-*` packages
- possibly `@proto.ui/adapter-base`
- concrete adapters if host support is required

If a new privileged `asHook` cannot be explained in terms of a clear capability boundary, its shape is probably not ready yet.

### 10.4 Extending core API or SPI

The usual center of gravity is:

- `@proto.ui/core`
- `@proto.ui/types`
- `@proto.ui/runtime`

And often also:

- `@proto.ui/hooks`
- `@proto.ui/adapter-base`

These changes should be treated as architecture work first, not as local package edits.

---

## 11. Dependency Guidance

Use the following default dependency expectations.

- `Maker` should mostly meet Proto UI through adapters and prototype libraries
- `Prototype Author` should mostly work through prototype libraries, hooks, and core surfaces
- `Adapter Author` should mostly work through adapter-base and module packages
- `@proto.ui/runtime` should normally sit behind `@proto.ui/adapter-base`
- `@proto.ui/module-*` packages should usually be consumed by adapters, not by ordinary product code

If a dependency crosses too many layers downward, treat that as a design smell worth reviewing.

---

## 12. Non-Goals

This document does not:

- replace package READMEs
- freeze every dependency rule forever
- fully document every single package detail

Its goal is to provide a stable orientation map for contributors and maintainers.

---

## 13. Summary

Proto UI package layers are intentionally different in audience and purpose:

- `core` and `types` define shared concepts
- `hooks` shape author-facing capability syntax
- `runtime` realizes generic orchestration
- `adapter-base` structures adapter authoring
- concrete adapters expose host-specific consumption surfaces
- prototype libraries expose reusable component behavior
- module packages define capability families and adapter wiring boundaries

When in doubt, contributors should ask:

- who is the direct user of this package
- which layer should own this responsibility
- whether the dependency direction still matches the intended architecture
