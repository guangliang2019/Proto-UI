import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent, setElementProps } from '@proto-ui/adapters.web-component';
import { switchRoot, switchThumb } from '../src/switch';

AdaptToWebComponent(switchRoot as any);
AdaptToWebComponent(switchThumb as any);

describe('prototype-libs/shadcn: switch', () => {
  it('runs as a compound switch and keeps thumb attached to root state', async () => {
    const root = document.createElement('shadcn-switch-root') as any;
    const thumb = document.createElement('shadcn-switch-thumb') as any;
    root.appendChild(thumb);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(root.getExposes().checked.get()).toBe(false);
    expect(thumb.getExposes().isChecked()).toBe(false);

    root.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(root.getExposes().checked.get()).toBe(true);
    expect(thumb.getExposes().isChecked()).toBe(true);
    expect(root.getAttribute('aria-checked')).toBe('true');
    expect(root.className.includes('aria-checked:bg-primary')).toBe(true);
    expect(root.className.includes('aria-checked:pl-[22px]')).toBe(true);
    expect(thumb.className.includes('translate-x-0')).toBe(true);

    root.remove();
    await Promise.resolve();
  });

  it('disabled shadcn switch suppresses checked changes', async () => {
    const root = document.createElement('shadcn-switch-root') as any;
    const thumb = document.createElement('shadcn-switch-thumb') as any;
    setElementProps(root, { disabled: true, defaultChecked: false });
    root.appendChild(thumb);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    root.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(root.getExposes().checked.get()).toBe(false);
    expect(thumb.getExposes().isChecked()).toBe(false);
    expect(root.hasAttribute('data-disabled')).toBe(true);

    root.remove();
    await Promise.resolve();
  });
});
