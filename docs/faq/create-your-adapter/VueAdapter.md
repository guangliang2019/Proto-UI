# VueAdapter

## 1.配置vue开发环境

在vite中安排一个参数去启动对应的框架( vue, react...)模式启动文档站。在 package.json 下的 scripts 中去进行设置。vue的是 dev:vue

## 2.理解需要实现什么部分

完成配置之后，可以去查看 `src/core/behaviors/as-button`和 `src/componenets/shadcn/button` 的内容。之后能够大致清楚，adapter的目的就是把button的产物放到对应的适配器中去转换成对应框架能够执行的代码

通过研究button的内容，你会发现实际上就是在vue中去构建 p , 这个 p 要实现与 button 的 p 想要实现的功能一致，例如 p.props , p.context , p.state 等等。可以去参考 `src/core/web/@Web-component` 和 `docs/contribute/03-adapter.md`

总的来说这个 VueAdapter 是一个桥梁，是把组件原型（proto core） 转成可在 vue 环境中执行的代码， 

## 3.实现

### 3.1基础结构
通过上述的流程，就有了大致的思路，之后，我们要需要以什么样的形式去构建，选用 defineComponent ， 在 VueAdapter 中它必须放回一个通过 defineComponent 对象；要创建一个p对象，该对象必须要实现 props, state, context, expose, lifecycle, role, event, view 的方法；以及需要去构建 vue 的 renderer 部分

可先去构建 renderer(event) 部分 `src/core/web/@next-vue/renderer` ，对于 vue 来说就是去构建h函数。之后使用 div 或 span 加上一些 css 样式去做一些简单测试，先让其跑起来

### 3.2 模块理解

前提： 首先需要清楚 vueAdapter 对于 props core 的声明是在编译阶段，执行是在 setup 阶段，但在 setup 中无法获取 DOM ，只能获取到对应的 虚拟 DOM ，因此只能延迟到 onMounted 加载。绝大部分都是需要去进行延迟加载

props: 对于vue来说，props的类型声明是在模块加载阶段，同时组件的定义也在此阶段，所以我们可以在此直接去声明，之后在setup阶段的时候就去重新赋值回去

event: 用于获取并设置由 propto core 设定的绑定事件

context: 用于关联父子之间，以及祖孙之间的联系。对标 vue 的话就是 provide/inject 的关系，但区别在于当发生变化时 proto ui 是去进行手动更新，而非 provide/inject 会去自动更新。 在实现中，这个关系是要在 setup 阶段就要确认的，因为在 onMounted 阶段的父子之间生命周期执行次序是子 -> 父，这会导致子可能在该生命周期会去调用父传下来的方法或参数。但不幸的是如果按照前面的逻辑去执行，是要去延迟加载，就会出现上述的情况，所以就是用 provide/inject 去关联但不参与

lifecycle：这就比较简单了，也就是在让其在对应的生命周期去执行

state： 用于去设置对应的状态

expose: 用于暴露内部方法到 DOM 上

view:  用于控制渲染，由于props ui 渲染是通过手动控制的，所以需要去提供触发重新渲染的方法以及需要控制 DOM 的顺序

role：暂时跳过


其他： 

## 4.实现流程

可以去根据 as-button 的内容去一步一步完成，我的话就是按照 state, lifecycle, event, props 的顺序去写，（这是的 role 暂时跳过 ）。就可以把 shadcn 样式的button 去放到VueAdapter上，完成之后进度就到 40% 左右，之后可以去把 as-tab 的部分去实现，完成之后进度就到 80% 左右基本上就能跑通绝大部分的组件。

要注意测试的时候要把组件名更改，也就是这里的 name 需要更改，不然很有可能会加载到其他适配器的内容，之前测试的时候没有注意用到 old 导致一直触发的时候 WebComponent Adapter 的内容
`const ShadcnTabsTriggerPrototype = definePrototype<TabsTriggerProps>({
  name: `vue-${CONFIG.shadcn.prefix}-tabs-trigger`, // new
  name: `${CONFIG.shadcn.prefix}-tabs-trigger`, // old
});
`

## 5.待优化部分
目前的 vueAdapter 很粗糙，有很多部分是直接借鉴 WebComponent Adatper ，有很多内容实际上 vue3 会自动帮你处理，但对应代码没有删除；以及 renderer 部分的类型部分需要合理处理 ` const _vueRenderer = new VueRenderer(_render as any, slots); ` 也就是这个部分。

