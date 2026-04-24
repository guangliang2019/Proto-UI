// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'type' as const;
export const LUCIDE_TYPE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 4v16' }),
  svg.path({ d: 'M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2' }),
  svg.path({ d: 'M9 20h6' }),
];

export function renderLucideTypeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TYPE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-type-icon',
  prototypeName: 'lucide-type-icon',
  shapeFactory: LUCIDE_TYPE_SHAPE_FACTORY,
});

export const asLucideTypeIcon = fixed.asHook;
export const lucideTypeIcon = fixed.prototype;
export default lucideTypeIcon;
