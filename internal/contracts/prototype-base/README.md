# Base Prototype Contracts

This directory stores component-level contracts for the base prototype library.

These contracts are distinct from runtime/module contracts:

- runtime/module contracts define shared platform semantics
- base prototype contracts define the protocol surface of one concrete component family

Unless stated otherwise, a base component contract applies to both:

- the directly consumable base prototype such as `base-button`
- the equivalent composable `asHook` form such as `asButton`

The two forms are treated as one protocol with different authoring entry points.
