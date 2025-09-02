---
title: 适配器库
description: Proto UI 已支持与计划支持的适配器库入口
---

## 已支持的适配器

<Grid cols="2">
  <Card title="Web Components" href="/adapters/web-components" badge="已支持">
    <p>将原型翻译为原生 Web Component，零依赖运行。</p>
  </Card>

  <Card title="React" href="/adapters/react" badge="已支持">
    <p>将原型翻译为 React Component，可直接在 React 应用中使用。</p>
  </Card>
</Grid>

---

## 即将推出

<Grid cols="3">
  <Card title="Vue" badge="计划中" />
  <Card title="Flutter" badge="计划中" />
  <Card title="Qt" badge="计划中" />
  <Card title="WeChat Mini Program" badge="计划中" />
</Grid>

---

## 关于适配器的范围

与原型库不同，适配器并不针对某一设计语言，而是负责 **将原型翻译到目标宿主环境**。  
在 Proto UI 的语境中：  

- **宿主 (Host)** 不仅仅是框架（如 React、Vue），也可以是：  
  - 运行时平台（如 Web Components、WeChat Mini Program）；  
  - 跨端技术（如 Flutter、Qt）；  
  - 甚至底层渲染管线或 I/O 系统。  
- 因此，适配器库的范围 **不限于框架**，而是覆盖一切可能的运行环境。  

---

## 贡献入口

如果你想让原型适配到你需要的平台，而 Proto UI 还未实现对应的适配器，你可以尝试亲手实现它！
可以参考 [贡献指南](/contributing/adapters)，其中包含：  

- 适配器初始化流程  
- Renderer 与 h 函数的实现约定  
- Adapter 内部子模块的详细定义和实现指南  

> Proto UI 鼓励社区开发者补充新的 Adapter，以拓展协议化的适用范围。  

---
