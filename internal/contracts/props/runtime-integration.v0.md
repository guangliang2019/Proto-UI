# Runtime Props Integration Contract (v0)

This document defines the v0 runtime-layer contract for props integration (execute engine + controller APIs).

---

## 1. Scope

Covers:

- hydration behavior (first raw application does not dispatch watchers)
- `controller.applyRawProps(...)` boundaries
- watcher dispatch order across raw/resolved groups
- RunHandle wiring in watcher callbacks (PROP-V0-2110)

Does not cover:

- adapter-specific raw props production
- render scheduling policies beyond “no implicit commit on applyRawProps”

---

## 2. Hydration Does Not Dispatch Watchers

During initial hydration (first raw application after runtime creation):

- resolved watchers do not fire
- raw watchers do not fire

---

## 3. RunHandle Wiring in Watcher Callbacks (PROP-V0-2110)

In any props watcher callback, `run` must provide:

- `run.props.get()`
- `run.props.getRaw()`
- `run.props.isProvided(key)`

Behavioral alignment:

- resolved watcher: `run.props.get()` is behaviorally equivalent to `next`
- raw watcher: `run.props.getRaw()` is behaviorally equivalent to `nextRaw`

---

## 4. Watcher Dispatch Order

On a watcher-firing raw application:

1. raw watchers (rawAll → raw(keys), registration order preserved)
2. resolved watchers (watchAll → watch(keys), registration order preserved)

---

## 5. applyRawProps Does Not Implicitly Commit/Render

Calling `controller.applyRawProps(nextRaw)`:

- may dispatch watcher callbacks
- must NOT perform host commit/render

Rendering is triggered only by explicit update mechanisms (e.g. `run.update()` or adapter-specific update).
