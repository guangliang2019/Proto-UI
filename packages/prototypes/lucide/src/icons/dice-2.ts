// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dice-2' as const;
export const LUCIDE_DICE_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
  svg.path({ d: 'M15 9h.01' }),
  svg.path({ d: 'M9 15h.01' }),
];

export function renderLucideDice2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DICE_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dice-2-icon',
  prototypeName: 'lucide-dice-2-icon',
  shapeFactory: LUCIDE_DICE_2_SHAPE_FACTORY,
});

export const asLucideDice2Icon = fixed.asHook;
export const lucideDice2Icon = fixed.prototype;
export default lucideDice2Icon;
