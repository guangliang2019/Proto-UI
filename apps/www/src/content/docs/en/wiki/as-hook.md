---
title: 'asHook'
description: 'A reusable logic unit for Proto UI prototypes'
---

`asHook` is a reusable logic unit in Proto UI.  
It is not an interaction subject by itself. Instead, it is attached to a prototype to reuse behavior such as button semantics, toggle semantics, or open-state logic.

As compound prototypes evolve, an `asHook` may also be built on top of existing protocol capabilities. For example:

- `anatomy.order` provides an ordered host view for parts in the same family
- `asCollection()` and `asCollectionItem()` build ordered collection structure semantics on top of that view

This is important for Proto UI's layering:

- `anatomy.order` remains an enhancement of structural capability
- `asCollection` remains a reusable structure hook built on top of that capability

That boundary matters: `asCollection` should answer who belongs to the ordered set and what each item's structural position is. It should not own roving focus, active item policy, or selection.

In other words, Proto UI does not need to introduce a new top-level `collection` runtime concept first. A higher-level semantic layer can still grow through `asHook` composition.
