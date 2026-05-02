// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-off' as const;
export const LUCIDE_MONITOR_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M8 21h8' }),
  svg.path({ d: 'M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042' }),
];

export function renderLucideMonitorOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-off-icon',
  prototypeName: 'lucide-monitor-off-icon',
  shapeFactory: LUCIDE_MONITOR_OFF_SHAPE_FACTORY,
});

export const asLucideMonitorOffIcon = fixed.asHook;
export const lucideMonitorOffIcon = fixed.prototype;
export default lucideMonitorOffIcon;
