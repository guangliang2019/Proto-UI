---
title: 'Why Proto UI'
desp: 'What problem it solves, and when it is worth using'
description: 'What problem it solves, and when it is worth using'
---

## The purpose of this article

This is not an introduction to what Proto UI is. It answers a more practical question:

> Is your problem worth solving in the Proto UI way?

---

## A pattern you may already be used to, but one that is expensive

Many teams do not have a truly unified stack.

You may be dealing with:

- older systems that still run stably, such as Vue 2 or older React
- new projects, such as Vue 3 or React 18
- constrained environments, such as mini programs, Tauri, or embedded WebViews

There is nothing wrong with these systems. They are simply **not compatible with one another**.

The problem usually starts with a very ordinary request:

> "We need a more unified and more complete interaction experience."

For example:

- better accessibility, such as ARIA support
- more consistent keyboard interaction
- more standardized component behavior

Then you discover:

- the most mature component implementations are often concentrated in only a few mainstream frameworks
- other stacks either have nothing comparable or their quality varies widely

So you start to:

- reimplement similar components separately on different platforms
- or downgrade the design for a particular stack

At first, that only feels like "writing a bit more code."

But as the number of systems grows, the problem accumulates:

- the same component behaves differently on different platforms
- some interaction capabilities, such as accessibility support, remain missing on some platforms for a long time
- every design upgrade has to be repeated across multiple implementations

These costs are rarely tracked on their own, but they are always there:

> **You keep paying multiple implementation costs for the same interaction capability.**

---

## This is not a problem with one specific framework

The same kind of problem appears again and again across platforms:

- In Flutter, many interaction capabilities are tied to the Material system  
  → If you want high-quality components that are not Material, you often have to rewrite the underlying behavior yourself

- In some native GUI frameworks such as Qt or Unity UI  
  → basic controls exist, but high-quality interaction often still has to be built by the team itself

- In mini programs or other constrained environments  
  → the ecosystem is incomplete, and many component capabilities have to be filled in from scratch

These examples look different, but they share the same structure:

> **Interaction capability is bound to a concrete implementation and its host environment.**

That means:

- the capability itself cannot be reused directly
- you can only keep rebuilding around implementations

---

## Why have existing solutions not solved this?

Design systems, component libraries, Headless UI, and cross-platform frameworks all try to ease these problems.

But they usually share a common boundary:

> **Reuse still happens at the implementation layer, not at the interaction-semantics layer.**

As a result:

- you may be able to share styles or structure
- but it is still hard to share the behavior itself

So duplication remains, just in a different form.

---

## Proto UI starts from a different angle

Proto UI starts from a more specific question:

> **What if what we reuse is not the implementation, but the interaction itself?**

In Proto UI:

- the Prototype describes a component's interaction semantics, including state, events, and feedback
- the Adapter maps those semantics into a concrete host

This does not mean all differences disappear.

Its goal is the opposite:

> **Reuse the parts that can be reused, and confine the differences to the adaptation layer.**

---

## What changes does this bring?

If this layering holds:

- a component's interaction definition no longer has to be reimplemented for every host
- a design system has a chance to become an executable behavior definition
- different stacks can share part of the same component capability

What you saw in the homepage demo is not fundamentally "switching frameworks," but:

> **The same interaction definition being interpreted by different hosts.**

---

## But this is not free

Adopting Proto UI is essentially trading one kind of cost for another.

What you reduce is:

- the long-term cost of repeated implementations

What you introduce is:

- an additional abstraction layer, Prototype and Adapter
- a more complex debugging path
- dependence on ecosystem maturity

So the question becomes:

> **Is your problem long-term enough to justify solving it structurally?**

---

## About adoption cost, a more realistic tradeoff

Proto UI does not ask you to migrate your entire project at once.

It is adopted one component at a time:

- you can introduce Proto UI components only in new features
- or replace existing components gradually

This means you can adopt it incrementally rather than rewriting the whole system, but it also means you will go through a period of coexistence.

In a real project, you will usually have both:

- existing components, from the original implementation
- Proto UI components, based on Prototypes

That brings some extra cost:

- the same kind of component may exist in two implementation styles
- design and interaction need to stay aligned across two systems
- replacement itself is also a migration cost

Proto UI's goal is:

> to reduce the cost of repeated implementation in the long run

But in the short run, you need to absorb a one-time **replacement and transition cost**.

---

## When is it worth considering?

- when you need to maintain a consistent interaction experience across multiple hosts
- when you are building a component platform or design system rather than a one-off project
- when you can already feel the cost of repeated implementation starting to accumulate

---

## When is it not a good fit?

- when you only build components in a single framework
- when the project lifecycle is short and the cost of duplication has not really appeared
- when the team does not want to introduce a new abstraction layer

---

## Next

If you have confirmed that this kind of problem is relevant to you, continue here:

- [How It Works](/en/start-here/how-it-works/)
- [Quick Start](/en/start-here/quick-start/)

If you care more about the full theory:

- [Whitepaper / Component as Protocol](/en/whitepaper/component-as-protocol/)
