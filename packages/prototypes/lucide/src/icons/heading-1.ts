// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heading-1' as const;
export const LUCIDE_HEADING_1_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 12h8' }),
  svg.path({ d: 'M4 18V6' }),
  svg.path({ d: 'M12 18V6' }),
  svg.path({ d: 'm17 12 3-2v8' }),
];

export function renderLucideHeading1Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEADING_1_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heading-1-icon',
  prototypeName: 'lucide-heading-1-icon',
  shapeFactory: LUCIDE_HEADING_1_SHAPE_FACTORY,
});

export const asLucideHeading1Icon = fixed.asHook;
export const lucideHeading1Icon = fixed.prototype;
export default lucideHeading1Icon;
