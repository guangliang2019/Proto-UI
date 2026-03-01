import { defineMiddleware } from 'astro:middleware';

const LOCALES = ['en', 'zh-cn'] as const;
const DEFAULT_LOCALE = 'en';

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  return cookieHeader
    .split(';')
    .map((part) => part.trim().split('='))
    .filter(([key]) => key)
    .reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = decodeURIComponent(value || '');
      return acc;
    }, {});
}

function detectLocale(request: Request): (typeof LOCALES)[number] {
  const cookies = parseCookies(request.headers.get('cookie'));
  const preferred = cookies['preferred-locale']?.toLowerCase();
  if (preferred && LOCALES.includes(preferred as (typeof LOCALES)[number])) {
    return preferred as (typeof LOCALES)[number];
  }

  const acceptLanguage = request.headers.get('accept-language') || '';
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, q = 'q=1'] = lang.trim().split(';');
      const quality = parseFloat(q.split('=')[1] || '1');
      return { locale: locale.toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  const prefersChinese = languages.some((lang) => lang.locale.startsWith('zh'));
  return prefersChinese ? 'zh-cn' : DEFAULT_LOCALE;
}

function isAssetPath(pathname: string): boolean {
  if (pathname.startsWith('/_astro')) return true;
  if (pathname.startsWith('/assets')) return true;
  if (pathname.startsWith('/api')) return true;
  if (pathname === '/favicon.ico') return true;
  if (pathname === '/robots.txt') return true;
  if (pathname === '/sitemap.xml') return true;
  // If it looks like a file request (/logo.png, /foo.css)
  return /\.[a-z0-9]+$/i.test(pathname);
}

function isErrorPath(pathname: string): boolean {
  return /^\/(?:404|500)(?:\/|\.html)?$/i.test(pathname);
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, redirect } = context;
  const pathname = url.pathname;

  // Let the root page handle locale detection on the client.
  if (pathname === '/') {
    return next();
  }

  if (isAssetPath(pathname) || isErrorPath(pathname)) {
    return next();
  }

  const hasLocalePrefix = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocalePrefix) {
    const targetLocale = detectLocale(request);
    const targetPath = pathname === '/' ? `/${targetLocale}/` : `/${targetLocale}${pathname}`;
    return redirect(targetPath, 302);
  }

  return next();
});
