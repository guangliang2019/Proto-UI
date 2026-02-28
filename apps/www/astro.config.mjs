// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { rehypeEnhancedImage } from './src/utils/rehype-enhanced-image.js';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Proto UI',

      defaultLocale: 'zh-cn',
      locales: {
        en: {
          label: 'English',
        },

        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      head: [
        // 双 theme-color
        {
          tag: 'script',
          attrs: {
            type: 'importmap',
          },
          content: `
          {
            "imports": {
              "react": "https://esm.sh/react@18",
              "react-dom/client": "https://esm.sh/react-dom@18/client",
              "vue": "https://esm.sh/vue@3"
            }
          }
          `,
        },
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#ffffff',
            media: '(prefers-color-scheme: light)',
          },
        },
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#0a0a0a', media: '(prefers-color-scheme: dark)' },
        },
      ],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        // 1) 体验承接：从 Landing Demo 过来的人，先看这里
        {
          label: 'Start Here',
          translations: { en: 'Start Here', 'zh-CN': '从这里开始' },
          items: [
            {
              label: '你刚刚看到的是什么？',
              translations: { en: 'What You Just Saw', 'zh-CN': '你刚刚看到的是什么？' },
              slug: 'start-here/what-you-saw',
            },
            {
              label: 'Proto UI 是怎么做到的？',
              translations: { en: 'How Proto UI Works', 'zh-CN': 'Proto UI 是怎么做到的？' },
              slug: 'start-here/how-it-works',
            },
            {
              label: '自己动手：第一个原型',
              translations: { en: 'Build Your First Prototype', 'zh-CN': '自己动手：第一个原型' },
              slug: 'start-here/first-prototype',
              badge: {
                text: { 'zh-CN': '计划中', en: 'Planned' },
                class: 'text-xs px-1.5 h-4.5 rounded-full bg-zinc-800',
              },
            },
            {
              label: '跨宿主运行',
              translations: { en: 'Running Across Hosts', 'zh-CN': '跨宿主运行' },
              slug: 'start-here/running-across-hosts',
            },
          ],
        },

        // 2) 结构入口：少而精
        {
          label: 'Overview',
          translations: { en: 'Overview', 'zh-CN': '概览' },
          items: [
            {
              label: '项目介绍',
              translations: { en: 'Project Introduction', 'zh-CN': '项目介绍' },
              slug: 'overview/introduction',
            },
            {
              label: '为什么会有 Proto UI',
              translations: { en: 'Why Proto UI', 'zh-CN': '为什么会有 Proto UI' },
              slug: 'overview/why',
            },
            {
              label: 'High-Level Model',
              translations: { en: 'High-Level Model', 'zh-CN': 'High-Level Model' },
              slug: 'overview/model',
            },
            {
              label: '时间线 & 里程碑',
              translations: { en: 'Milestones', 'zh-CN': '里程碑' },
              slug: 'overview/milestones',
            },
            {
              label: '原型库（概览）',
              translations: { en: 'Prototype Library (Overview)', 'zh-CN': '原型库（概览）' },
              slug: 'overview/prototypes',
            },
            {
              label: '适配器库（概览）',
              translations: { en: 'Adapter Library (Overview)', 'zh-CN': '适配器库（概览）' },
              slug: 'overview/adapters',
            },
            {
              label: '贡献者索引',
              translations: { en: 'Contributor Index', 'zh-CN': '贡献者索引' },
              slug: 'overview/contributing',
              badge: {
                text: { 'zh-CN': '征集中', en: 'Collecting' },
                class: 'text-xs px-1.5 h-4.5 rounded-full bg-lime-400 text-black',
              },
            },
          ],
        },

        // 3) 白皮书：扁平化，不要再往下分三级
        {
          label: 'Whitepaper',
          translations: { en: 'Whitepaper', 'zh-CN': '白皮书' },
          items: [
            {
              label: '组件作为协议',
              translations: { en: 'Component as Protocol', 'zh-CN': '组件作为协议' },
              slug: 'whitepaper/component-as-protocol',
            },
            {
              label: '信息通路模型',
              translations: { en: 'Information Flow Model', 'zh-CN': '信息通路模型' },
              slug: 'whitepaper/information-flow-model',
            },
            {
              label: '原型抽象',
              translations: { en: 'Prototype Abstraction', 'zh-CN': '原型抽象' },
              slug: 'whitepaper/prototype-abstraction',
            },
            {
              label: '执行语义',
              translations: { en: 'Execution Semantics', 'zh-CN': '执行语义' },
              slug: 'whitepaper/execution-semantics',
            },
            {
              label: '翻译层：Adapter / Compiler',
              translations: { en: 'Translation Layer', 'zh-CN': '翻译层：Adapter / Compiler' },
              slug: 'whitepaper/translation-layer',
            },
            {
              label: '设计约束',
              translations: { en: 'Design Constraints', 'zh-CN': '设计约束' },
              slug: 'whitepaper/design-constraints',
            },
            {
              label: '演进路径',
              translations: { en: 'Evolution Path', 'zh-CN': '演进路径' },
              slug: 'whitepaper/evolution-path',
            },
            {
              label: 'FAQ',
              translations: { en: 'FAQ', 'zh-CN': 'FAQ' },
              slug: 'whitepaper/faq',
            },
          ],
        },

        // 4) 规范层：把 contracts 从“讲道理”里剥离出来
        {
          label: 'Specifications',
          translations: { en: 'Specifications', 'zh-CN': '规范（契约）' },
          items: [
            {
              label: '规范导读',
              translations: { en: 'How to Read Specs', 'zh-CN': '规范导读' },
              slug: 'specs/introduction',
            },
            {
              label: '核心规范',
              translations: { en: 'Core', 'zh-CN': '核心' },
              slug: 'specs/core',
            },
            {
              label: 'Props',
              translations: { en: 'Props', 'zh-CN': 'Props' },
              slug: 'specs/props',
            },
            {
              label: 'Event',
              translations: { en: 'Event', 'zh-CN': 'Event' },
              slug: 'specs/event',
            },
            {
              label: 'Expose',
              translations: { en: 'Expose', 'zh-CN': 'Expose' },
              slug: 'specs/expose',
            },
            {
              label: 'State',
              translations: { en: 'State', 'zh-CN': 'State' },
              slug: 'specs/state',
            },
            {
              label: 'Context',
              translations: { en: 'Context', 'zh-CN': 'Context' },
              slug: 'specs/context',
            },
            {
              label: 'Feedback',
              translations: { en: 'Feedback', 'zh-CN': 'Feedback' },
              slug: 'specs/feedback',
            },
            {
              label: 'Rule',
              translations: { en: 'Rule', 'zh-CN': 'Rule' },
              slug: 'specs/rule',
              badge: {
                text: { en: 'Planned', 'zh-CN': '计划中' },
                class: 'text-xs px-1.5 h-4.5 rounded-full bg-zinc-800',
              },
            },
          ],
        },

        // 5) 工程实现：给 maintainer / adapter 作者
        {
          label: 'Engineering',
          translations: { en: 'Engineering', 'zh-CN': '工程实现' },
          items: [
            {
              label: 'Prototype API',
              translations: { en: 'Prototype API', 'zh-CN': 'Prototype API' },
              slug: 'engineering/prototype-api',
            },
            {
              label: 'Adapter Guide',
              translations: { en: 'Adapter Guide', 'zh-CN': 'Adapter 指南' },
              slug: 'engineering/adapter-guide',
            },
            {
              label: 'Compiler Guide',
              translations: { en: 'Compiler Guide', 'zh-CN': 'Compiler 指南' },
              slug: 'engineering/compiler-guide',
              badge: {
                text: { en: 'Planned', 'zh-CN': '计划中' },
                class: 'text-xs px-1.5 h-4.5 rounded-full bg-zinc-800',
              },
            },
            {
              label: 'Runtime Architecture',
              translations: { en: 'Runtime Architecture', 'zh-CN': 'Runtime 架构' },
              slug: 'engineering/runtime-architecture',
            },
            {
              label: 'Host Caps',
              translations: { en: 'Host Caps', 'zh-CN': 'Host Caps' },
              slug: 'engineering/host-caps',
            },
          ],
        },

        // 6) 原型库：建议作为独立大类，且支持 autogenerate
        {
          label: 'Prototypes',
          translations: { en: 'Prototypes', 'zh-CN': '原型库' },
          items: [
            {
              label: 'Base Library',
              translations: { en: 'Base Library', 'zh-CN': '基础原型库' },
              slug: 'prototypes/base',
            },
            {
              label: 'Advanced Examples',
              translations: { en: 'Advanced Examples', 'zh-CN': '高级示例' },
              slug: 'prototypes/advanced',
            },
            {
              label: '全部条目',
              translations: { en: 'All Entries', 'zh-CN': '全部条目' },
              autogenerate: { directory: 'reference/prototypes' },
            },
          ],
        },

        // 7) 贡献：保持少而清晰，避免把协作细则塞满侧边栏
        {
          label: 'Contributing',
          translations: { en: 'Contributing', 'zh-CN': '贡献' },
          items: [
            {
              label: '贡献概览',
              translations: { en: 'Contributing Overview', 'zh-CN': '贡献概览' },
              slug: 'contributing',
            },
            {
              label: '编写原型',
              translations: { en: 'Write a Prototype', 'zh-CN': '编写原型' },
              slug: 'contributing/write-prototype',
            },
            {
              label: '编写适配器',
              translations: { en: 'Write an Adapter', 'zh-CN': '编写适配器' },
              slug: 'contributing/write-adapter',
            },
            {
              label: '契约与测试',
              translations: { en: 'Contracts & Tests', 'zh-CN': '契约与测试' },
              slug: 'contributing/contracts',
            },
          ],
        },
      ],
      components: {
        Hero: './src/components/override/Hero.astro',
        ContentPanel: './src/components/override/ContentPanel.astro',
        Header: './src/components/override/Header.astro',
        PageFrame: './src/components/override/PageFrame.astro',
        SiteTitle: './src/components/override/SiteTitle.astro',
        ThemeProvider: './src/components/override/ThemeProvider.astro',
        TableOfContents: './src/components/override/TableOfContents/TableOfContents.astro',
        TwoColumnContent: './src/components/override/TwoColumnContent.astro',
        PageTitle: './src/components/override/PageTitle.astro',
        MarkdownContent: './src/components/override/MarkdownContent.astro',
        LanguageSelect: './src/components/override/LanguageSelect.astro',
      },
      markdown: {
        rehypePlugins: [rehypeEnhancedImage],
      },
    }),
  ],
  vite: {
    resolve: {},
    server: {
      // 允许 dev server 读取到仓库根（否则访问 workspace 包会被拦）
      fs: { allow: ['../..'] },
    },
    plugins: [tailwindcss()],
  },
});
