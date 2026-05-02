// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-cloud' as const;
export const LUCIDE_MONITOR_CLOUD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z' }),
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'M8 21h8' }),
  svg.rect({ x: 2, y: 3, width: 20, height: 14, rx: 2 }),
];

export function renderLucideMonitorCloudIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_CLOUD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-cloud-icon',
  prototypeName: 'lucide-monitor-cloud-icon',
  shapeFactory: LUCIDE_MONITOR_CLOUD_SHAPE_FACTORY,
});

export const asLucideMonitorCloudIcon = fixed.asHook;
export const lucideMonitorCloudIcon = fixed.prototype;
export default lucideMonitorCloudIcon;
