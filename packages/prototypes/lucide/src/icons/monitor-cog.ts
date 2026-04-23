// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-cog' as const;
export const LUCIDE_MONITOR_COG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'm14.305 7.53.923-.382' }),
  svg.path({ d: 'm15.228 4.852-.923-.383' }),
  svg.path({ d: 'm16.852 3.228-.383-.924' }),
  svg.path({ d: 'm16.852 8.772-.383.923' }),
  svg.path({ d: 'm19.148 3.228.383-.924' }),
  svg.path({ d: 'm19.53 9.696-.382-.924' }),
  svg.path({ d: 'm20.772 4.852.924-.383' }),
  svg.path({ d: 'm20.772 7.148.924.383' }),
  svg.path({ d: 'M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7' }),
  svg.path({ d: 'M8 21h8' }),
  svg.circle({ cx: 18, cy: 6, r: 3 }),
];

export function renderLucideMonitorCogIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_COG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-cog-icon',
  prototypeName: 'lucide-monitor-cog-icon',
  shapeFactory: LUCIDE_MONITOR_COG_SHAPE_FACTORY,
});

export const asLucideMonitorCogIcon = fixed.asHook;
export const lucideMonitorCogIcon = fixed.prototype;
export default lucideMonitorCogIcon;
