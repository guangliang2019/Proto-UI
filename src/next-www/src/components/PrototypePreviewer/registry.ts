// src/core/preview/registry.ts
import type { Prototype } from '@/core';

const map = new Map<string, Prototype<any, any>>();

export function registerPrototype(id: string, proto: Prototype<any, any>) {
  if (!id || typeof id !== 'string') throw new Error('registerPrototype: invalid id');
  map.set(id, proto);
}

export function getPrototype(id: string): Prototype<any, any> {
  const p = map.get(id);
  if (!p) throw new Error(`[PrototypePreviewer] Prototype "${id}" not found.`);
  return p;
}
