// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'microwave' as const;
export const LUCIDE_MICROWAVE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 15, x: 2, y: 4, rx: 2 }),
  svg.rect({ width: 8, height: 7, x: 6, y: 8, rx: 1 }),
  svg.path({ d: 'M18 8v7' }),
  svg.path({ d: 'M6 19v2' }),
  svg.path({ d: 'M18 19v2' }),
];

export function renderLucideMicrowaveIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MICROWAVE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-microwave-icon',
  prototypeName: 'lucide-microwave-icon',
  shapeFactory: LUCIDE_MICROWAVE_SHAPE_FACTORY,
});

export const asLucideMicrowaveIcon = fixed.asHook;
export const lucideMicrowaveIcon = fixed.prototype;
export default lucideMicrowaveIcon;
