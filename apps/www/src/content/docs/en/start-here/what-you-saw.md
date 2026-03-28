---
title: 'What You Just Saw'
desp: 'A quick recap of the landing demo'
description: 'A quick recap of the landing demo'
---

## What You Just Saw

In the demo on the [Proto UI homepage](https://www.proto-ui.com), you can switch between different frameworks such as React, Vue, and Web Components while the component behavior remains exactly the same.

This is not a visual mock, and it is not a simple style switch.  
Each time you switch, the runtime environment for the corresponding framework is reloaded.

What you are seeing is not three separate component implementations, but one interaction definition being executed in different hosts.

> If you have not tried the homepage demo yet, it is worth going back to the [homepage](https://www.proto-ui.com) first.  
> It is not a prerequisite for reading this page, but it will help you understand more quickly what Proto UI is actually showing.

## Where do these components come from?

You can first understand Proto UI as a compositional relationship:

- choose a Prototype, which defines the component's interaction
- choose an Adapter for a specific host
- combine the two to get the component implementation in that host

For example, you can:

- choose a `shadcn/ui`-style Button Prototype
- then choose the React Adapter
- and get a Button implementation in React

The same Prototype can also be combined with other Adapters to produce implementations in Vue or Web Components.

For this page, it is enough to remember one thing:

Proto UI does not copy an existing component into different frameworks. It separates a component into two parts, "definition" and "implementation", and then recombines them in different hosts.

## Why does this matter?

This is not just about "running the same component in multiple frameworks."

More importantly, Proto UI extracts the interaction semantics that were previously tied to concrete implementations, lets them exist first as a Prototype, and then has Adapters interpret them in different hosts.

Cross-platform support is only one outcome of this model, not its purpose.

## Where to go next?

- If you want to decide whether this is worth it, go to [Why Proto UI](/en/start-here/why-proto-ui/)
- If you want to understand the most basic way it works, go to [How It Works](/en/start-here/how-it-works/)
- If you already want to start using it, go to [Quick Start](/en/start-here/quick-start/)
