---
title: 'asHook'
description: 'A reusable logic unit for Proto UI prototypes'
---

`asHook` is a reusable logic unit in Proto UI.  
It is not an interaction subject by itself. Instead, it is attached to a prototype to reuse behavior such as button semantics, toggle semantics, or open-state logic.

As compound prototypes evolve, an `asHook` may also be built on top of existing protocol capabilities. For example:

- `anatomy.order` provides an ordered host view for parts in the same family
- `asCollection()` and `asCollectionItem()` build a minimal collection interaction layer on top of that ordered view

This is important for Proto UI's layering:

- `anatomy.order` remains an enhancement of structural capability
- `asCollection` remains reusable behavior built on top of that capability

In other words, Proto UI does not need to introduce a new top-level `collection` runtime concept first. A higher-level semantic layer can still grow through `asHook` composition.
