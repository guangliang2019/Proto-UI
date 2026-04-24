// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heading-6' as const;
export const LUCIDE_HEADING_6_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 12h8' }),
  svg.path({ d: 'M4 18V6' }),
  svg.path({ d: 'M12 18V6' }),
  svg.circle({ cx: 19, cy: 16, r: 2 }),
  svg.path({ d: 'M20 10c-2 2-3 3.5-3 6' }),
];

export function renderLucideHeading6Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEADING_6_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heading-6-icon',
  prototypeName: 'lucide-heading-6-icon',
  shapeFactory: LUCIDE_HEADING_6_SHAPE_FACTORY,
});

export const asLucideHeading6Icon = fixed.asHook;
export const lucideHeading6Icon = fixed.prototype;
export default lucideHeading6Icon;
