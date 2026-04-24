// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'castle' as const;
export const LUCIDE_CASTLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 5V3' }),
  svg.path({ d: 'M14 5V3' }),
  svg.path({ d: 'M15 21v-3a3 3 0 0 0-6 0v3' }),
  svg.path({ d: 'M18 3v8' }),
  svg.path({ d: 'M18 5H6' }),
  svg.path({ d: 'M22 11H2' }),
  svg.path({ d: 'M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9' }),
  svg.path({ d: 'M6 3v8' }),
];

export function renderLucideCastleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CASTLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-castle-icon',
  prototypeName: 'lucide-castle-icon',
  shapeFactory: LUCIDE_CASTLE_SHAPE_FACTORY,
});

export const asLucideCastleIcon = fixed.asHook;
export const lucideCastleIcon = fixed.prototype;
export default lucideCastleIcon;
