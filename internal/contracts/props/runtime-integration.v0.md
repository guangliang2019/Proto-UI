# Runtime Props Integration Contract (v0)

This document defines v0 behavioral contract for props integration at runtime layer
(i.e., execute engine + controller APIs), beyond module-props internal semantics.

---

## PROP-RT-0000 Scope

Covers:

- hydration behavior (first raw application does not dispatch watchers)
- controller.applyRawProps(...) behavior boundary
- watcher dispatch ordering across raw/resolved groups
- Handle Wiring requirement in watcher callbacks (PROP-V0-2110)

Does not cover:

- adapter-specific raw props production (attr/property mapping, etc.)
- rendering scheduling policies beyond "no implicit commit on applyRawProps"

---

## PROP-RT-0100 Hydration Does Not Dispatch Watchers

During initial hydration (the first raw props application after runtime creation):

- resolved watchers do not fire
- raw watchers do not fire

This applies even if initial raw props differ from defaults.

---

## PROP-RT-0200 Handle Wiring in Watcher Callbacks (PROP-V0-2110)

In any props watcher callback (resolved or raw), the `run` argument MUST provide:

- run.props.get()
- run.props.getRaw()
- run.props.isProvided(key)

Behavioral alignment within a single callback:

- In resolved watcher `cb(run, next, prev, info)`:

  - run.props.get() is behaviorally equivalent to `next`

- In raw watcher `cb(run, nextRaw, prevRaw, info)`:
  - run.props.getRaw() is behaviorally equivalent to `nextRaw`

Implementations may or may not preserve object identity.

---

## PROP-RT-0300 Watcher Dispatch Order

On a watcher-firing raw application (e.g., controller.applyRawProps):

1. raw watchers are evaluated and may fire
   - rawAll before raw(keys)
   - registration order preserved within each group
2. resolved watchers are evaluated and may fire
   - watchAll before watch(keys)
   - registration order preserved within each group

---

## PROP-RT-0400 applyRawProps Does Not Implicitly Commit/Render

Calling controller.applyRawProps(nextRaw):

- MAY dispatch watcher callbacks (subject to resolved/raw diff semantics)
- MUST NOT perform a host commit / render by itself

Rendering is triggered only by explicit update scheduling policies
(e.g., run.update() or adapter-specific update()).

---
