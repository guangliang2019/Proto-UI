// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dice-1' as const;
export const LUCIDE_DICE_1_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
  svg.path({ d: 'M12 12h.01' }),
];

export function renderLucideDice1Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DICE_1_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dice-1-icon',
  prototypeName: 'lucide-dice-1-icon',
  shapeFactory: LUCIDE_DICE_1_SHAPE_FACTORY,
});

export const asLucideDice1Icon = fixed.asHook;
export const lucideDice1Icon = fixed.prototype;
export default lucideDice1Icon;
