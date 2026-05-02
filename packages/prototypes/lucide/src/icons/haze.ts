// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'haze' as const;
export const LUCIDE_HAZE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm5.2 6.2 1.4 1.4' }),
  svg.path({ d: 'M2 13h2' }),
  svg.path({ d: 'M20 13h2' }),
  svg.path({ d: 'm17.4 7.6 1.4-1.4' }),
  svg.path({ d: 'M22 17H2' }),
  svg.path({ d: 'M22 21H2' }),
  svg.path({ d: 'M16 13a4 4 0 0 0-8 0' }),
  svg.path({ d: 'M12 5V2.5' }),
];

export function renderLucideHazeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HAZE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-haze-icon',
  prototypeName: 'lucide-haze-icon',
  shapeFactory: LUCIDE_HAZE_SHAPE_FACTORY,
});

export const asLucideHazeIcon = fixed.asHook;
export const lucideHazeIcon = fixed.prototype;
export default lucideHazeIcon;
