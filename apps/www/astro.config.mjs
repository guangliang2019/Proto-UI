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
        {
          label: 'Overview',
          translations: {
            en: 'Overview',
            'zh-CN': 'Overview',
          },
          items: [
            {
              label: '项目介绍',
              translations: {
                en: 'Project Introduction',
                'zh-CN': '项目介绍',
              },
              slug: 'overview/introduction',
            },
            {
              label: '白皮书概要',
              translations: {
                en: 'Whitepaper Overview',
                'zh-CN': '白皮书概要',
              },
              slug: 'overview/whitepaper',
            },
            {
              label: '原型库',
              translations: {
                en: 'Prototype Library',
                'zh-CN': '原型库',
              },
              slug: 'overview/prototypes',
            },
            {
              label: '适配器库',
              translations: {
                en: 'Adapter Library',
                'zh-CN': '适配器库',
              },
              slug: 'overview/adapters',
            },
            {
              label: '贡献者索引',
              translations: {
                en: 'Contributor Index',
                'zh-CN': '贡献者索引',
              },
              slug: 'overview/contribute',
              badge: {
                text: {
                  'zh-CN': '征集中',
                  en: 'collecting',
                },
                class: 'text-xs px-1.5 h-4.5 rounded-full bg-lime-400 text-black',
              },
            },
            {
              label: '时间线 & 里程碑',
              translations: {
                en: 'Milestones',
                'zh-CN': '里程碑',
              },
              slug: 'overview/milestone',
            },
          ],
        },
        {
          label: 'Usage',
          translations: {
            en: 'Usage',
            'zh-CN': '使用',
          },
          items: [
            {
              label: '安装 & 使用',
              translations: {
                en: 'Installation & Usage',
                'zh-CN': '安装 & 使用',
              },
              slug: 'usage/installation',
              badge: {
                text: {
                  'zh-CN': '计划中',
                  en: 'planned',
                },
                class: 'text-xs px-1.5 h-4.5 rounded-full bg-zinc-800',
              },
            },
            {
              label: '快速开始',
              translations: {
                en: 'Quick Start',
                'zh-CN': '快速开始',
              },
              slug: 'usage/quick-start',
            },
          ],
        },
        {
          label: 'Contributing',
          translations: {
            en: 'Contributing',
            'zh-CN': '贡献',
          },
          items: [
            {
              label: '贡献概览',
              translations: {
                en: 'Contributing Overview',
                'zh-CN': '贡献概览',
              },
              slug: 'contributing',
            },
            {
              label: '编写原型',
              translations: {
                en: 'Write a Prototype',
                'zh-CN': '编写原型',
              },
              slug: 'contributing/write-prototype',
            },
            {
              label: '编写适配器',
              translations: {
                en: 'Write an Adapter',
                'zh-CN': '编写适配器',
              },
              slug: 'contributing/write-adapter',
            },
            {
              label: '契约与测试',
              translations: {
                en: 'Contracts & Tests',
                'zh-CN': '契约与测试',
              },
              slug: 'contributing/contracts',
            },
          ],
        },
        {
          label: '白皮书 & 哲学',
          translations: {
            en: 'Whitepaper & Philosophy',
            'zh-CN': '白皮书 & 哲学',
          },
          items: [
            {
              label: '设计哲学',
              translations: {
                en: 'Design Philosophy',
                'zh-CN': '设计哲学',
              },
              slug: 'reference/whitepaper/philosophy',
            },
            {
              label: '与现有方案比较',
              translations: {
                en: 'Comparison with Existing Solutions',
                'zh-CN': '与现有方案比较',
              },
              slug: 'reference/whitepaper/comparison',
            },
            {
              label: 'FAQ',
              translations: {
                en: 'FAQ',
                'zh-CN': 'FAQ',
              },
              slug: 'reference/whitepaper/faq',
            },
          ],
        },
        {
          label: '协议 & 语法',
          translations: {
            en: 'Protocol & Syntax',
            'zh-CN': '协议 & 语法',
          },
          items: [
            {
              label: '核心概念 & API 总览',
              translations: {
                en: 'Core Concepts & API Overview',
                'zh-CN': '核心概念 & API 总览',
              },
              slug: 'reference/protocol/general',
            },
            {
              label: 'asHook: 原型的组合',
              translations: {
                en: 'asHook: Prototype Composition',
                'zh-CN': 'asHook: 原型的组合',
              },
              slug: 'reference/protocol/as-hook',
            },
            {
              label: 'Context',
              translations: {
                en: 'Context',
                'zh-CN': 'Context',
              },
              slug: 'reference/protocol/context',
            },
            {
              label: 'Debug 语法',
              translations: {
                en: 'Debug Syntax',
                'zh-CN': 'Debug 语法',
              },
              slug: 'reference/protocol/debug',
            },
            {
              label: 'Event',
              translations: {
                en: 'Event',
                'zh-CN': 'Event',
              },
              slug: 'reference/protocol/event',
            },
            {
              label: 'Expose',
              translations: {
                en: 'Expose',
                'zh-CN': 'Expose',
              },
              slug: 'reference/protocol/expose',
            },
            {
              label: 'Lifecycle',
              translations: {
                en: 'Lifecycle',
                'zh-CN': 'Lifecycle',
              },
              slug: 'reference/protocol/lifecycle',
            },
            {
              label: 'Props',
              translations: {
                en: 'Props',
                'zh-CN': 'Props',
              },
              slug: 'reference/protocol/props',
            },
            {
              label: 'Renderer 语法',
              translations: {
                en: 'Renderer Syntax',
                'zh-CN': 'Renderer 语法',
              },
              slug: 'reference/protocol/renderer',
            },
            {
              label: 'State',
              translations: {
                en: 'State',
                'zh-CN': 'State',
              },
              slug: 'reference/protocol/state',
            },
            {
              label: 'Style 语法',
              translations: {
                en: 'Style Syntax',
                'zh-CN': 'Style 语法',
              },
              slug: 'reference/protocol/style',
            },
            {
              label: 'Variant 语法',
              translations: {
                en: 'Variant Syntax',
                'zh-CN': 'Variant 语法',
              },
              slug: 'reference/protocol/variant',
              badge: {
                text: {
                  en: 'Planned',
                  'zh-CN': '计划中',
                },
                class: 'text-xs px-1.5 h-4.5 rounded-full bg-zinc-800',
              },
            },
          ],
        },
        {
          label: '原型库',
          translations: { en: 'Prototype Libraries', 'zh-CN': '原型库' },
          autogenerate: {
            directory: 'reference/prototypes',
          },
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
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      // 允许 dev server 读取到仓库根（否则访问 workspace 包会被拦）
      fs: { allow: ['../..'] },
    },
    plugins: [tailwindcss()],
  },
});
