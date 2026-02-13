import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, redirect } = context;

  // 只处理根路径
  if (url.pathname === '/') {
    // 获取浏览器的语言偏好
    const acceptLanguage = request.headers.get('accept-language') || '';

    // 解析 Accept-Language 头
    // 格式：zh-CN,zh;q=0.9,en;q=0.8
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [locale, q = 'q=1'] = lang.trim().split(';');
        const quality = parseFloat(q.split('=')[1] || '1');
        return { locale: locale.toLowerCase(), quality };
      })
      .sort((a, b) => b.quality - a.quality);

    // 检查是否偏好中文
    const prefersChinese = languages.some((lang) => lang.locale.startsWith('zh'));

    // 根据语言偏好重定向
    if (prefersChinese) {
      return redirect('/zh-cn/', 302);
    } else {
      return redirect('/en/', 302);
    }
  }

  return next();
});
