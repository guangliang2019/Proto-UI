// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'popsicle' as const;
export const LUCIDE_POPSICLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z',
  }),
  svg.path({ d: 'm22 22-5.5-5.5' }),
];

export function renderLucidePopsicleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_POPSICLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-popsicle-icon',
  prototypeName: 'lucide-popsicle-icon',
  shapeFactory: LUCIDE_POPSICLE_SHAPE_FACTORY,
});

export const asLucidePopsicleIcon = fixed.asHook;
export const lucidePopsicleIcon = fixed.prototype;
export default lucidePopsicleIcon;
