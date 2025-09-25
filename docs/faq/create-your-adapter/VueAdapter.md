# VueAdapter

## 1.配置vue开发环境

在vite中安排一个参数去启动对应的框架( vue, react...)模式启动文档站。在 package.json 下的 scripts 中去进行设置。vue的是 dev:vue

## 2.理解需要实现什么部分

完成配置之后，可以去查看 `src/core/behaviors/as-button`和 `src/componenets/shadcn/button` 的内容。之后能够大致清楚，adapter的目的就是把button的产物放到对应的适配器中去转换成对应框架能够执行的代码。

通过研究button的内容，你会发现实际上就是在vue中去构建 p , 这个 p 要实现与 button 的 p 想要实现的功能一致，例如 p.props , p.context , p.state 等等。可以去参考 `src/core/web/@Web-component` 和 `docs/contribute/03-adapter.md`

## 3.实现

通过上述的流程，就有了大致的思路。在 VueAdapter 中它必须放回一个通过defineComponent对象；要创建一个p对象，该对象必须要实现 props, state, context, expose, lifecycle, role, event, view 的方法；以及需要去构建vue的rendere部分。

我建议是先去构建rendere部分，对于vue来说就是去构建h函数。之后使用 div 或 span 加上一些 css 样式去做一些简单测试。先让其跑起来。

之后呢可以去根据as-button 的内容去一步一步完成，我的话就是按照 state, lifecycle, event, props 的顺序去写，（这是的 role 暂时跳过 ）。就可以把shadnc样式的button 去放到VueAdapter上。

在此期间会遇到 DOM 挂载时机的问题，props 的没有放到 DOM 上，以及在 view 并没有挂载到 DOM 上的问题。



1.DOM挂载时机问题使用延迟加载，等到真实 DOM 挂载后再去执行。

2.这个props的问题，就是在setup时去创建一个人造 Node 去收集对真实的 DOM 的props的操作，之后在构建h函数的时候去重写遍历出来。

3.view 挂载问题，这会与 props 有关，这个 view 挂载的生命周期时在 setup 期间此时的DOM是存在的，但并没有挂载。虽然可以先对 setup 的 DOM 去进行操作，但之后这个挂载时没有找到？（有点忘记了），只能先通过和props放到一个人造 Node 中之后挂载再去操作即可，要注意的时在 挂载之后需要去实现 view.update 强制更新一下。以及 view 还有一些方法需要补全

到此可以通过 as-tab 去进行测试。

测试通过之后，需要完成 context , export 的内容。先完成 context , （下面内容暂定这么写） 这个部分主要去使用 vue3 的 provide/inject ，也就是父子组件共享数据的部分，且对于 vue3 来说provide/inject 这个部分是在 setup 阶段，去实现。

export 部分以及 context 部分，未通过测试， 未完待续.....
