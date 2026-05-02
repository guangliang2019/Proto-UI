// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'table-of-contents' as const;
export const LUCIDE_TABLE_OF_CONTENTS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 5H3' }),
  svg.path({ d: 'M16 12H3' }),
  svg.path({ d: 'M16 19H3' }),
  svg.path({ d: 'M21 5h.01' }),
  svg.path({ d: 'M21 12h.01' }),
  svg.path({ d: 'M21 19h.01' }),
];

export function renderLucideTableOfContentsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLE_OF_CONTENTS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-table-of-contents-icon',
  prototypeName: 'lucide-table-of-contents-icon',
  shapeFactory: LUCIDE_TABLE_OF_CONTENTS_SHAPE_FACTORY,
});

export const asLucideTableOfContentsIcon = fixed.asHook;
export const lucideTableOfContentsIcon = fixed.prototype;
export default lucideTableOfContentsIcon;
