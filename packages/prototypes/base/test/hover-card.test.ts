import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent, setElementProps } from '@proto.ui/adapter-web-component';
import { hoverCardContent, hoverCardRoot, hoverCardTrigger } from '../src/hover-card';

AdaptToWebComponent(hoverCardRoot as any);
AdaptToWebComponent(hoverCardTrigger as any);
AdaptToWebComponent(hoverCardContent as any);

describe('prototypes/base: hover-card', () => {
  it('opens from trigger hover and stays open while content is hovered', async () => {
    const root = document.createElement('base-hover-card-root') as any;
    const trigger = document.createElement('base-hover-card-trigger') as any;
    const content = document.createElement('base-hover-card-content') as any;

    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    trigger.dispatchEvent(new Event('pointerenter'));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.getExposes().open.get()).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);

    content.dispatchEvent(new Event('pointerenter'));
    trigger.dispatchEvent(new Event('pointerleave'));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);

    content.dispatchEvent(new Event('pointerleave'));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('controlled root ignores hover-driven open changes', async () => {
    const root = document.createElement('base-hover-card-root') as any;
    const trigger = document.createElement('base-hover-card-trigger') as any;
    const content = document.createElement('base-hover-card-content') as any;

    setElementProps(root, { open: false });
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    trigger.dispatchEvent(new Event('pointerenter'));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    setElementProps(root, { open: true });
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);

    root.remove();
    await Promise.resolve();
  });
});
