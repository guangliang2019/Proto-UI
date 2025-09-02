// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Proto UI',

      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: '概要',
          items: [
            { label: '项目介绍', slug: 'overview/introduction' },
            { label: '白皮书概要', slug: 'overview/whitepaper' },
            { label: '原型库', slug: 'overview/prototypes' },
            { label: '适配器库', slug: 'overview/adapters' },
            { label: '时间线 & 里程碑', slug: 'overview/milestone' },
            {
              label: '贡献指引',
              slug: 'overview/contribute',
              badge: {
                text: '征集中',
                class: 'text-xs px-1.5 h-4.5 rounded-full bg-lime-400 text-black',
              },
            },
            {
              label: '安装 & 使用',
              slug: 'overview/installation',
              badge: { text: '计划中', class: 'text-xs px-2 h-5 rounded-full bg-zinc-800' },
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
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
