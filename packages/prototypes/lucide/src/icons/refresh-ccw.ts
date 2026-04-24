// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'refresh-ccw' as const;
export const LUCIDE_REFRESH_CCW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' }),
  svg.path({ d: 'M3 3v5h5' }),
  svg.path({ d: 'M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16' }),
  svg.path({ d: 'M16 16h5v5' }),
];

export function renderLucideRefreshCcwIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REFRESH_CCW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-refresh-ccw-icon',
  prototypeName: 'lucide-refresh-ccw-icon',
  shapeFactory: LUCIDE_REFRESH_CCW_SHAPE_FACTORY,
});

export const asLucideRefreshCcwIcon = fixed.asHook;
export const lucideRefreshCcwIcon = fixed.prototype;
export default lucideRefreshCcwIcon;
