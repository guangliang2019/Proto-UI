// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'stethoscope' as const;
export const LUCIDE_STETHOSCOPE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 2v2' }),
  svg.path({ d: 'M5 2v2' }),
  svg.path({ d: 'M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1' }),
  svg.path({ d: 'M8 15a6 6 0 0 0 12 0v-3' }),
  svg.circle({ cx: 20, cy: 10, r: 2 }),
];

export function renderLucideStethoscopeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_STETHOSCOPE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-stethoscope-icon',
  prototypeName: 'lucide-stethoscope-icon',
  shapeFactory: LUCIDE_STETHOSCOPE_SHAPE_FACTORY,
});

export const asLucideStethoscopeIcon = fixed.asHook;
export const lucideStethoscopeIcon = fixed.prototype;
export default lucideStethoscopeIcon;
