// packages/core/src/caps/vault.ts
import type { CapToken } from './token';

type Unsubscribe = () => void;

export interface CapsVaultView {
  readonly epoch: number;

  has(token: CapToken<any>): boolean;

  /**
   * Get capability. If unavailable, should throw a stable error.
   */
  get<T>(token: CapToken<T>): T;

  onChange(cb: (epoch: number) => void): Unsubscribe;
}
