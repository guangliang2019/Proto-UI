// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'search-alert' as const;
export const LUCIDE_SEARCH_ALERT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 11, cy: 11, r: 8 }),
  svg.path({ d: 'm21 21-4.3-4.3' }),
  svg.path({ d: 'M11 7v4' }),
  svg.path({ d: 'M11 15h.01' }),
];

export function renderLucideSearchAlertIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEARCH_ALERT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-search-alert-icon',
  prototypeName: 'lucide-search-alert-icon',
  shapeFactory: LUCIDE_SEARCH_ALERT_SHAPE_FACTORY,
});

export const asLucideSearchAlertIcon = fixed.asHook;
export const lucideSearchAlertIcon = fixed.prototype;
export default lucideSearchAlertIcon;
