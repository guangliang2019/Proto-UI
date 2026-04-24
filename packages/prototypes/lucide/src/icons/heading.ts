// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heading' as const;
export const LUCIDE_HEADING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 12h12' }),
  svg.path({ d: 'M6 20V4' }),
  svg.path({ d: 'M18 20V4' }),
];

export function renderLucideHeadingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEADING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heading-icon',
  prototypeName: 'lucide-heading-icon',
  shapeFactory: LUCIDE_HEADING_SHAPE_FACTORY,
});

export const asLucideHeadingIcon = fixed.asHook;
export const lucideHeadingIcon = fixed.prototype;
export default lucideHeadingIcon;
