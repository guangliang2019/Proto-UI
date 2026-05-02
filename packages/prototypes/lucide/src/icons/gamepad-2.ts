// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gamepad-2' as const;
export const LUCIDE_GAMEPAD_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 6, x2: 10, y1: 11, y2: 11 }),
  svg.line({ x1: 8, x2: 8, y1: 9, y2: 13 }),
  svg.line({ x1: 15, x2: 15.01, y1: 12, y2: 12 }),
  svg.line({ x1: 18, x2: 18.01, y1: 10, y2: 10 }),
  svg.path({
    d: 'M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z',
  }),
];

export function renderLucideGamepad2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GAMEPAD_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gamepad-2-icon',
  prototypeName: 'lucide-gamepad-2-icon',
  shapeFactory: LUCIDE_GAMEPAD_2_SHAPE_FACTORY,
});

export const asLucideGamepad2Icon = fixed.asHook;
export const lucideGamepad2Icon = fixed.prototype;
export default lucideGamepad2Icon;
