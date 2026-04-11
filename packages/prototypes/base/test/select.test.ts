import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent, setElementProps } from '@proto.ui/adapter-web-component';
import { selectContent, selectItem, selectRoot, selectTrigger, selectValue } from '../src/select';

AdaptToWebComponent(selectRoot as any);
AdaptToWebComponent(selectTrigger as any);
AdaptToWebComponent(selectValue as any);
AdaptToWebComponent(selectContent as any);
AdaptToWebComponent(selectItem as any);

describe('prototypes/base: select', () => {
  it('select-value renders placeholder, then selected item text after commit', async () => {
    const root = document.createElement('base-select-root') as any;
    const trigger = document.createElement('base-select-trigger') as any;
    const value = document.createElement('base-select-value') as any;
    const content = document.createElement('base-select-content') as any;
    const itemA = document.createElement('base-select-item') as any;
    const itemB = document.createElement('base-select-item') as any;

    setElementProps(value, { placeholder: 'Pick one' });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(trigger);
    root.appendChild(value);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(value.textContent).toBe('Pick one');
    expect(root.getExposes().value.get()).toBe('');

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    itemB.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().value.get()).toBe('b');
    expect(root.getExposes().textValue.get()).toBe('Beta');
    expect(value.textContent).toBe('Beta');
    expect(content.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('controlled select root synchronizes selected value text from props', async () => {
    const root = document.createElement('base-select-root') as any;
    const value = document.createElement('base-select-value') as any;
    const content = document.createElement('base-select-content') as any;
    const itemA = document.createElement('base-select-item') as any;
    const itemB = document.createElement('base-select-item') as any;

    setElementProps(root, { value: 'a' });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(value);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().value.get()).toBe('a');
    expect(value.textContent).toBe('Alpha');
    expect(itemA.getExposes().selected.get()).toBe(true);
    expect(itemB.getExposes().selected.get()).toBe(false);

    setElementProps(root, { value: 'b' });
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().value.get()).toBe('b');
    expect(root.getExposes().textValue.get()).toBe('Beta');
    expect(value.textContent).toBe('Beta');
    expect(itemA.getExposes().selected.get()).toBe(false);
    expect(itemB.getExposes().selected.get()).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('selected item text changes propagate to select-value without changing selected value', async () => {
    const root = document.createElement('base-select-root') as any;
    const value = document.createElement('base-select-value') as any;
    const content = document.createElement('base-select-content') as any;
    const itemA = document.createElement('base-select-item') as any;
    const itemB = document.createElement('base-select-item') as any;

    setElementProps(root, { defaultValue: 'b' });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(value);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().value.get()).toBe('b');
    expect(root.getExposes().textValue.get()).toBe('Beta');
    expect(value.textContent).toBe('Beta');

    setElementProps(itemB, { value: 'b', textValue: 'Beta v2' });
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().value.get()).toBe('b');
    expect(root.getExposes().textValue.get()).toBe('Beta v2');
    expect(value.textContent).toBe('Beta v2');

    root.remove();
    await Promise.resolve();
  });

  it('trigger arrow key opens select and focuses the selected item', async () => {
    const root = document.createElement('base-select-root') as any;
    const trigger = document.createElement('base-select-trigger') as any;
    const content = document.createElement('base-select-content') as any;
    const itemA = document.createElement('base-select-item') as any;
    const itemB = document.createElement('base-select-item') as any;

    setElementProps(root, { defaultValue: 'b' });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    trigger.focus();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(document.activeElement).toBe(itemB);
    expect(itemB.getExposes().active.get()).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('select items support roving focus with arrow and boundary keys', async () => {
    const root = document.createElement('base-select-root') as any;
    const content = document.createElement('base-select-content') as any;
    const itemA = document.createElement('base-select-item') as any;
    const itemB = document.createElement('base-select-item') as any;
    const itemC = document.createElement('base-select-item') as any;

    setElementProps(root, { defaultOpen: true, defaultValue: 'b' });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });
    setElementProps(itemC, { value: 'c', textValue: 'Gamma' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    content.appendChild(itemC);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(document.activeElement).toBe(itemB);
    expect(itemB.getExposes().active.get()).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await Promise.resolve();
    await Promise.resolve();
    expect(document.activeElement).toBe(itemC);
    expect(itemC.getExposes().active.get()).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await Promise.resolve();
    await Promise.resolve();
    expect(document.activeElement).toBe(itemB);
    expect(itemB.getExposes().active.get()).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    await Promise.resolve();
    await Promise.resolve();
    expect(document.activeElement).toBe(itemA);
    expect(itemA.getExposes().active.get()).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    await Promise.resolve();
    await Promise.resolve();
    expect(document.activeElement).toBe(itemC);
    expect(itemC.getExposes().active.get()).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('arrow navigation does not skip an item after moving upward first', async () => {
    const root = document.createElement('base-select-root') as any;
    const content = document.createElement('base-select-content') as any;
    const itemA = document.createElement('base-select-item') as any;
    const itemB = document.createElement('base-select-item') as any;
    const itemC = document.createElement('base-select-item') as any;

    setElementProps(root, { defaultOpen: true, defaultValue: 'b' });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });
    setElementProps(itemC, { value: 'c', textValue: 'Gamma' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    content.appendChild(itemC);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(document.activeElement).toBe(itemB);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await Promise.resolve();
    await Promise.resolve();
    expect(document.activeElement).toBe(itemA);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await Promise.resolve();
    await Promise.resolve();
    expect(document.activeElement).toBe(itemB);
    expect(itemB.getExposes().active.get()).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('closing the content restores focus to trigger', async () => {
    const root = document.createElement('base-select-root') as any;
    const trigger = document.createElement('base-select-trigger') as any;
    const content = document.createElement('base-select-content') as any;
    const itemA = document.createElement('base-select-item') as any;
    const itemB = document.createElement('base-select-item') as any;

    setElementProps(root, { defaultValue: 'b' });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    trigger.focus();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await Promise.resolve();
    await Promise.resolve();
    expect(document.activeElement).toBe(itemB);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await Promise.resolve();
    await Promise.resolve();
    expect(root.getExposes().open.get()).toBe(false);
    expect(document.activeElement).toBe(trigger);

    root.remove();
    await Promise.resolve();
  });
});
