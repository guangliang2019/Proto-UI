// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-alert' as const;
export const LUCIDE_CLOUD_ALERT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 12v4' }),
  svg.path({ d: 'M12 20h.01' }),
  svg.path({ d: 'M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642' }),
];

export function renderLucideCloudAlertIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_ALERT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-alert-icon',
  prototypeName: 'lucide-cloud-alert-icon',
  shapeFactory: LUCIDE_CLOUD_ALERT_SHAPE_FACTORY,
});

export const asLucideCloudAlertIcon = fixed.asHook;
export const lucideCloudAlertIcon = fixed.prototype;
export default lucideCloudAlertIcon;
