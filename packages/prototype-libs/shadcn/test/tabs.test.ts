import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent, setElementProps } from '@proto-ui/adapters.web-component';
import { tabsContent, tabsList, tabsRoot, tabsTrigger } from '../src/tabs';

AdaptToWebComponent(tabsRoot as any);
AdaptToWebComponent(tabsList as any);
AdaptToWebComponent(tabsTrigger as any);
AdaptToWebComponent(tabsContent as any);

describe('prototype-libs/shadcn: tabs', () => {
  it('runs as a compound tabs family with trigger selection and content switching', async () => {
    const root = document.createElement('shadcn-tabs-root') as any;
    const list = document.createElement('shadcn-tabs-list') as any;
    const triggerA = document.createElement('shadcn-tabs-trigger') as any;
    const triggerB = document.createElement('shadcn-tabs-trigger') as any;
    const contentA = document.createElement('shadcn-tabs-content') as any;
    const contentB = document.createElement('shadcn-tabs-content') as any;

    setElementProps(root, { defaultValue: 'a' });
    setElementProps(triggerA, { value: 'a' });
    setElementProps(triggerB, { value: 'b' });
    setElementProps(contentA, { value: 'a' });
    setElementProps(contentB, { value: 'b' });

    list.appendChild(triggerA);
    list.appendChild(triggerB);
    root.appendChild(list);
    root.appendChild(contentA);
    root.appendChild(contentB);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().value.get()).toBe('a');
    expect(triggerA.getExposes().selected.get()).toBe(true);
    expect(contentA.getExposes().current.get()).toBe(true);
    expect(triggerA.hasAttribute('data-selected')).toBe(true);
    expect(triggerA.getAttribute('aria-selected')).toBe('true');
    expect(triggerA.className.includes('aria-selected:bg-background')).toBe(true);
    expect(contentA.className.includes('block')).toBe(true);
    expect(contentB.classList.contains('hidden')).toBe(true);

    triggerB.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(root.getExposes().value.get()).toBe('b');
    expect(triggerB.getExposes().selected.get()).toBe(true);
    expect(contentB.getExposes().current.get()).toBe(true);
    expect(triggerB.hasAttribute('data-selected')).toBe(true);
    expect(triggerB.getAttribute('aria-selected')).toBe('true');
    expect(triggerB.className.includes('aria-selected:bg-background')).toBe(true);
    expect(contentA.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });
});
