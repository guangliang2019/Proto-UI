// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'boom-box' as const;
export const LUCIDE_BOOM_BOX_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4' }),
  svg.path({ d: 'M8 8v1' }),
  svg.path({ d: 'M12 8v1' }),
  svg.path({ d: 'M16 8v1' }),
  svg.rect({ width: 20, height: 12, x: 2, y: 9, rx: 2 }),
  svg.circle({ cx: 8, cy: 15, r: 2 }),
  svg.circle({ cx: 16, cy: 15, r: 2 }),
];

export function renderLucideBoomBoxIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOM_BOX_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-boom-box-icon',
  prototypeName: 'lucide-boom-box-icon',
  shapeFactory: LUCIDE_BOOM_BOX_SHAPE_FACTORY,
});

export const asLucideBoomBoxIcon = fixed.asHook;
export const lucideBoomBoxIcon = fixed.prototype;
export default lucideBoomBoxIcon;
