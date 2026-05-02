// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'accessibility' as const;
export const LUCIDE_ACCESSIBILITY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 16, cy: 4, r: 1 }),
  svg.path({ d: 'm18 19 1-7-6 1' }),
  svg.path({ d: 'm5 8 3-3 5.5 3-2.36 3.5' }),
  svg.path({ d: 'M4.24 14.5a5 5 0 0 0 6.88 6' }),
  svg.path({ d: 'M13.76 17.5a5 5 0 0 0-6.88-6' }),
];

export function renderLucideAccessibilityIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ACCESSIBILITY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-accessibility-icon',
  prototypeName: 'lucide-accessibility-icon',
  shapeFactory: LUCIDE_ACCESSIBILITY_SHAPE_FACTORY,
});

export const asLucideAccessibilityIcon = fixed.asHook;
export const lucideAccessibilityIcon = fixed.prototype;
export default lucideAccessibilityIcon;
