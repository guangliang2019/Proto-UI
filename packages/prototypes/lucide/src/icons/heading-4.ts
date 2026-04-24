// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heading-4' as const;
export const LUCIDE_HEADING_4_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 18V6' }),
  svg.path({ d: 'M17 10v3a1 1 0 0 0 1 1h3' }),
  svg.path({ d: 'M21 10v8' }),
  svg.path({ d: 'M4 12h8' }),
  svg.path({ d: 'M4 18V6' }),
];

export function renderLucideHeading4Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEADING_4_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heading-4-icon',
  prototypeName: 'lucide-heading-4-icon',
  shapeFactory: LUCIDE_HEADING_4_SHAPE_FACTORY,
});

export const asLucideHeading4Icon = fixed.asHook;
export const lucideHeading4Icon = fixed.prototype;
export default lucideHeading4Icon;
