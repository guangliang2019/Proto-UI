// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-pilcrow' as const;
export const LUCIDE_SQUARE_PILCROW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M12 12H9.5a2.5 2.5 0 0 1 0-5H17' }),
  svg.path({ d: 'M12 7v10' }),
  svg.path({ d: 'M16 7v10' }),
];

export function renderLucideSquarePilcrowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_PILCROW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-pilcrow-icon',
  prototypeName: 'lucide-square-pilcrow-icon',
  shapeFactory: LUCIDE_SQUARE_PILCROW_SHAPE_FACTORY,
});

export const asLucideSquarePilcrowIcon = fixed.asHook;
export const lucideSquarePilcrowIcon = fixed.prototype;
export default lucideSquarePilcrowIcon;
