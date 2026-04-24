// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tram-front' as const;
export const LUCIDE_TRAM_FRONT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 16, height: 16, x: 4, y: 3, rx: 2 }),
  svg.path({ d: 'M4 11h16' }),
  svg.path({ d: 'M12 3v8' }),
  svg.path({ d: 'm8 19-2 3' }),
  svg.path({ d: 'm18 22-2-3' }),
  svg.path({ d: 'M8 15h.01' }),
  svg.path({ d: 'M16 15h.01' }),
];

export function renderLucideTramFrontIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRAM_FRONT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tram-front-icon',
  prototypeName: 'lucide-tram-front-icon',
  shapeFactory: LUCIDE_TRAM_FRONT_SHAPE_FACTORY,
});

export const asLucideTramFrontIcon = fixed.asHook;
export const lucideTramFrontIcon = fixed.prototype;
export default lucideTramFrontIcon;
