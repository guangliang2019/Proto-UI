// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dice-3' as const;
export const LUCIDE_DICE_3_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
  svg.path({ d: 'M16 8h.01' }),
  svg.path({ d: 'M12 12h.01' }),
  svg.path({ d: 'M8 16h.01' }),
];

export function renderLucideDice3Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DICE_3_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dice-3-icon',
  prototypeName: 'lucide-dice-3-icon',
  shapeFactory: LUCIDE_DICE_3_SHAPE_FACTORY,
});

export const asLucideDice3Icon = fixed.asHook;
export const lucideDice3Icon = fixed.prototype;
export default lucideDice3Icon;
