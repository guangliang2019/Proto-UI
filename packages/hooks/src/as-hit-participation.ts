import type { HitParticipationConfigPatch, HitParticipationHandle } from '@proto.ui/core';
import { getActiveAsHookContext } from '@proto.ui/core/internal';

export function asHitParticipation(
  patch?: HitParticipationConfigPatch
): HitParticipationHandle<any> {
  const { rt, facades } = getActiveAsHookContext('asHitParticipation');
  rt.ensureSetup('asHook(asHitParticipation)');
  rt.register('asHitParticipation', { privileged: true, mode: 'configurable' });

  const facade = facades['hit-participation'] as
    | { getHitParticipation: () => HitParticipationHandle<any> }
    | undefined;
  if (!facade || typeof facade.getHitParticipation !== 'function') {
    throw new Error('[AsHook] hit-participation facade unavailable for asHitParticipation.');
  }

  const handle = facade.getHitParticipation();
  if (patch) handle.configure(patch);
  return handle;
}
