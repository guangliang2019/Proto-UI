import type { PropsBaseType } from '@proto.ui/types';

export type HitParticipationMode = 'participating' | 'disabled' | 'passthrough';

export type HitParticipationRegionRole = string & {};

export type HitParticipationConfigPatch = Readonly<{
  mode?: HitParticipationMode;
  debugLabel?: string;
  meta?: Readonly<Record<string, unknown>>;
}>;

export type HitParticipationConfig = Readonly<{
  mode: HitParticipationMode;
  debugLabel?: string;
  meta?: Readonly<Record<string, unknown>>;
}>;

export type HitParticipationRegionOptions = Readonly<{
  role?: HitParticipationRegionRole;
  mode?: HitParticipationMode;
  meta?: Readonly<Record<string, unknown>>;
}>;

export type HitParticipationRegion = Readonly<{
  target: unknown;
  role?: HitParticipationRegionRole;
  mode: HitParticipationMode;
  meta?: Readonly<Record<string, unknown>>;
}>;

export interface HitParticipationHandle<P extends PropsBaseType = PropsBaseType> {
  configure(patch: HitParticipationConfigPatch): void;
  registerRegion(target: unknown, options?: HitParticipationRegionOptions): () => void;
  unregisterRegion(target: unknown): void;
}
