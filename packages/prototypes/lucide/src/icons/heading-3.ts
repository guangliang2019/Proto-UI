// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heading-3' as const;
export const LUCIDE_HEADING_3_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 12h8' }),
  svg.path({ d: 'M4 18V6' }),
  svg.path({ d: 'M12 18V6' }),
  svg.path({ d: 'M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2' }),
  svg.path({ d: 'M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2' }),
];

export function renderLucideHeading3Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEADING_3_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heading-3-icon',
  prototypeName: 'lucide-heading-3-icon',
  shapeFactory: LUCIDE_HEADING_3_SHAPE_FACTORY,
});

export const asLucideHeading3Icon = fixed.asHook;
export const lucideHeading3Icon = fixed.prototype;
export default lucideHeading3Icon;
