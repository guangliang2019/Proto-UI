// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dumbbell' as const;
export const LUCIDE_DUMBBELL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z',
  }),
  svg.path({ d: 'm2.5 21.5 1.4-1.4' }),
  svg.path({ d: 'm20.1 3.9 1.4-1.4' }),
  svg.path({
    d: 'M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z',
  }),
  svg.path({ d: 'm9.6 14.4 4.8-4.8' }),
];

export function renderLucideDumbbellIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DUMBBELL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dumbbell-icon',
  prototypeName: 'lucide-dumbbell-icon',
  shapeFactory: LUCIDE_DUMBBELL_SHAPE_FACTORY,
});

export const asLucideDumbbellIcon = fixed.asHook;
export const lucideDumbbellIcon = fixed.prototype;
export default lucideDumbbellIcon;
