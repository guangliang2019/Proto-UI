import type { FocusGroupKey, FocusableConfig, FocusGroupConfig, FocusFacts } from '@proto.ui/core';
import type { FocusInstanceToken, FocusParentGetter } from './caps';

export type FocusCenterEntry = {
  instance: FocusInstanceToken;
  getParent: FocusParentGetter;
  getFocusableConfig(): FocusableConfig;
  getGroupConfig(): FocusGroupConfig;
  getFacts(): FocusFacts;
  getRootTarget(): HTMLElement | null;
  requestFocus(): void;
};

export class FocusCenter {
  private readonly entries = new Map<FocusInstanceToken, FocusCenterEntry>();

  upsert(entry: FocusCenterEntry): void {
    this.entries.set(entry.instance, entry);
  }

  remove(instance: FocusInstanceToken): void {
    this.entries.delete(instance);
  }

  private resolveGroupProvider(
    instance: FocusInstanceToken,
    groupKey: FocusGroupKey,
    getParent: FocusParentGetter
  ): FocusInstanceToken | null {
    let cur: FocusInstanceToken | null = instance;
    while (cur) {
      const entry = this.entries.get(cur);
      if (entry?.getGroupConfig().key === groupKey) {
        return cur;
      }
      cur = getParent(cur);
    }
    return null;
  }

  private compareEntries(a: FocusCenterEntry, b: FocusCenterEntry): number {
    const aEl = a.getRootTarget();
    const bEl = b.getRootTarget();
    if (!aEl || !bEl || aEl === bEl) return 0;
    const pos = aEl.compareDocumentPosition(bEl);
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  }

  getGroupMembers(provider: FocusCenterEntry): FocusCenterEntry[] {
    const groupKey = provider.getGroupConfig().key;
    if (!groupKey) return [];

    const members = Array.from(this.entries.values()).filter((entry) => {
      const focusable = entry.getFocusableConfig();
      if (focusable.disabled) return false;
      if (focusable.navParticipation === 'none') return false;
      if (focusable.groupKey !== groupKey) return false;
      const resolved = this.resolveGroupProvider(entry.instance, groupKey, entry.getParent);
      return resolved === provider.instance;
    });

    return members.sort((a, b) => this.compareEntries(a, b));
  }

  focusInGroup(
    provider: FocusCenterEntry,
    op: 'first' | 'last' | 'next' | 'prev' | 'selected'
  ): void {
    const members = this.getGroupMembers(provider);
    if (members.length === 0) return;

    const currentIndex = members.findIndex((entry) => entry.getFacts().focused);
    const loop = provider.getGroupConfig().loop;

    let target: FocusCenterEntry | null = null;
    if (op === 'first' || op === 'selected') {
      target = members[0] ?? null;
    } else if (op === 'last') {
      target = members[members.length - 1] ?? null;
    } else if (currentIndex >= 0) {
      const delta = op === 'next' ? 1 : -1;
      let nextIndex = currentIndex + delta;
      if (loop) {
        nextIndex = (nextIndex + members.length) % members.length;
      }
      target = members[nextIndex] ?? null;
    } else {
      target = op === 'prev' ? (members[members.length - 1] ?? null) : (members[0] ?? null);
    }

    target?.requestFocus();
  }
}

export const FOCUS_CENTER = new FocusCenter();
