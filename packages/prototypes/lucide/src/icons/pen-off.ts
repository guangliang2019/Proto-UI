// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pen-off' as const;
export const LUCIDE_PEN_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982',
  }),
  svg.path({ d: 'm12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353' }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucidePenOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PEN_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pen-off-icon',
  prototypeName: 'lucide-pen-off-icon',
  shapeFactory: LUCIDE_PEN_OFF_SHAPE_FACTORY,
});

export const asLucidePenOffIcon = fixed.asHook;
export const lucidePenOffIcon = fixed.prototype;
export default lucidePenOffIcon;
