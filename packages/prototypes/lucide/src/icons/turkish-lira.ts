// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'turkish-lira' as const;
export const LUCIDE_TURKISH_LIRA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 4 5 9' }),
  svg.path({ d: 'm15 8.5-10 5' }),
  svg.path({ d: 'M18 12a9 9 0 0 1-9 9V3' }),
];

export function renderLucideTurkishLiraIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TURKISH_LIRA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-turkish-lira-icon',
  prototypeName: 'lucide-turkish-lira-icon',
  shapeFactory: LUCIDE_TURKISH_LIRA_SHAPE_FACTORY,
});

export const asLucideTurkishLiraIcon = fixed.asHook;
export const lucideTurkishLiraIcon = fixed.prototype;
export default lucideTurkishLiraIcon;
