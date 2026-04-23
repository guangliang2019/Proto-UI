// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ban' as const;
export const LUCIDE_BAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M4.929 4.929 19.07 19.071' }),
];

export function renderLucideBanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ban-icon',
  prototypeName: 'lucide-ban-icon',
  shapeFactory: LUCIDE_BAN_SHAPE_FACTORY,
});

export const asLucideBanIcon = fixed.asHook;
export const lucideBanIcon = fixed.prototype;
export default lucideBanIcon;
