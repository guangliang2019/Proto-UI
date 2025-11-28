// 配置：支持的语言
const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh-cn', label: '简体中文' },
];

class LanguageSelector extends HTMLElement {
  private _isOpen = false;
  
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  // 1. 渲染 HTML (使用 Tailwind 样式)
  render() {
    // 获取当前路径
    const currentPath = window.location.pathname;
    // 判断当前语言
    const selected = languages.find(l => 
      currentPath === `/${l.code}` || currentPath.startsWith(`/${l.code}/`)
    ) || languages[0];

    this.innerHTML = `
      <div class="relative z-50 font-sans text-sm">
        <!-- 触发按钮 -->
        <button id="lang-btn" class="flex items-center gap-1 rounded-md px-2 py-1 font-medium text-foreground/60 hover:text-foreground transition-colors focus:outline-none">
          <span>${selected.label}</span>
          <!-- SVG 下拉箭头 -->
          <svg class="h-4 w-4 opacity-50" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- 下拉菜单 (默认隐藏) -->
        <div id="lang-menu" class="hidden absolute right-0 mt-1 w-32 origin-top-right rounded-lg bg-background border border-border shadow-lg ring-1 ring-black/5 focus:outline-none p-1">
          ${languages.map(lang => `
            <div data-code="${lang.code}" class="lang-option group flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
              <span class="${lang.code === selected.code ? 'font-semibold' : 'font-normal'}">
                ${lang.label}
              </span>
              <!-- SVG 对钩 (只在选中时显示) -->
              <svg class="${lang.code === selected.code ? 'block' : 'hidden'} h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 2. 添加交互逻辑
  addEventListeners() {
    const btn = this.querySelector('#lang-btn');
    const menu = this.querySelector('#lang-menu');
    const options = this.querySelectorAll('.lang-option');

    // 点击按钮切换菜单
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this._isOpen = !this._isOpen;
      if (this._isOpen) menu?.classList.remove('hidden');
      else menu?.classList.add('hidden');
    });

    // 点击选项跳转
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const code = target.getAttribute('data-code');
        if (code) this.switchLanguage(code);
      });
    });

    // 点击外部关闭菜单
    document.addEventListener('click', () => {
      if (this._isOpen) {
        this._isOpen = false;
        menu?.classList.add('hidden');
      }
    });
  }

  // 3. 语言切换逻辑
  switchLanguage(newLangCode: string) {
    let path = window.location.pathname;
    
    // 移除旧语言前缀
    languages.forEach(l => {
      if (path === `/${l.code}` || path.startsWith(`/${l.code}/`)) {
        path = path.replace(`/${l.code}`, '');
      }
    });

    // 确保 path 规范
    if (path === '' || !path.startsWith('/')) path = '/' + path;

    // 跳转
    const newPath = `/${newLangCode}${path === '/' ? '' : path}`;
    window.location.href = newPath;
  }
}

// 注册组件
if (!customElements.get('language-selector')) {
  customElements.define('language-selector', LanguageSelector);
}

// 导出空对象以符合模块规范 (可选)
export {};