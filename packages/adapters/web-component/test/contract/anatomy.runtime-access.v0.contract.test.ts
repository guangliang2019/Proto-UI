import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent } from '@proto.ui/adapter-web-component';
import { createAnatomyFamily, type Prototype } from '@proto.ui/core';

const FAMILY = createAnatomyFamily('select-runtime-access');

function registerFamily(def: any) {
  def.anatomy.family(FAMILY, {
    roles: {
      root: { cardinality: { min: 1, max: 1 } },
      content: { cardinality: { min: 0, max: 1 } },
      item: { cardinality: { min: 0, max: 10 } },
    },
    relations: [{ kind: 'contains', parent: 'root', child: 'content' }],
  });
}

describe('contract: adapter-web-component / anatomy runtime access (v0)', () => {
  it('allows a part to read exposes from other parts in the same domain', async () => {
    const calls: string[] = [];

    const Root: Prototype = {
      name: 'x-anatomy-root-1',
      setup(def) {
        registerFamily(def);
        def.anatomy.claim(FAMILY, { role: 'root' });
        return (r) => [r.r.slot()];
      },
    };

    const Content: Prototype = {
      name: 'x-anatomy-content-1',
      setup(def) {
        registerFamily(def);
        def.anatomy.claim(FAMILY, { role: 'content' });
        def.expose.method('close', () => calls.push('close'));
        return (r) => [r.r.slot()];
      },
    };

    const Item: Prototype = {
      name: 'x-anatomy-item-1',
      setup(def) {
        registerFamily(def);
        def.anatomy.claim(FAMILY, { role: 'item' });
        def.lifecycle.onMounted((run) => {
          const content = run.anatomy.partsOf(FAMILY, 'content')[0] ?? null;
          const close = (content?.getExpose('close') as (() => void) | null) ?? null;
          close?.();
        });
        return (r) => [r.el('button', 'item')];
      },
    };

    AdaptToWebComponent(Root);
    AdaptToWebComponent(Content);
    AdaptToWebComponent(Item);

    const root = document.createElement('x-anatomy-root-1');
    const content = document.createElement('x-anatomy-content-1');
    const item = document.createElement('x-anatomy-item-1');
    content.appendChild(item);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    expect(calls).toEqual(['close']);

    root.remove();
    await Promise.resolve();
  });
});
