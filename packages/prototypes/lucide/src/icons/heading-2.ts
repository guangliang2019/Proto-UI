// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heading-2' as const;
export const LUCIDE_HEADING_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 12h8' }),
  svg.path({ d: 'M4 18V6' }),
  svg.path({ d: 'M12 18V6' }),
  svg.path({ d: 'M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1' }),
];

export function renderLucideHeading2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEADING_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heading-2-icon',
  prototypeName: 'lucide-heading-2-icon',
  shapeFactory: LUCIDE_HEADING_2_SHAPE_FACTORY,
});

export const asLucideHeading2Icon = fixed.asHook;
export const lucideHeading2Icon = fixed.prototype;
export default lucideHeading2Icon;
