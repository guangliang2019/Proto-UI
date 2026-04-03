---
title: 'Anatomy'
description: 'Roles and structural relations inside a compound prototype family'
---

`anatomy` describes stable roles and relations inside a compound prototype family, such as `root`, `trigger`, and `content`.

It answers structural questions like:

- which parts belong to the same family
- which role each part claims
- which roles may contain other roles

It does not, by itself, define business collection semantics.

## `anatomy.order`

Some compound interactions need more than role membership. They also need an ordered host view:

- which item comes before or after the current one
- what index the current item occupies among peers
- whether the effective host order has changed

Proto UI handles this as an enhancement under `anatomy`, not as a new top-level `collection` runtime concept. `anatomy.order` is that ordered host view.

It provides:

- ordered queries such as `partsOf()`, `indexOfSelf()`, `prevOfSelf()`, `nextOfSelf()`
- an internal order-change signal via `version()`

This keeps the layering explicit:

- `anatomy` defines family membership and structural relations
- `anatomy.order` projects those parts into an ordered host view
- higher-level hooks may build collection behavior on top of that view

## What it does not do

`anatomy.order` is still not a full collection model. It does not define:

- selection state
- item business metadata
- roving focus policy
- keyboard paging policy

Those belong to higher-level hooks such as `asCollection()`, not to anatomy itself.
