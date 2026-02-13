import { describe, it, expect } from 'vitest';
import { createOwnedTwTokenApplier } from '../src/feedback-style';

describe('adapter-web-component: owned tw tokens applier', () => {
  it('apply adds tokens and does not touch user classes', () => {
    const host = document.createElement('div');
    host.className = 'user-a user-b';

    const applier = createOwnedTwTokenApplier(host);
    applier.apply(['opacity-50', 'bg-red-500']);

    expect(host.classList.contains('user-a')).toBe(true);
    expect(host.classList.contains('user-b')).toBe(true);
    expect(host.classList.contains('opacity-50')).toBe(true);
    expect(host.classList.contains('bg-red-500')).toBe(true);
  });

  it('replace removes old owned tokens and adds new ones', () => {
    const host = document.createElement('div');
    host.className = 'user-a';

    const applier = createOwnedTwTokenApplier(host);

    applier.apply(['bg-red-500', 'opacity-50']);
    expect(host.classList.contains('bg-red-500')).toBe(true);
    expect(host.classList.contains('opacity-50')).toBe(true);

    applier.apply(['bg-blue-500']); // replace
    expect(host.classList.contains('bg-red-500')).toBe(false);
    expect(host.classList.contains('opacity-50')).toBe(false);
    expect(host.classList.contains('bg-blue-500')).toBe(true);

    // user class preserved
    expect(host.classList.contains('user-a')).toBe(true);
  });

  it('apply([]) clears all owned tokens', () => {
    const host = document.createElement('div');
    host.className = 'user-a';

    const applier = createOwnedTwTokenApplier(host);
    applier.apply(['bg-red-500', 'opacity-50']);
    applier.apply([]);

    expect(host.classList.contains('bg-red-500')).toBe(false);
    expect(host.classList.contains('opacity-50')).toBe(false);
    expect(host.classList.contains('user-a')).toBe(true);
  });

  it('idempotent: applying same tokens does not change owned set', () => {
    const host = document.createElement('div');
    const applier = createOwnedTwTokenApplier(host);

    applier.apply(['bg-red-500', 'bg-red-500', '']);
    const owned1 = Array.from(applier.getOwned());

    applier.apply(['bg-red-500']);
    const owned2 = Array.from(applier.getOwned());

    expect(owned1).toEqual(owned2);
    expect(owned2).toEqual(['bg-red-500']);
  });
});
