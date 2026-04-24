// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'link-2-off' as const;
export const LUCIDE_LINK_2_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9 17H7A5 5 0 0 1 7 7' }),
  svg.path({ d: 'M15 7h2a5 5 0 0 1 4 8' }),
  svg.line({ x1: 8, x2: 12, y1: 12, y2: 12 }),
  svg.line({ x1: 2, x2: 22, y1: 2, y2: 22 }),
];

export function renderLucideLink2OffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LINK_2_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-link-2-off-icon',
  prototypeName: 'lucide-link-2-off-icon',
  shapeFactory: LUCIDE_LINK_2_OFF_SHAPE_FACTORY,
});

export const asLucideLink2OffIcon = fixed.asHook;
export const lucideLink2OffIcon = fixed.prototype;
export default lucideLink2OffIcon;
