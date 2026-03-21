export function createDefaultMetaGetter(): (key: string) => unknown {
  return (key: string) => {
    if (key === 'colorScheme') {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light';
    }
    if (key === 'reducedMotion') {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'reduce'
          : 'no-preference';
      }
      return 'no-preference';
    }
    return undefined;
  };
}
