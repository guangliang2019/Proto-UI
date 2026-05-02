// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'scale' as const;
export const LUCIDE_SCALE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3v18' }),
  svg.path({ d: 'm19 8 3 8a5 5 0 0 1-6 0zV7' }),
  svg.path({ d: 'M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1' }),
  svg.path({ d: 'm5 8 3 8a5 5 0 0 1-6 0zV7' }),
  svg.path({ d: 'M7 21h10' }),
];

export function renderLucideScaleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCALE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-scale-icon',
  prototypeName: 'lucide-scale-icon',
  shapeFactory: LUCIDE_SCALE_SHAPE_FACTORY,
});

export const asLucideScaleIcon = fixed.asHook;
export const lucideScaleIcon = fixed.prototype;
export default lucideScaleIcon;
