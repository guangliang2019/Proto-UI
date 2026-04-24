// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-start' as const;
export const LUCIDE_LIST_START_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 5h6' }),
  svg.path({ d: 'M3 12h13' }),
  svg.path({ d: 'M3 19h13' }),
  svg.path({ d: 'm16 8-3-3 3-3' }),
  svg.path({ d: 'M21 19V7a2 2 0 0 0-2-2h-6' }),
];

export function renderLucideListStartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_START_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-start-icon',
  prototypeName: 'lucide-list-start-icon',
  shapeFactory: LUCIDE_LIST_START_SHAPE_FACTORY,
});

export const asLucideListStartIcon = fixed.asHook;
export const lucideListStartIcon = fixed.prototype;
export default lucideListStartIcon;
