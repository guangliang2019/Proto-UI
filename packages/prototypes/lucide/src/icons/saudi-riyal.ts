// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'saudi-riyal' as const;
export const LUCIDE_SAUDI_RIYAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm20 19.5-5.5 1.2' }),
  svg.path({ d: 'M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2' }),
  svg.path({ d: 'm2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2' }),
  svg.path({ d: 'M20 10 4 13.5' }),
];

export function renderLucideSaudiRiyalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SAUDI_RIYAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-saudi-riyal-icon',
  prototypeName: 'lucide-saudi-riyal-icon',
  shapeFactory: LUCIDE_SAUDI_RIYAL_SHAPE_FACTORY,
});

export const asLucideSaudiRiyalIcon = fixed.asHook;
export const lucideSaudiRiyalIcon = fixed.prototype;
export default lucideSaudiRiyalIcon;
