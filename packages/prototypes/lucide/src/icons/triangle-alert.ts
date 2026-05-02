// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'triangle-alert' as const;
export const LUCIDE_TRIANGLE_ALERT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' }),
  svg.path({ d: 'M12 9v4' }),
  svg.path({ d: 'M12 17h.01' }),
];

export function renderLucideTriangleAlertIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRIANGLE_ALERT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-triangle-alert-icon',
  prototypeName: 'lucide-triangle-alert-icon',
  shapeFactory: LUCIDE_TRIANGLE_ALERT_SHAPE_FACTORY,
});

export const asLucideTriangleAlertIcon = fixed.asHook;
export const lucideTriangleAlertIcon = fixed.prototype;
export default lucideTriangleAlertIcon;
