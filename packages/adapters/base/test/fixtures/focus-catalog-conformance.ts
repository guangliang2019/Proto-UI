import { describe, expect, it } from 'vitest';
import { definePrototype, type Prototype } from '@proto.ui/core';
import { asFocusable, asFocusEntry, asFocusRoving } from '@proto.ui/hooks';

export type FocusCatalogTree = { proto: Prototype; children?: FocusCatalogTree[] };
export type FocusCatalogMount = {
  host: HTMLElement;
  flush(): Promise<void>;
  click(target: HTMLElement): Promise<void>;
  unmount(): Promise<void>;
};

export function focusCatalogAdapterConformance(
  name: string,
  mount: (tree: FocusCatalogTree[]) => Promise<FocusCatalogMount>
) {
  describe(`${name}: Focus catalog translation`, () => {
    it('T-FOCUS-0002-CASE-ENTRY: delegates to a descendant and uses self only as fallback', async () => {
      let entry!: ReturnType<typeof asFocusEntry>;
      const proto = definePrototype({
        name: `focus-entry-${name}-catalog`,
        setup() {
          entry = asFocusEntry();
          entry.configure({ strategy: 'descendant-first', fallback: 'self' });
          return (r) => r.el('button', 'entry target');
        },
      });
      const mounted = await mount([{ proto }]);
      try {
        await mounted.flush();
        const root = mounted.host.querySelector<HTMLElement>('[data-pui-root]')!;
        const button = root.querySelector('button')!;
        expect(root.hasAttribute('tabindex')).toBe(false);
        entry.focus();
        await mounted.flush();
        expect(document.activeElement).toBe(button);
        button.blur();
        entry.setDisabled(true);
        entry.focus();
        expect(document.activeElement).not.toBe(button);
        button.disabled = true;
        entry.setDisabled(false);
        expect(root.tabIndex).toBe(0);
        entry.focus();
        expect(document.activeElement).toBe(root);
      } finally {
        await mounted.unmount();
      }
    });

    it('T-FOCUS-0002-CASE-ROVING: logical membership preserves programmatic focus outside Tab order', async () => {
      let roving!: ReturnType<typeof asFocusRoving>;
      const members: Array<ReturnType<typeof asFocusable>> = [];
      const parent = definePrototype({
        name: `focus-roving-${name}-catalog`,
        setup() {
          roving = asFocusRoving();
          roving.configure({ loop: false, orientation: 'horizontal' });
          return (r) => r.slot();
        },
      });
      const children = [0, 1].map((index) =>
        definePrototype({
          name: `focus-item-${name}-catalog-${index}`,
          setup() {
            members[index] = asFocusable();
            members[index].configure({ navParticipation: index ? 'none' : 'auto' });
            return (r) => r.el('span', String(index));
          },
        })
      );
      for (let generation = 0; generation < 2; generation++) {
        const mounted = await mount([
          { proto: parent, children: children.map((proto) => ({ proto })) },
        ]);
        try {
          await mounted.flush();
          const roots = mounted.host.querySelectorAll<HTMLElement>('[data-pui-root]');
          expect(roots[1].tabIndex).toBe(0);
          expect(roots[2].tabIndex).toBe(-1);
          roving.focusFirst();
          await mounted.flush();
          expect(document.activeElement).toBe(roots[1]);
          expect(members[0].focused.get()).toBe(true);
          roving.focusNext();
          await mounted.flush();
          expect(document.activeElement).toBe(roots[2]);
          expect(members[0].focused.get()).toBe(false);
          expect(members[1].focused.get()).toBe(true);
          members[0].setDisabled(true);
          members[0].focus();
          expect(document.activeElement).toBe(roots[2]);
        } finally {
          await mounted.unmount();
        }
      }
    });
  });
}
