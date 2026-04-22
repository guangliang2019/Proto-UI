import { describe, expect, it } from 'vitest';
import { createRendererPrimitives } from '@proto.ui/core';
import { renderTemplateToReact } from '../src/template';

describe('adapter-react: template svg', () => {
  it('renders svg node tree with explicit svg props', () => {
    const { svg } = createRendererPrimitives();
    const template = svg.root(
      { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      [svg.path({ d: 'M6 9l6 6 6-6' })]
    );

    const runtime = {
      createElement(type: any, props: any, ...children: any[]) {
        return { type, props, children };
      },
    };

    const out = renderTemplateToReact(runtime, template);
    expect(out.type).toBe('svg');
    expect(out.props).toMatchObject({
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
    });
    expect(out.children[0]).toMatchObject({
      type: 'path',
      props: { d: 'M6 9l6 6 6-6' },
    });
  });
});
