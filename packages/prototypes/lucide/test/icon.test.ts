import { describe, expect, it } from 'vitest';
import { createRendererPrimitives, isSvgTemplateNode, type TemplateChildren } from '@proto.ui/core';
import type { RuntimeHost } from '@proto.ui/runtime';
import { executeWithHost } from '@proto.ui/runtime';
import lucideIcon from '../src/icon/icon';
import { renderLucideIcon } from '../src/icon/render';

describe('prototypes/lucide: icon', () => {
  it('renderLucideIcon() returns svg root node from renderer.svg', () => {
    const { svg } = createRendererPrimitives();
    const node = renderLucideIcon({ svg } as any, {
      name: 'chevron-down',
      size: 20,
      strokeWidth: 1.5,
    });

    expect(isSvgTemplateNode(node)).toBe(true);
    if (!isSvgTemplateNode(node)) return;
    expect(node.tag).toBe('svg');
    if (node.tag !== 'svg') return;
    expect(node.props.width).toBe(20);
    expect(node.props.height).toBe(20);
    expect(node.props.strokeWidth).toBe(1.5);
    expect(node.children).toMatchObject({
      kind: 'svg-node',
      tag: 'path',
      props: { d: 'm6 9 6 6 6-6' },
    });
  });

  it('lucide-icon prototype renders the requested icon with validated props', () => {
    let rawProps: Record<string, unknown> = {
      name: 'x',
      size: 18,
      strokeWidth: 1.25,
      stroke: 'red',
    };
    let committed: TemplateChildren = null;

    const host: RuntimeHost<any> = {
      prototypeName: 'x-lucide-icon',
      getRawProps() {
        return rawProps as any;
      },
      commit(children, signal) {
        committed = children;
        signal?.done();
      },
      schedule(task) {
        task();
      },
    };

    const { controller } = executeWithHost(lucideIcon as any, host as any);
    expect(isSvgTemplateNode(committed)).toBe(true);
    const root = committed as any;
    expect(root.tag).toBe('svg');
    expect(root.props.width).toBe(18);
    expect(root.props.strokeWidth).toBe(1.25);
    expect(root.props.stroke).toBe('red');

    const firstChildren = Array.isArray(root.children) ? root.children : [root.children];
    expect(firstChildren).toHaveLength(2);
    expect(firstChildren[0]?.tag).toBe('path');
    expect(firstChildren[1]?.tag).toBe('path');

    rawProps = { name: 'check' };
    controller.applyRawProps(rawProps as any);
    controller.update();

    const nextRoot = committed as any;
    expect(nextRoot.tag).toBe('svg');
    expect(nextRoot.props.width).toBe(18);
    expect(nextRoot.props.strokeWidth).toBe(1.25);
    expect(nextRoot.props.stroke).toBe('red');
    expect(nextRoot.children?.tag).toBe('path');
  });
});
