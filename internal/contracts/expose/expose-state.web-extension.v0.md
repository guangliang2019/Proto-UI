# Expose State Web Extension (v0)

> Status: Draft – v0
>
> Web extension maps expose-state to DOM `data-*` attributes and CSS variables. This is Web-only and does not change expose-state semantics.

---

## 0. Scope and Non-goals

- web mapping strategy
- name → attr/var rules
- lifecycle synchronization

Not included:

- write capability
- cross-platform guarantees

---

## 1. Default Mapping

### 1.1 Semantic name → DOM names

- `btn.disabled` → `data-btn-disabled` and `--pui-btn-disabled`
- rules: trim, `.`/spaces → `-`, non-alphanumeric → `-`, lowercase

### 1.2 Type-driven mapping

- enum/string → attr
- bool → attr (true: empty string, false: remove)
- number.discrete → attr + css var
- number.range → css var

---

## 2. Overrides (optional)

Via `EXPOSE_STATE_WEB_MODE_CAP`:

- `allowContinuousAttr`
- `allowStringVar`

---

## 3. Lifecycle

- subscription-driven sync
- cleanup on dispose

---

## 4. Minimum Tests

- bool/enum/string/number discrete/continuous mapping
- semantic name mapping rules
