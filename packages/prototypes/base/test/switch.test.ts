import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent, setElementProps } from '@proto.ui/adapter-web-component';
import { switchRoot, switchThumb } from '../src/switch';

AdaptToWebComponent(switchRoot as any);
AdaptToWebComponent(switchThumb as any);

describe('prototypes/base: switch', () => {
  it('switch-root reuses toggle semantics for checked state and checkedChange', async () => {
    const root = document.createElement('base-switch-root') as any;
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    const exposes = root.getExposes() as any;
    expect(exposes.checked.get()).toBe(false);

    root.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(exposes.checked.get()).toBe(true);
    root.remove();
    await Promise.resolve();
  });

  it('switch-thumb reads root checked through anatomy runtime access', async () => {
    const root = document.createElement('base-switch-root') as any;
    const thumb = document.createElement('base-switch-thumb') as any;
    root.appendChild(thumb);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    const rootExposes = root.getExposes();
    const thumbExposes = thumb.getExposes();

    expect(thumbExposes.isChecked()).toBe(false);

    root.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(thumbExposes.isChecked()).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('disabled switch-root suppresses checked changes', async () => {
    const root = document.createElement('base-switch-root') as any;
    setElementProps(root, { disabled: true });
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    const exposes = root.getExposes() as any;
    root.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(exposes.checked.get()).toBe(false);
    root.remove();
    await Promise.resolve();
  });
});
