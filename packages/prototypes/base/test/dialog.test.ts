import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent, setElementProps } from '@proto.ui/adapter-web-component';
import {
  dialogClose,
  dialogContent,
  dialogOverlay,
  dialogRoot,
  dialogTrigger,
} from '../src/dialog';

AdaptToWebComponent(dialogRoot as any);
AdaptToWebComponent(dialogTrigger as any);
AdaptToWebComponent(dialogOverlay as any);
AdaptToWebComponent(dialogContent as any);
AdaptToWebComponent(dialogClose as any);

describe('prototypes/base: dialog', () => {
  it('uncontrolled root toggles open from trigger click and closes from close click', async () => {
    const root = document.createElement('base-dialog-root') as any;
    const trigger = document.createElement('base-dialog-trigger') as any;
    const overlay = document.createElement('base-dialog-overlay') as any;
    const content = document.createElement('base-dialog-content') as any;
    const close = document.createElement('base-dialog-close') as any;

    root.appendChild(trigger);
    root.appendChild(overlay);
    root.appendChild(content);
    content.appendChild(close);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);
    expect(overlay.classList.contains('hidden')).toBe(true);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);
    expect(overlay.classList.contains('hidden')).toBe(false);

    close.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);
    expect(overlay.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('controlled root synchronizes open from props and ignores trigger/close clicks', async () => {
    const root = document.createElement('base-dialog-root') as any;
    const trigger = document.createElement('base-dialog-trigger') as any;
    const overlay = document.createElement('base-dialog-overlay') as any;
    const content = document.createElement('base-dialog-content') as any;
    const close = document.createElement('base-dialog-close') as any;

    setElementProps(root, { open: false });
    root.appendChild(trigger);
    root.appendChild(overlay);
    root.appendChild(content);
    content.appendChild(close);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    setElementProps(root, { open: true });
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);
    expect(overlay.classList.contains('hidden')).toBe(false);

    close.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);

    setElementProps(root, { open: false });
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);
    expect(overlay.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('ESC closes dialog content', async () => {
    const root = document.createElement('base-dialog-root') as any;
    const trigger = document.createElement('base-dialog-trigger') as any;
    const overlay = document.createElement('base-dialog-overlay') as any;
    const content = document.createElement('base-dialog-content') as any;

    setElementProps(root, { defaultOpen: true });
    root.appendChild(trigger);
    root.appendChild(overlay);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('outside press closes dialog content', async () => {
    const root = document.createElement('base-dialog-root') as any;
    const trigger = document.createElement('base-dialog-trigger') as any;
    const overlay = document.createElement('base-dialog-overlay') as any;
    const content = document.createElement('base-dialog-content') as any;

    setElementProps(root, { defaultOpen: true });
    root.appendChild(trigger);
    root.appendChild(overlay);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);

    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('alert=true prevents outside press from closing but ESC still closes', async () => {
    const root = document.createElement('base-dialog-root') as any;
    const trigger = document.createElement('base-dialog-trigger') as any;
    const overlay = document.createElement('base-dialog-overlay') as any;
    const content = document.createElement('base-dialog-content') as any;

    setElementProps(root, { defaultOpen: true });
    setElementProps(content, { alert: true });
    root.appendChild(trigger);
    root.appendChild(overlay);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);

    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('overlay and content transition states synchronize with root.open changes', async () => {
    const root = document.createElement('base-dialog-root') as any;
    const trigger = document.createElement('base-dialog-trigger') as any;
    const overlay = document.createElement('base-dialog-overlay') as any;
    const content = document.createElement('base-dialog-content') as any;

    root.appendChild(trigger);
    root.appendChild(overlay);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(overlay.getExposes().transitionState.get()).toBe('closed');
    expect(content.getExposes().transitionState.get()).toBe('closed');

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(overlay.getExposes().transitionState.get()).toBe('entering');
    expect(content.getExposes().transitionState.get()).toBe('entering');

    overlay.getExposes().controls.complete();
    content.getExposes().controls.complete();
    await Promise.resolve();

    expect(overlay.getExposes().transitionState.get()).toBe('entered');
    expect(content.getExposes().transitionState.get()).toBe('entered');

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(overlay.getExposes().transitionState.get()).toBe('leaving');
    expect(content.getExposes().transitionState.get()).toBe('leaving');

    overlay.getExposes().controls.complete();
    content.getExposes().controls.complete();
    await Promise.resolve();

    expect(overlay.getExposes().transitionState.get()).toBe('closed');
    expect(content.getExposes().transitionState.get()).toBe('closed');

    root.remove();
    await Promise.resolve();
  });
});
