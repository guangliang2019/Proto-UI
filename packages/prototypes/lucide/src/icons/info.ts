// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'info' as const;
export const LUCIDE_INFO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M12 16v-4' }),
  svg.path({ d: 'M12 8h.01' }),
];

export function renderLucideInfoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_INFO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-info-icon',
  prototypeName: 'lucide-info-icon',
  shapeFactory: LUCIDE_INFO_SHAPE_FACTORY,
});

export const asLucideInfoIcon = fixed.asHook;
export const lucideInfoIcon = fixed.prototype;
export default lucideInfoIcon;
