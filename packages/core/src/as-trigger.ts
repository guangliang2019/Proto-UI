import { getCoreHookBackend } from './as-hook-backends';

export function asTrigger(): void {
  const backend = getCoreHookBackend('asTrigger');
  if (!backend) {
    throw new Error(`[AsHook] runtime backend unavailable for asTrigger.`);
  }
  return backend();
}
