// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'luggage' as const;
export const LUCIDE_LUGGAGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2' }),
  svg.path({ d: 'M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14' }),
  svg.path({ d: 'M10 20h4' }),
  svg.circle({ cx: 16, cy: 20, r: 2 }),
  svg.circle({ cx: 8, cy: 20, r: 2 }),
];

export function renderLucideLuggageIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LUGGAGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-luggage-icon',
  prototypeName: 'lucide-luggage-icon',
  shapeFactory: LUCIDE_LUGGAGE_SHAPE_FACTORY,
});

export const asLucideLuggageIcon = fixed.asHook;
export const lucideLuggageIcon = fixed.prototype;
export default lucideLuggageIcon;
