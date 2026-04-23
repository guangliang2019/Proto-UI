// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'contrast' as const;
export const LUCIDE_CONTRAST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M12 18a6 6 0 0 0 0-12v12z' }),
];

export function renderLucideContrastIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CONTRAST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-contrast-icon',
  prototypeName: 'lucide-contrast-icon',
  shapeFactory: LUCIDE_CONTRAST_SHAPE_FACTORY,
});

export const asLucideContrastIcon = fixed.asHook;
export const lucideContrastIcon = fixed.prototype;
export default lucideContrastIcon;
