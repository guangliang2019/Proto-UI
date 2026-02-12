# Adapter Lifecycle Contract (v0)

This document defines the **obligations and constraints for Adapter Authors**
(Web Components, React, Vue, etc.).

It specifies how host-specific lifecycles MUST be mapped
into Proto UI’s canonical lifecycle timeline.

This document is **normative**.

---

## Canonical Timeline

Proto UI defines a single canonical lifecycle timeline,
refined by **checkpoints (CP)**.

Adapters MUST map host behavior into this timeline.
Adapters MUST NOT introduce parallel or competing lifecycle models.

---

## Checkpoints

### CP0 — Setup Exit

- `proto.setup(def)` has returned.
- No lifecycle callbacks have run yet.

**Domain mapping**

- At CP0:
  - `__sys.domain()` MUST switch from `"setup"` to `"runtime"`.

---

### CP1 — Created Callbacks

- All `created` callbacks are executed.

---

### CP2 — Logical Tree Ready

- Render function has executed.
- Logical render tree is complete.

---

### CP3 — Commit Start

- Host commit process begins.

---

### CP4 — Commit Done

- DOM / host tree is fully committed.
- Effects depending on committed output may be enabled.

---

### CP5 — Mounted Callbacks

- All `mounted` callbacks are executed.
- Component is now considered fully active.

---

### CP6 — Update Render

- Render triggered by update.

---

### CP7 — Update Commit

- Commit triggered by update.

---

### CP8 — Updated Callbacks

- All `updated` callbacks are executed.

---

### CP9 — Unmount Begin

- Component is being disconnected / unmounted.
- `unmounted` callbacks are about to run.

**Availability guarantees**

- All module facades and handles MUST remain usable.
- `__sys.isDisposed()` MUST be `false`.

---

### CP10 — Dispose Complete

- Component instance is fully disposed.
- All module resources are released.

**Disposal guarantees**

- At CP10:
  - `__sys.isDisposed()` MUST become `true`.
- After CP10:
  - Any access to module facades or handles guarded by `__sys`
    MUST throw.

---

## Mandatory Rules

1. Adapters MUST preserve checkpoint ordering.
2. Adapters MUST NOT reorder callbacks relative to checkpoints.
3. Adapters MUST NOT dispose modules before CP10.
4. Adapters MUST ensure CP9 callbacks (`unmounted`) run
   before disposal.
5. Adapters MUST correctly toggle `__sys.domain()` and
   `__sys.isDisposed()` at CP0 and CP10 respectively.

Violations of these rules are considered adapter bugs.

---

## Error Handling

Adapters MUST surface lifecycle violations as runtime errors.
Silent failure or partial execution is forbidden.

---

## Versioning

- Version: **v0**
- v0 defines ordering, checkpoints, and guard mappings.
- Future versions may add checkpoints but MUST NOT break v0 semantics.
