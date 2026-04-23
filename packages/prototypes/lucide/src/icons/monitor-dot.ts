// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-dot' as const;
export const LUCIDE_MONITOR_DOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693' }),
  svg.path({ d: 'M8 21h8' }),
  svg.circle({ cx: 19, cy: 6, r: 3 }),
];

export function renderLucideMonitorDotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_DOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-dot-icon',
  prototypeName: 'lucide-monitor-dot-icon',
  shapeFactory: LUCIDE_MONITOR_DOT_SHAPE_FACTORY,
});

export const asLucideMonitorDotIcon = fixed.asHook;
export const lucideMonitorDotIcon = fixed.prototype;
export default lucideMonitorDotIcon;
