---
title: Adapter Libraries
description: Entry point for adapter libraries supported and planned by Proto UI
---

## Supported Adapters

<Grid cols="2">
  <Card title="Web Components" href="/adapters/web-components" badge="Supported">
    <p>Translate prototypes into native Web Components that run with zero dependencies.</p>
  </Card>

  <Card title="React" href="/adapters/react" badge="Supported">
    <p>Translate prototypes into React Components that can be used directly in React applications.</p>
  </Card>
</Grid>

---

## Coming Soon

<Grid cols="3">
  <Card title="Vue" badge="Planned" />
  <Card title="Flutter" badge="Planned" />
  <Card title="Qt" badge="Planned" />
  <Card title="WeChat Mini Program" badge="Planned" />
</Grid>

---

## Scope of Adapters

Unlike prototype libraries, adapters are not tied to a specific design language. Instead, they are responsible for **translating prototypes to the target host environment**.  
In the context of Proto UI:

- A **Host** refers not only to frameworks (such as React and Vue) but also to:
  - Runtime platforms (e.g., Web Components, WeChat Mini Program);
  - Cross-platform technologies (e.g., Flutter, Qt);
  - Even underlying rendering pipelines or I/O systems.
- Therefore, the scope of adapter libraries is **not limited to frameworks** but covers all possible runtime environments.

---

## Contribution Entry

If you want prototypes to be adapted to a platform you need, but Proto UI has not yet implemented the corresponding adapter, you can try to implement it yourself! You can refer to the [Contribution Guide](/contributing/adapters), which includes:

- Adapter initialization process
- Implementation conventions for Renderer and h functions
- Detailed definitions and implementation guidelines for internal sub-modules of Adapter

> Proto UI encourages community developers to add new Adapters to expand the scope of protocol-based applications.
