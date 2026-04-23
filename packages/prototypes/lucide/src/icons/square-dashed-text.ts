// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-dashed-text' as const;
export const LUCIDE_SQUARE_DASHED_TEXT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 21h1' }),
  svg.path({ d: 'M14 3h1' }),
  svg.path({ d: 'M19 3a2 2 0 0 1 2 2' }),
  svg.path({ d: 'M21 14v1' }),
  svg.path({ d: 'M21 19a2 2 0 0 1-2 2' }),
  svg.path({ d: 'M21 9v1' }),
  svg.path({ d: 'M3 14v1' }),
  svg.path({ d: 'M3 9v1' }),
  svg.path({ d: 'M5 21a2 2 0 0 1-2-2' }),
  svg.path({ d: 'M5 3a2 2 0 0 0-2 2' }),
  svg.path({ d: 'M7 12h10' }),
  svg.path({ d: 'M7 16h6' }),
  svg.path({ d: 'M7 8h8' }),
  svg.path({ d: 'M9 21h1' }),
  svg.path({ d: 'M9 3h1' }),
];

export function renderLucideSquareDashedTextIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_DASHED_TEXT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-dashed-text-icon',
  prototypeName: 'lucide-square-dashed-text-icon',
  shapeFactory: LUCIDE_SQUARE_DASHED_TEXT_SHAPE_FACTORY,
});

export const asLucideSquareDashedTextIcon = fixed.asHook;
export const lucideSquareDashedTextIcon = fixed.prototype;
export default lucideSquareDashedTextIcon;
