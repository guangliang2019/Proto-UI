import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent, setElementProps } from '@proto.ui/adapter-web-component';
import { dropdownContent, dropdownItem, dropdownRoot, dropdownTrigger } from '../src/dropdown';

AdaptToWebComponent(dropdownRoot as any);
AdaptToWebComponent(dropdownTrigger as any);
AdaptToWebComponent(dropdownContent as any);
AdaptToWebComponent(dropdownItem as any);

describe('prototypes/shadcn: dropdown', () => {
  it('styles and opens a dropdown-menu compound prototype', async () => {
    const root = document.createElement('shadcn-dropdown-root') as any;
    const trigger = document.createElement('shadcn-dropdown-trigger') as any;
    const content = document.createElement('shadcn-dropdown-content') as any;
    const itemA = document.createElement('shadcn-dropdown-item') as any;
    const itemB = document.createElement('shadcn-dropdown-item') as any;

    setElementProps(itemA, { value: 'new', textValue: 'New File' });
    setElementProps(itemB, { value: 'share', textValue: 'Share', disabled: true });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(trigger.className.includes('rounded-md')).toBe(true);
    expect(content.classList.contains('hidden')).toBe(true);
    expect(itemA.className.includes('rounded-lg')).toBe(true);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.className.includes('rounded-xl')).toBe(true);
    expect(content.className.includes('shadow-lg')).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);
    expect(document.activeElement).toBe(itemA);
    expect(itemB.className.includes('opacity-50')).toBe(true);

    itemA.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);

    root.remove();
    await Promise.resolve();
  });

  it('closes on outside pointerdown via inherited boundary behavior', async () => {
    const root = document.createElement('shadcn-dropdown-root') as any;
    const trigger = document.createElement('shadcn-dropdown-trigger') as any;
    const content = document.createElement('shadcn-dropdown-content') as any;
    const item = document.createElement('shadcn-dropdown-item') as any;

    setElementProps(item, { value: 'new', textValue: 'New File' });

    content.appendChild(item);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);

    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });
});
