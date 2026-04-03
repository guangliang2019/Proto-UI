# internal/contracts/anatomy/query-policy.v0.impl-notes.md

> Informal notes. Not normative. This document captures the current intended usage of anatomy query policies until a formal spec/contract text is written.

---

## 1) Core distinction

Anatomy query policies are not the same thing as context `try*`.

- `context.try*` expresses semantic optionality.
- anatomy query policies express how a caller wants missing-domain reads to behave.

So this:

- `run.context.tryRead(KEY)`

means:

- the upstream dependency may or may not exist by design

But this:

- `run.anatomy.partsOf(family, role, { missing: 'null' })`

means:

- the caller is choosing a tolerant structural query strategy
- not that the anatomy relationship is semantically optional

---

## 2) Default rule

Use strict anatomy queries by default.

That means:

- omit the `missing` option
- let invalid-domain reads fail loudly

This should be the normal choice for:

- interaction decisions
- required structure assumptions
- composition validation paths

---

## 3) Allowed tolerant cases

`missing: 'null'` or `missing: 'empty'` is currently considered compliant only for tolerant read sites such as:

- derived display data
- cached structural snapshots
- read-only synchronization that can wait for structure to become valid
- collection/order projections where temporary absence should degrade instead of crash

Practical examples:

- `asCollection`
- `asCollectionItem`
- other structure-derived read models that do not themselves decide interaction outcomes

---

## 4) Disallowed tolerant cases

Do not use tolerant anatomy queries to hide real structural requirements in:

- confirm / commit / submit decisions
- required focus transfer logic
- adapter or prototype behavior that is only meaningful when a valid family/domain exists
- places where silent fallback would mask an actual composition error

If the behavior is invalid without a valid anatomy domain, the query should remain strict.

---

## 5) Why this exists

The current system can expose transient windows where:

- an instance still exists
- but its valid anatomy domain is not currently resolvable

The query policy API exists so callers can explicitly choose whether that read site:

- must fail
- may return `null`
- may return `[]`

This is a query policy, not a protocol-level declaration that anatomy is optional.

---

## 6) Current recommendation for maintainers

When introducing anatomy reads:

1. First ask whether the structure is semantically required.
2. If yes, use strict reads.
3. If no, ask whether the read is only for derived or cached projection.
4. Only then consider `missing: 'null' | 'empty'`.

If the real need is semantic optionality rather than structural tolerance, that is a context question, not an anatomy question.
