import React, { useEffect, useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid';

// 【配置区】定义你的语言
const languages = [
  { code: 'en', label: 'English', short: 'En' },
  { code: 'zh-cn', label: '简体中文', short: '中' },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState(languages[0]);
  
  // 获取当前浏览器路径 (例如 /en/docs)
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  // 1. 初始化：组件加载时，根据 URL 自动选中当前的语言
  useEffect(() => {
    const detected = languages.find(l => 
      currentPath === `/${l.code}` || currentPath.startsWith(`/${l.code}/`)
    ) || languages[0];
    setSelected(detected);
  }, [currentPath]);

  // 2. 切换逻辑
  const handleSwitch = (lang: typeof languages[0]) => {
    if (lang.code === selected.code) return; // 点击当前语言不刷新
    
    let path = currentPath;

    // A. 剥离旧语言前缀
    // 例如: /en/docs -> /docs,  /en -> (空)
    languages.forEach(l => {
      if (path === `/${l.code}` || path.startsWith(`/${l.code}/`)) {
        path = path.replace(`/${l.code}`, '');
      }
    });

    // B. 确保 path 格式规范 (处理根路径情况)
    if (path === '' || !path.startsWith('/')) {
      path = '/' + path;
    }

    // C. 拼接新路径
    // 结果: /zh-cn/docs
    const newPath = `/${lang.code}${path === '/' ? '' : path}`;

    // D. 执行跳转
    window.location.href = newPath;
  };

  return (
    <Listbox value={selected} onChange={handleSwitch}>
      {/* 触发按钮 */}
      <ListboxButton className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:text-emerald-600 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-emerald-500/20 dark:text-gray-200 dark:hover:text-emerald-400 transition-colors">
        <span>{selected.label}</span>
        <ChevronDownIcon className="size-4 text-gray-500/70 group-hover:text-emerald-600 dark:text-gray-400" />
      </ListboxButton>

      {/* 下拉菜单 */}
      <ListboxOptions
        modal={false}
        anchor="bottom end"
        transition
        className="z-[100] mt-1 w-32 origin-top-right rounded-lg bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 dark:bg-zinc-800 dark:ring-white/10"
      >
        {languages.map((lang) => (
          <ListboxOption
            key={lang.code}
            value={lang}
            className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-emerald-600 dark:text-gray-200 dark:data-[focus]:bg-zinc-700 dark:data-[focus]:text-emerald-400 transition-colors"
          >
            <span className="font-normal group-data-[selected]:font-semibold">
              {lang.label}
            </span>
            <CheckIcon className="invisible size-4 text-emerald-600 group-data-[selected]:visible dark:text-emerald-400" />
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}