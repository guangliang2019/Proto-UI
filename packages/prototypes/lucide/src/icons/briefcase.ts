// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'briefcase' as const;
export const LUCIDE_BRIEFCASE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' }),
  svg.rect({ width: 20, height: 14, x: 2, y: 6, rx: 2 }),
];

export function renderLucideBriefcaseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BRIEFCASE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-briefcase-icon',
  prototypeName: 'lucide-briefcase-icon',
  shapeFactory: LUCIDE_BRIEFCASE_SHAPE_FACTORY,
});

export const asLucideBriefcaseIcon = fixed.asHook;
export const lucideBriefcaseIcon = fixed.prototype;
export default lucideBriefcaseIcon;
