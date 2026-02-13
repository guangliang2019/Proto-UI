// packages/modules/base/src/caps-vault/vault.ts
import type { CapEntries, CapToken, CapsVaultView } from '@proto-ui/core';
import { capUnavailable } from '@proto-ui/core';
import { Unsubscribe } from './types';

/**
 * Mutable caps vault for runtime/host wiring.
 *
 * Two layers:
 * - base: runtime-owned built-ins (SYS_CAP etc.), never reset by host wiring
 * - attached: host/wiring provided caps, resettable
 *
 * NOTE:
 * - module-* should depend on the *view* interface only (CapsVaultView from core),
 *   but in practice it's fine if they accept this class as long as they
 *   don't call attach/reset* (keep it a convention).
 */
export class CapsVault implements CapsVaultView {
  private base = new Map<string, any>();
  private attached = new Map<string, any>();

  private listeners = new Set<(epoch: number) => void>();
  epoch = 0;

  has(token: CapToken<any>): boolean {
    const id = token.id;
    return this.attached.has(id) || this.base.has(id);
  }

  get<T>(token: CapToken<T>): T {
    const id = token.id;
    if (this.attached.has(id)) return this.attached.get(id) as T;
    if (this.base.has(id)) return this.base.get(id) as T;
    throw capUnavailable(id, { epoch: this.epoch });
  }

  onChange(cb: (epoch: number) => void): Unsubscribe {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  // -------------------------
  // wiring APIs (mutable)
  // -------------------------

  /**
   * runtime-only: inject built-in/system caps (SYS_CAP etc.)
   * This layer survives host reset/unmount resets.
   */
  attachBase(entries: CapEntries): void {
    if (!entries || entries.length === 0) return;

    let changed = false;
    for (const [token, value] of entries) {
      const id = token.id;
      const prev = this.base.get(id);
      if (!this.base.has(id) || prev !== value) {
        this.base.set(id, value);
        changed = true;
      }
    }
    if (changed) this.bump();
  }

  /**
   * wiring-only: host/runtime inject capabilities for this instance.
   * This layer can be cleared by resetAttached().
   */
  attach(entries: CapEntries): void {
    if (!entries || entries.length === 0) return;

    let changed = false;
    for (const [token, value] of entries) {
      const id = token.id;
      const prev = this.attached.get(id);
      if (!this.attached.has(id) || prev !== value) {
        this.attached.set(id, value);
        changed = true;
      }
    }
    if (changed) this.bump();
  }

  /**
   * wiring-only: invalidate ONLY the attached layer.
   * SYS_CAP (base) remains available.
   */
  resetAttached(): void {
    if (this.attached.size === 0) return;
    this.attached.clear();
    this.bump();
  }

  /**
   * runtime-only: invalidate everything (rare; prefer resetAttached()).
   */
  resetAll(): void {
    if (this.attached.size === 0 && this.base.size === 0) return;
    this.attached.clear();
    this.base.clear();
    this.bump();
  }

  private bump(): void {
    this.epoch++;
    for (const cb of this.listeners) cb(this.epoch);
  }
}
