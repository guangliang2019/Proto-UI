// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pill' as const;
export const LUCIDE_PILL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z' }),
  svg.path({ d: 'm8.5 8.5 7 7' }),
];

export function renderLucidePillIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PILL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pill-icon',
  prototypeName: 'lucide-pill-icon',
  shapeFactory: LUCIDE_PILL_SHAPE_FACTORY,
});

export const asLucidePillIcon = fixed.asHook;
export const lucidePillIcon = fixed.prototype;
export default lucidePillIcon;
