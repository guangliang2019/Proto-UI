// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'activity' as const;
export const LUCIDE_ACTIVITY_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2',
  });

export function renderLucideActivityIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ACTIVITY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-activity-icon',
  prototypeName: 'lucide-activity-icon',
  shapeFactory: LUCIDE_ACTIVITY_SHAPE_FACTORY,
});

export const asLucideActivityIcon = fixed.asHook;
export const lucideActivityIcon = fixed.prototype;
export default lucideActivityIcon;
