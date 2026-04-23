// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'martini' as const;
export const LUCIDE_MARTINI_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 22h8' }),
  svg.path({ d: 'M12 11v11' }),
  svg.path({ d: 'm19 3-7 8-7-8Z' }),
];

export function renderLucideMartiniIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MARTINI_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-martini-icon',
  prototypeName: 'lucide-martini-icon',
  shapeFactory: LUCIDE_MARTINI_SHAPE_FACTORY,
});

export const asLucideMartiniIcon = fixed.asHook;
export const lucideMartiniIcon = fixed.prototype;
export default lucideMartiniIcon;
