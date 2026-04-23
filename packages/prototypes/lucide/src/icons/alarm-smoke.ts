// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'alarm-smoke' as const;
export const LUCIDE_ALARM_SMOKE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 21c0-2.5 2-2.5 2-5' }),
  svg.path({ d: 'M16 21c0-2.5 2-2.5 2-5' }),
  svg.path({ d: 'm19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8' }),
  svg.path({ d: 'M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z' }),
  svg.path({ d: 'M6 21c0-2.5 2-2.5 2-5' }),
];

export function renderLucideAlarmSmokeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALARM_SMOKE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-alarm-smoke-icon',
  prototypeName: 'lucide-alarm-smoke-icon',
  shapeFactory: LUCIDE_ALARM_SMOKE_SHAPE_FACTORY,
});

export const asLucideAlarmSmokeIcon = fixed.asHook;
export const lucideAlarmSmokeIcon = fixed.prototype;
export default lucideAlarmSmokeIcon;
