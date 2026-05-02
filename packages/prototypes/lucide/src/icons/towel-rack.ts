// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'towel-rack' as const;
export const LUCIDE_TOWEL_RACK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 7h-2' }),
  svg.path({
    d: 'M6.5 3h11A2.5 2.5 0 0 1 20 5.5V20a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.5a1 1 0 0 0-5 0V17a1 1 0 0 0 1 1h4',
  }),
  svg.path({ d: 'M9 7H2' }),
];

export function renderLucideTowelRackIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TOWEL_RACK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-towel-rack-icon',
  prototypeName: 'lucide-towel-rack-icon',
  shapeFactory: LUCIDE_TOWEL_RACK_SHAPE_FACTORY,
});

export const asLucideTowelRackIcon = fixed.asHook;
export const lucideTowelRackIcon = fixed.prototype;
export default lucideTowelRackIcon;
