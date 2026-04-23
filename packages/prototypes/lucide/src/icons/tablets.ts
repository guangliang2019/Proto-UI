// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tablets' as const;
export const LUCIDE_TABLETS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 7, cy: 7, r: 5 }),
  svg.circle({ cx: 17, cy: 17, r: 5 }),
  svg.path({ d: 'M12 17h10' }),
  svg.path({ d: 'm3.46 10.54 7.08-7.08' }),
];

export function renderLucideTabletsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLETS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tablets-icon',
  prototypeName: 'lucide-tablets-icon',
  shapeFactory: LUCIDE_TABLETS_SHAPE_FACTORY,
});

export const asLucideTabletsIcon = fixed.asHook;
export const lucideTabletsIcon = fixed.prototype;
export default lucideTabletsIcon;
