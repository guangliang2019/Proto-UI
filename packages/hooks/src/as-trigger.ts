import { getActiveAsHookContext } from '@proto.ui/core/internal';

export function asTrigger(): void {
  const { rt, facades } = getActiveAsHookContext('asTrigger');
  rt.ensureSetup(`asHook(asTrigger)`);
  const reg = rt.register('asTrigger', { privileged: true, mode: 'once' });
  if (reg.action !== 'setup') return;

  const facade = facades['as-trigger'] as { apply: () => void } | undefined;
  if (!facade || typeof facade.apply !== 'function') {
    throw new Error(`[AsHook] asTrigger facade unavailable.`);
  }

  facade.apply();
}
