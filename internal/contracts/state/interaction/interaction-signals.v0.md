# interaction-signals.v0.md

> Status: Draft – v0
>
> This contract specifies **interaction signals** in Proto UI v0: their semantic positioning, the defined signal set, lifecycle rules, and observability constraints.
>
> Interaction signals represent **system-level interaction facts**, rather than author-defined state or event callbacks.

---

## 0. Positioning Statement (core)

In Proto UI, an interaction signal is:

- Driven by the runtime / adapter based on host interactions
- A stable semantic fact (typically boolean or discrete)
- Observable by components and the rule system
- **Not directly writable or controllable by component authors**

The design goals of interaction signals are:

- To provide cross-host portable interaction semantics
- To serve as serializable inputs for declarative mechanisms such as `rule`
- To avoid treating non-serializable event callbacks as primary interaction representations

Interaction signals are **not**:

- Author-owned state
- Aliases or wrappers of events
- Mechanisms that automatically trigger rendering

---

## 1. Fundamental Properties

Each interaction signal has the following properties:

- **System ownership**  
  The signal value is maintained by the system, not by component authors.

- **Read-only observability**  
  Consumers may read or observe changes, but may not write to the signal.

- **Instance-scoped**  
  Signals are bound to the lifecycle of a component instance.

- **Resettable**  
  On instance unmount / dispose, signals MUST return to their default values.

---

## 2. Interaction Signal Set (v0)

v0 MUST provide at least the following interaction signals:

### 2.1 `focused: boolean`

#### Semantics

Indicates whether the component is currently in a “focused” state.

#### Default

- `false`

#### Enter conditions (illustrative)

- Host interaction indicates that the component gains focus

#### Exit conditions (illustrative)

- Host interaction indicates that the component loses focus

#### Consistency requirement (v0)

- After unmount / dispose, `focused` MUST NOT remain `true`

> Note: v0 does not mandate whether focus semantics are root-focus or focus-within. Adapters are free to choose a consistent policy.

---

### 2.2 `pressed: boolean`

#### Semantics

Indicates whether the component is currently in an active press / pointer interaction.

#### Default

- `false`

#### Enter conditions (illustrative)

- Host interaction indicates a pointer-down action targeting the component

#### Exit conditions (illustrative)

- Pointer release
- Interaction cancellation (cancel / capture loss / equivalent cases)

#### Consistency requirement (v0)

- Under any cancellation or unmount condition, `pressed` MUST return to `false`

---

## 3. Lifecycle Rules

The lifecycle of interaction signals is strictly bound to the component instance:

- Before instance creation, no observable interaction signals exist
- While the instance is alive, signal values may change in response to host interactions
- After instance unmount / dispose:
  - Signals MUST be reset to their default values
  - Signals MUST NOT emit further change notifications

---

## 4. Observability (v0 minimal commitment)

Interaction signals are **observable**, but v0 makes only minimal commitments:

- When a signal’s value **actually changes**, observers MAY be notified
- No guarantees are made regarding synchronous vs asynchronous delivery
- No guarantees are made regarding ordering among multiple observers

This contract does not define a concrete observation API shape; it only requires that signal changes are **system-observable**.

---

## 5. Relationship to Events

Interaction signals and events operate at different semantic levels:

- Events represent **instantaneous interaction occurrences**
- Interaction signals represent **persistent interaction facts**

Interaction signals may be driven by events, but events themselves are not interaction signals.

---

## 6. Relationship to State (important boundary)

Interaction signals are **not state**:

- They are not defined via `def.state.*`
- They do not provide Owned / Borrowed author-controlled views
- They are not writable by component authors

Interaction signals **may be projected into state-shaped views**, but such projection does not alter their system ownership.

The projection mechanism is specified by a separate contract (see related documents).

---

## 7. Non-goals (v0)

v0 explicitly does not define:

- Custom or user-defined interaction signals
- Complex gestures (drag / pinch / etc.)
- Extended numeric domains (pressure, coordinates, etc.)
- Automatic coupling between signals and render scheduling
- Adapter-specific event mapping strategies

---

## 8. Related Contracts (non-normative)

- Interaction → state projection: `interaction-state-projection.v0.md`
- State core and views: `state/*.v0.md`
- Rule consumption of interaction signals: `rule/*.v0.md`
- Adapter event models: `adapter/*`
