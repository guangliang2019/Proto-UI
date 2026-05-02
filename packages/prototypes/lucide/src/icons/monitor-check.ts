// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-check' as const;
export const LUCIDE_MONITOR_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm9 10 2 2 4-4' }),
  svg.rect({ width: 20, height: 14, x: 2, y: 3, rx: 2 }),
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'M8 21h8' }),
];

export function renderLucideMonitorCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-check-icon',
  prototypeName: 'lucide-monitor-check-icon',
  shapeFactory: LUCIDE_MONITOR_CHECK_SHAPE_FACTORY,
});

export const asLucideMonitorCheckIcon = fixed.asHook;
export const lucideMonitorCheckIcon = fixed.prototype;
export default lucideMonitorCheckIcon;
