// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'blinds' as const;
export const LUCIDE_BLINDS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 3h18' }),
  svg.path({ d: 'M20 7H8' }),
  svg.path({ d: 'M20 11H8' }),
  svg.path({ d: 'M10 19h10' }),
  svg.path({ d: 'M8 15h12' }),
  svg.path({ d: 'M4 3v14' }),
  svg.circle({ cx: 4, cy: 19, r: 2 }),
];

export function renderLucideBlindsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BLINDS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-blinds-icon',
  prototypeName: 'lucide-blinds-icon',
  shapeFactory: LUCIDE_BLINDS_SHAPE_FACTORY,
});

export const asLucideBlindsIcon = fixed.asHook;
export const lucideBlindsIcon = fixed.prototype;
export default lucideBlindsIcon;
