import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent, setElementProps } from '@proto.ui/adapter-web-component';
import { dropdownContent, dropdownItem, dropdownRoot, dropdownTrigger } from '../src/dropdown';

AdaptToWebComponent(dropdownRoot as any);
AdaptToWebComponent(dropdownTrigger as any);
AdaptToWebComponent(dropdownContent as any);
AdaptToWebComponent(dropdownItem as any);

describe('prototypes/base: dropdown', () => {
  it('uncontrolled dropdown trigger toggles content visibility', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;

    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.getExposes().open.get()).toBe(true);
    expect(content.classList.contains('hidden')).toBe(false);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('outside pointerdown closes dropdown through boundary classification', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;

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

  it('controlled dropdown root synchronizes from props updates', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;

    setElementProps(root, { open: true });
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.getExposes().open.get()).toBe(true);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);

    setElementProps(root, { open: false });
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('dropdown item closes the content on commit', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const item = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true });

    content.appendChild(item);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    item.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.classList.contains('hidden')).toBe(true);
    expect(document.activeElement).toBe(trigger);

    root.remove();
    await Promise.resolve();
  });

  it('opening dropdown focuses the first enabled item', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

    setElementProps(itemA, { value: 'a', textValue: 'Alpha', disabled: true });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(document.activeElement).toBe(itemB);

    root.remove();
    await Promise.resolve();
  });

  it('trigger arrow key opens dropdown and focuses boundary items', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

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
    expect(document.activeElement).toBe(itemA);

    trigger.focus();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await Promise.resolve();
    await Promise.resolve();

    expect(document.activeElement).toBe(itemB);

    root.remove();
    await Promise.resolve();
  });

  it.each(['Enter', ' '])(
    'trigger key %j opens dropdown and focuses the first enabled item',
    async (key) => {
      const root = document.createElement('base-dropdown-root') as any;
      const trigger = document.createElement('base-dropdown-trigger') as any;
      const content = document.createElement('base-dropdown-content') as any;
      const itemA = document.createElement('base-dropdown-item') as any;
      const itemB = document.createElement('base-dropdown-item') as any;

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
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      await Promise.resolve();
      await Promise.resolve();

      expect(root.getExposes().open.get()).toBe(true);
      expect(document.activeElement).toBe(itemA);

      root.remove();
      await Promise.resolve();
    }
  );

  it('first arrow key after trigger-open continues item roving', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;
    const itemC = document.createElement('base-dropdown-item') as any;

    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });
    setElementProps(itemC, { value: 'c', textValue: 'Gamma' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    content.appendChild(itemC);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    trigger.focus();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await Promise.resolve();
    await Promise.resolve();
    expect(document.activeElement).toBe(itemA);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await Promise.resolve();
    await Promise.resolve();
    expect(document.activeElement).toBe(itemB);

    root.remove();
    await Promise.resolve();
  });

  it.each(['Enter', ' '])(
    'trigger keyboard activation %j opens dropdown once even if host synthesizes click',
    async (key) => {
      const root = document.createElement('base-dropdown-root') as any;
      const trigger = document.createElement('base-dropdown-trigger') as any;
      const content = document.createElement('base-dropdown-content') as any;

      root.appendChild(trigger);
      root.appendChild(content);
      document.body.appendChild(root);

      await Promise.resolve();
      await Promise.resolve();

      trigger.focus();
      window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
      await Promise.resolve();
      await Promise.resolve();

      expect(root.getExposes().open.get()).toBe(true);
      expect(content.getExposes().open.get()).toBe(true);

      root.remove();
      await Promise.resolve();
    }
  );

  it('dropdown items support roving focus with arrow and boundary keys', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;
    const itemC = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true });
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

    expect(document.activeElement).toBe(itemA);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await Promise.resolve();
    expect(document.activeElement).toBe(itemB);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    await Promise.resolve();
    expect(document.activeElement).toBe(itemC);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    await Promise.resolve();
    expect(document.activeElement).toBe(itemA);

    root.remove();
    await Promise.resolve();
  });

  it('dropdown items expose active item state', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(itemA.getExposes().active.get()).toBe(true);
    expect(itemB.getExposes().active.get()).toBe(false);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await Promise.resolve();
    await Promise.resolve();

    expect(itemA.getExposes().active.get()).toBe(false);
    expect(itemB.getExposes().active.get()).toBe(true);

    itemA.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
    await Promise.resolve();

    expect(itemA.getExposes().active.get()).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('dropdown supports typeahead and skips disabled items', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;
    const itemC = document.createElement('base-dropdown-item') as any;
    const itemD = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b1', textValue: 'Beta', disabled: true });
    setElementProps(itemC, { value: 'b2', textValue: 'Blue' });
    setElementProps(itemD, { value: 'g', textValue: 'Gamma' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    content.appendChild(itemC);
    content.appendChild(itemD);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    await Promise.resolve();
    await Promise.resolve();

    expect(document.activeElement).toBe(itemC);
    expect(itemC.getExposes().active.get()).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g' }));
    await Promise.resolve();
    await Promise.resolve();

    expect(document.activeElement).toBe(itemD);
    expect(itemD.getExposes().active.get()).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('keyboard activation commits active item and closes uncontrolled dropdown', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(itemB.getExposes().active.get()).toBe(true);

    itemB.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(itemA.getExposes().active.get()).toBe(false);
    expect(itemB.getExposes().active.get()).toBe(false);
    expect(document.activeElement).toBe(trigger);

    root.remove();
    await Promise.resolve();
  });

  it('root closeOnItemCommit=false keeps dropdown open after item commit', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true, closeOnItemCommit: false });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });

    content.appendChild(itemA);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    itemA.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(itemA.getExposes().active.get()).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('item closeOnCommit overrides root commit-close policy', async () => {
    const rootClose = document.createElement('base-dropdown-root') as any;
    const contentClose = document.createElement('base-dropdown-content') as any;
    const itemClose = document.createElement('base-dropdown-item') as any;

    setElementProps(rootClose, { defaultOpen: true, closeOnItemCommit: false });
    setElementProps(itemClose, { value: 'a', textValue: 'Alpha', closeOnCommit: true });

    contentClose.appendChild(itemClose);
    rootClose.appendChild(contentClose);
    document.body.appendChild(rootClose);

    await Promise.resolve();
    await Promise.resolve();

    itemClose.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(rootClose.getExposes().open.get()).toBe(false);
    expect(itemClose.getExposes().active.get()).toBe(false);

    rootClose.remove();
    await Promise.resolve();

    const rootKeep = document.createElement('base-dropdown-root') as any;
    const contentKeep = document.createElement('base-dropdown-content') as any;
    const itemKeep = document.createElement('base-dropdown-item') as any;

    setElementProps(rootKeep, { defaultOpen: true, closeOnItemCommit: false });
    setElementProps(itemKeep, { value: 'b', textValue: 'Beta', closeOnCommit: false });

    contentKeep.appendChild(itemKeep);
    rootKeep.appendChild(contentKeep);
    document.body.appendChild(rootKeep);

    await Promise.resolve();
    await Promise.resolve();

    itemKeep.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(rootKeep.getExposes().open.get()).toBe(true);
    expect(itemKeep.getExposes().active.get()).toBe(true);

    rootKeep.remove();
    await Promise.resolve();
  });

  it('disabled item does not become active on pointer enter or commit close the dropdown', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta', disabled: true });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(itemA.getExposes().active.get()).toBe(true);
    expect(itemB.getExposes().active.get()).toBe(false);

    itemB.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
    await Promise.resolve();
    expect(itemA.getExposes().active.get()).toBe(true);
    expect(itemB.getExposes().active.get()).toBe(false);

    itemB.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    expect(root.getExposes().open.get()).toBe(true);
    expect(itemA.getExposes().active.get()).toBe(true);
    expect(itemB.getExposes().active.get()).toBe(false);

    root.remove();
    await Promise.resolve();
  });

  it('escape closes dropdown and clears active item state', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });

    content.appendChild(itemA);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(itemA.getExposes().active.get()).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(itemA.getExposes().active.get()).toBe(false);

    root.remove();
    await Promise.resolve();
  });

  it('trigger toggle closes dropdown and clears active item state', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });

    content.appendChild(itemA);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(itemA.getExposes().active.get()).toBe(true);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(itemA.getExposes().active.get()).toBe(false);

    root.remove();
    await Promise.resolve();
  });

  it('closing and reopening dropdown does not preserve prior active item as selection state', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    itemB.focus();
    await Promise.resolve();

    expect(itemB.getExposes().active.get()).toBe(true);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(itemA.getExposes().active.get()).toBe(false);
    expect(itemB.getExposes().active.get()).toBe(false);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(itemB.getExposes().active.get()).toBe(false);
    expect(document.activeElement).toBe(itemA);

    root.remove();
    await Promise.resolve();
  });

  it('openEntry=first ignores prior active item when reopening', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { defaultOpen: true, openEntry: 'first' });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    itemB.focus();
    await Promise.resolve();
    expect(itemB.getExposes().active.get()).toBe(true);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(document.activeElement).toBe(itemA);
    expect(itemB.getExposes().active.get()).toBe(false);

    root.remove();
    await Promise.resolve();
  });

  it('openEntry=value-or-first focuses the configured item when opening', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { openEntry: 'value-or-first', openEntryValue: 'b' });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(document.activeElement).toBe(itemB);

    root.remove();
    await Promise.resolve();
  });

  it('openEntry=value-or-first falls back to first enabled item when target is disabled or missing', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const trigger = document.createElement('base-dropdown-trigger') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

    setElementProps(root, { openEntry: 'value-or-first', openEntryValue: 'b' });
    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta', disabled: true });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(document.activeElement).toBe(itemA);
    expect(itemB.getExposes().active.get()).toBe(false);

    root.remove();
    await Promise.resolve();
  });

  it('dropdown root exposes ordered collection snapshots from items', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta', disabled: true });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().getCollectionCount()).toBe(2);
    expect(root.getExposes().getCollectionItems()).toEqual([
      {
        value: 'a',
        textValue: 'Alpha',
        disabled: false,
        index: 0,
        total: 2,
        first: true,
        last: false,
      },
      {
        value: 'b',
        textValue: 'Beta',
        disabled: true,
        index: 1,
        total: 2,
        first: false,
        last: true,
      },
    ]);

    expect(itemA.getExposes().collectionIndex.get()).toBe(0);
    expect(itemB.getExposes().collectionIndex.get()).toBe(1);

    root.remove();
    await Promise.resolve();
  });

  it('dropdown root collection snapshots reflect reordered items', async () => {
    const root = document.createElement('base-dropdown-root') as any;
    const content = document.createElement('base-dropdown-content') as any;
    const itemA = document.createElement('base-dropdown-item') as any;
    const itemB = document.createElement('base-dropdown-item') as any;

    setElementProps(itemA, { value: 'a', textValue: 'Alpha' });
    setElementProps(itemB, { value: 'b', textValue: 'Beta' });

    content.appendChild(itemA);
    content.appendChild(itemB);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    const parent = itemA.parentNode as Node;
    parent.insertBefore(itemB, itemA);
    await Promise.resolve();
    await Promise.resolve();

    expect(
      root
        .getExposes()
        .getCollectionItems()
        .map((item: any) => item.value)
    ).toEqual(['b', 'a']);
    expect(root.getExposes().getCollectionItems()).toEqual([
      {
        value: 'b',
        textValue: 'Beta',
        disabled: false,
        index: 0,
        total: 2,
        first: true,
        last: false,
      },
      {
        value: 'a',
        textValue: 'Alpha',
        disabled: false,
        index: 1,
        total: 2,
        first: false,
        last: true,
      },
    ]);
    expect(itemA.getExposes().getCollectionItem()).toMatchObject({
      value: 'a',
      index: 1,
      total: 2,
      first: false,
      last: true,
    });
    expect(itemB.getExposes().getCollectionItem()).toMatchObject({
      value: 'b',
      index: 0,
      total: 2,
      first: true,
      last: false,
    });

    root.remove();
    await Promise.resolve();
  });
});
