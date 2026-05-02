// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heading-5' as const;
export const LUCIDE_HEADING_5_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 12h8' }),
  svg.path({ d: 'M4 18V6' }),
  svg.path({ d: 'M12 18V6' }),
  svg.path({ d: 'M17 13v-3h4' }),
  svg.path({ d: 'M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17' }),
];

export function renderLucideHeading5Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEADING_5_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heading-5-icon',
  prototypeName: 'lucide-heading-5-icon',
  shapeFactory: LUCIDE_HEADING_5_SHAPE_FACTORY,
});

export const asLucideHeading5Icon = fixed.asHook;
export const lucideHeading5Icon = fixed.prototype;
export default lucideHeading5Icon;
