import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent } from '@proto.ui/adapter-web-component';
import {
  dialogRoot,
  dialogTrigger,
  dialogMask,
  dialogContent,
  dialogTitle,
  dialogDescription,
  dialogClose,
} from '@proto.ui/prototypes-base';

function registerDialogWcs() {
  const prototypes = [
    dialogRoot,
    dialogTrigger,
    dialogMask,
    dialogContent,
    dialogTitle,
    dialogDescription,
    dialogClose,
  ];

  for (const proto of prototypes) {
    const wcName = 'wc-' + proto.name;
    if (!customElements.get(wcName)) {
      const Ctor = AdaptToWebComponent(proto, { register: false, registerAs: wcName });
      customElements.define(wcName, Ctor);
    }
  }
}

describe('adapter-web-component: dialog overlay', () => {
  it('sets body overflow hidden on open and restores on close (modal)', async () => {
    registerDialogWcs();

    const root = document.createElement('wc-base-dialog-root') as any;
    const trigger = document.createElement('wc-base-dialog-trigger') as any;
    const mask = document.createElement('wc-base-dialog-mask') as any;
    const content = document.createElement('wc-base-dialog-content') as any;
    const close = document.createElement('wc-base-dialog-close') as any;

    root.appendChild(trigger);
    root.appendChild(mask);
    root.appendChild(content);
    content.appendChild(close);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    const originalOverflow = document.body.style.overflow;

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(document.body.style.overflow).toBe('hidden');

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(document.body.style.overflow).toBe(originalOverflow);

    root.remove();
  });

  it('closes dialog on ESC key', async () => {
    registerDialogWcs();

    const root = document.createElement('wc-base-dialog-root') as any;
    const trigger = document.createElement('wc-base-dialog-trigger') as any;
    const content = document.createElement('wc-base-dialog-content') as any;

    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    trigger.click();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(content.classList.contains('hidden')).toBe(false);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(content.classList.contains('hidden')).toBe(true);

    root.remove();
    document.body.style.overflow = '';
  });

  it('closes dialog on close button click', async () => {
    registerDialogWcs();

    const root = document.createElement('wc-base-dialog-root') as any;
    const trigger = document.createElement('wc-base-dialog-trigger') as any;
    const closeBtn = document.createElement('wc-base-dialog-close') as any;
    const content = document.createElement('wc-base-dialog-content') as any;

    root.appendChild(trigger);
    root.appendChild(content);
    content.appendChild(closeBtn);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    trigger.click();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(content.classList.contains('hidden')).toBe(false);

    closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(content.classList.contains('hidden')).toBe(true);

    root.remove();
    document.body.style.overflow = '';
  });
});
