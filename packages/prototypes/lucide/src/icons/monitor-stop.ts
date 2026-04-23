// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-stop' as const;
export const LUCIDE_MONITOR_STOP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'M8 21h8' }),
  svg.rect({ x: 2, y: 3, width: 20, height: 14, rx: 2 }),
  svg.rect({ x: 9, y: 7, width: 6, height: 6, rx: 1 }),
];

export function renderLucideMonitorStopIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_STOP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-stop-icon',
  prototypeName: 'lucide-monitor-stop-icon',
  shapeFactory: LUCIDE_MONITOR_STOP_SHAPE_FACTORY,
});

export const asLucideMonitorStopIcon = fixed.asHook;
export const lucideMonitorStopIcon = fixed.prototype;
export default lucideMonitorStopIcon;
