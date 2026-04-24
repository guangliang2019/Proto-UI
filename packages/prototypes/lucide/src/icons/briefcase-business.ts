// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'briefcase-business' as const;
export const LUCIDE_BRIEFCASE_BUSINESS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 12h.01' }),
  svg.path({ d: 'M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2' }),
  svg.path({ d: 'M22 13a18.15 18.15 0 0 1-20 0' }),
  svg.rect({ width: 20, height: 14, x: 2, y: 6, rx: 2 }),
];

export function renderLucideBriefcaseBusinessIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BRIEFCASE_BUSINESS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-briefcase-business-icon',
  prototypeName: 'lucide-briefcase-business-icon',
  shapeFactory: LUCIDE_BRIEFCASE_BUSINESS_SHAPE_FACTORY,
});

export const asLucideBriefcaseBusinessIcon = fixed.asHook;
export const lucideBriefcaseBusinessIcon = fixed.prototype;
export default lucideBriefcaseBusinessIcon;
