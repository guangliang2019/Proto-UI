// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'link-2' as const;
export const LUCIDE_LINK_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9 17H7A5 5 0 0 1 7 7h2' }),
  svg.path({ d: 'M15 7h2a5 5 0 1 1 0 10h-2' }),
  svg.line({ x1: 8, x2: 16, y1: 12, y2: 12 }),
];

export function renderLucideLink2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LINK_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-link-2-icon',
  prototypeName: 'lucide-link-2-icon',
  shapeFactory: LUCIDE_LINK_2_SHAPE_FACTORY,
});

export const asLucideLink2Icon = fixed.asHook;
export const lucideLink2Icon = fixed.prototype;
export default lucideLink2Icon;
