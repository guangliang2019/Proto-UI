import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent, setElementProps } from '@proto.ui/adapter-web-component';
import { tabsContent, tabsList, tabsRoot, tabsTrigger } from '../src/tabs';

AdaptToWebComponent(tabsRoot as any);
AdaptToWebComponent(tabsList as any);
AdaptToWebComponent(tabsTrigger as any);
AdaptToWebComponent(tabsContent as any);

describe('prototypes/base: tabs', () => {
  it('tabs root, trigger, and content stay in sync in uncontrolled mode', async () => {
    const root = document.createElement('base-tabs-root') as any;
    const list = document.createElement('base-tabs-list') as any;
    const triggerA = document.createElement('base-tabs-trigger') as any;
    const triggerB = document.createElement('base-tabs-trigger') as any;
    const contentA = document.createElement('base-tabs-content') as any;
    const contentB = document.createElement('base-tabs-content') as any;

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
    expect(triggerB.getExposes().selected.get()).toBe(false);
    expect(contentA.getExposes().current.get()).toBe(true);
    expect(contentB.getExposes().current.get()).toBe(false);
    expect(contentA.classList.contains('hidden')).toBe(false);
    expect(contentB.classList.contains('hidden')).toBe(true);

    triggerB.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(root.getExposes().value.get()).toBe('b');
    expect(triggerA.getExposes().selected.get()).toBe(false);
    expect(triggerB.getExposes().selected.get()).toBe(true);
    expect(contentA.getExposes().current.get()).toBe(false);
    expect(contentB.getExposes().current.get()).toBe(true);
    expect(contentA.classList.contains('hidden')).toBe(true);
    expect(contentB.classList.contains('hidden')).toBe(false);

    root.remove();
    await Promise.resolve();
  });

  it('controlled tabs root synchronizes from props updates', async () => {
    const root = document.createElement('base-tabs-root') as any;
    const triggerA = document.createElement('base-tabs-trigger') as any;
    const triggerB = document.createElement('base-tabs-trigger') as any;

    setElementProps(root, { value: 'b' });
    setElementProps(triggerA, { value: 'a' });
    setElementProps(triggerB, { value: 'b' });

    root.appendChild(triggerA);
    root.appendChild(triggerB);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().value.get()).toBe('b');
    setElementProps(root, { value: 'a' });
    await Promise.resolve();
    expect(root.getExposes().value.get()).toBe('a');
    expect(triggerA.getExposes().selected.get()).toBe(true);
    expect(triggerB.getExposes().selected.get()).toBe(false);

    root.remove();
    await Promise.resolve();
  });

  it('disabled trigger does not change the selected tab', async () => {
    const root = document.createElement('base-tabs-root') as any;
    const triggerA = document.createElement('base-tabs-trigger') as any;
    const triggerB = document.createElement('base-tabs-trigger') as any;

    setElementProps(root, { defaultValue: 'a' });
    setElementProps(triggerA, { value: 'a' });
    setElementProps(triggerB, { value: 'b', disabled: true });

    root.appendChild(triggerA);
    root.appendChild(triggerB);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    triggerB.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(root.getExposes().value.get()).toBe('a');
    expect(triggerA.getExposes().selected.get()).toBe(true);
    expect(triggerB.getExposes().selected.get()).toBe(false);

    root.remove();
    await Promise.resolve();
  });

  it('arrow key roving moves focus and selection across triggers in automatic mode', async () => {
    const root = document.createElement('base-tabs-root') as any;
    const list = document.createElement('base-tabs-list') as any;
    const triggerA = document.createElement('base-tabs-trigger') as any;
    const triggerB = document.createElement('base-tabs-trigger') as any;

    setElementProps(root, {
      defaultValue: 'a',
      orientation: 'horizontal',
      activationMode: 'automatic',
    });
    setElementProps(triggerA, { value: 'a' });
    setElementProps(triggerB, { value: 'b' });

    list.appendChild(triggerA);
    list.appendChild(triggerB);
    root.appendChild(list);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    triggerA.focus();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

    expect(document.activeElement).toBe(triggerB);
    expect(root.getExposes().value.get()).toBe('b');
    expect(triggerB.getExposes().selected.get()).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('manual activation mode keeps selection stable while roving focus, then commits on click', async () => {
    const root = document.createElement('base-tabs-root') as any;
    const list = document.createElement('base-tabs-list') as any;
    const triggerA = document.createElement('base-tabs-trigger') as any;
    const triggerB = document.createElement('base-tabs-trigger') as any;
    const triggerC = document.createElement('base-tabs-trigger') as any;
    const contentA = document.createElement('base-tabs-content') as any;
    const contentB = document.createElement('base-tabs-content') as any;
    const contentC = document.createElement('base-tabs-content') as any;

    setElementProps(root, {
      defaultValue: 'a',
      orientation: 'horizontal',
      activationMode: 'manual',
    });
    setElementProps(triggerA, { value: 'a' });
    setElementProps(triggerB, { value: 'b' });
    setElementProps(triggerC, { value: 'c' });
    setElementProps(contentA, { value: 'a' });
    setElementProps(contentB, { value: 'b' });
    setElementProps(contentC, { value: 'c' });

    list.appendChild(triggerA);
    list.appendChild(triggerB);
    list.appendChild(triggerC);
    root.appendChild(list);
    root.appendChild(contentA);
    root.appendChild(contentB);
    root.appendChild(contentC);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    triggerA.focus();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await Promise.resolve();
    await Promise.resolve();

    expect(document.activeElement).toBe(triggerB);
    expect(root.getExposes().value.get()).toBe('a');
    expect(triggerA.getExposes().selected.get()).toBe(true);
    expect(triggerB.getExposes().selected.get()).toBe(false);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    await Promise.resolve();
    await Promise.resolve();

    expect(document.activeElement).toBe(triggerC);
    expect(root.getExposes().value.get()).toBe('a');

    triggerC.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().value.get()).toBe('c');
    expect(triggerC.getExposes().selected.get()).toBe(true);
    expect(contentC.getExposes().current.get()).toBe(true);

    root.remove();
    await Promise.resolve();
  });
});
