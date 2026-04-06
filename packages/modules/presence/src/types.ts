export type PresencePhase = 'absent' | 'mounting' | 'present' | 'unmounting';

export interface PresencePolicy {
  /** Reserved for future modes (e.g. 'immediate' vs 'deferred'). */
}

export interface PresenceHandle {
  setIntent(intent: 'enter' | 'leave'): void | Promise<void>;
  getPhase(): PresencePhase;
  onBeforeMount(cb: () => void | Promise<void>): () => void;
  onBeforeUnmount(cb: () => void | Promise<void>): () => void;
}

export interface PresenceFacade {
  createHandle(policy?: PresencePolicy): PresenceHandle;
}

export interface PresencePort {
  awaitMount(): Promise<void> | undefined;
  awaitUnmount(): Promise<void> | undefined;
}

export interface PresenceHostBridge {
  mount(): void | Promise<void>;
  unmount(): void | Promise<void>;
}
