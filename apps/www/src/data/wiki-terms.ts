export type WikiLocale = 'zh-cn' | 'en';

export type WikiTermEntry = {
  slug: string;
  term: Record<WikiLocale, string>;
  summary: Record<WikiLocale, string>;
};

export const wikiTerms: WikiTermEntry[] = [
  {
    slug: 'as-hook',
    term: {
      'zh-cn': 'asHook',
      en: 'asHook',
    },
    summary: {
      'zh-cn':
        'asHook 是 Proto UI 中可复用的纯逻辑能力单元。它本身不是独立交互主体，而是附着到 prototype 上，为原型复用状态、事件、反馈或上下文逻辑。',
      en: 'An asHook is a reusable logic unit in Proto UI. It is not an interaction subject by itself, and is attached to a prototype to reuse behavior.',
    },
  },
  {
    slug: 'anatomy',
    term: {
      'zh-cn': 'anatomy',
      en: 'anatomy',
    },
    summary: {
      'zh-cn':
        'anatomy 用来描述同一复合原型家族内部的角色与结构关系，例如 root、trigger、content 之间的包含和协作。',
      en: 'Anatomy describes stable roles and structural relations inside a compound prototype family, such as root, trigger, and content.',
    },
  },
  {
    slug: 'rule',
    term: {
      'zh-cn': 'rule',
      en: 'rule',
    },
    summary: {
      'zh-cn':
        'rule 是把条件和意图显式写出来的语法。它比手写命令式分支更容易被 Adapter 和 Compiler 分析、翻译和优化。',
      en: 'A rule makes conditions and intents explicit. It is easier for adapters and compilers to analyze, translate, and optimize than ad-hoc imperative branching.',
    },
  },
  {
    slug: 'style-tokens',
    term: {
      'zh-cn': 'Style Token',
      en: 'Style Token',
    },
    summary: {
      'zh-cn':
        'Proto UI 的 Style Token 借鉴了 Tailwind 的表达方式，但更收敛、更协议化。很多 Tailwind utility 可以直接兼容 Proto UI 的 token 形态。',
      en: 'Proto UI style tokens borrow Tailwind-like expression, but in a narrower and more protocol-oriented form.',
    },
  },
  {
    slug: 'core-capabilities',
    term: {
      'zh-cn': '核心能力',
      en: 'Core Capabilities',
    },
    summary: {
      'zh-cn':
        'props、event、feedback、expose、context、state、lifecycle 共同构成原型作者最常接触的能力面，它们和白皮书中的信息通路模型直接相关。',
      en: 'Props, event, feedback, expose, context, state, and lifecycle form the main author-facing capability surface of a prototype.',
    },
  },
];

export function getWikiTerm(_locale: WikiLocale, slug: string): WikiTermEntry | undefined {
  return wikiTerms.find((entry) => entry.slug === slug);
}

export function getWikiHref(locale: WikiLocale, slug: string): string {
  return `/${locale}/wiki/${slug}/`;
}
