import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent } from '@proto.ui/adapter-web-component';
import {
  dialogClose,
  dialogContent,
  dialogDescription,
  dialogMask,
  dialogRoot,
  dialogTitle,
  dialogTrigger,
} from '../src/dialog';

AdaptToWebComponent(dialogRoot as any);
AdaptToWebComponent(dialogTrigger as any);
AdaptToWebComponent(dialogMask as any);
AdaptToWebComponent(dialogContent as any);
AdaptToWebComponent(dialogTitle as any);
AdaptToWebComponent(dialogDescription as any);
AdaptToWebComponent(dialogClose as any);

describe('prototypes/shadcn: dialog', () => {
  it('styles and opens a dialog compound prototype', async () => {
    const root = document.createElement('shadcn-dialog-root') as any;
    const trigger = document.createElement('shadcn-dialog-trigger') as any;
    const mask = document.createElement('shadcn-dialog-mask') as any;
    const content = document.createElement('shadcn-dialog-content') as any;
    const title = document.createElement('shadcn-dialog-title') as any;
    const description = document.createElement('shadcn-dialog-description') as any;
    const close = document.createElement('shadcn-dialog-close') as any;

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(close);
    root.appendChild(trigger);
    root.appendChild(mask);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(trigger.className.includes('rounded-lg')).toBe(true);
    expect(content.classList.contains('hidden')).toBe(true);
    expect(mask.classList.contains('hidden')).toBe(true);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);
    expect(mask.classList.contains('hidden')).toBe(false);
    expect(content.className.includes('rounded-lg')).toBe(true);
    expect(content.className.includes('shadow-lg')).toBe(true);
    expect(title.className.includes('text-lg')).toBe(true);
    expect(description.className.includes('text-muted-foreground')).toBe(true);

    close.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);
    expect(mask.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });
});
