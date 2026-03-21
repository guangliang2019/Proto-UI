function sanitizePrototypeId(id: string): string {
  const normalized = String(id || 'prototype')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || 'prototype';
}

export function getPreviewWcName(prototypeId: string): string {
  return `wc-${sanitizePrototypeId(prototypeId)}`;
}
