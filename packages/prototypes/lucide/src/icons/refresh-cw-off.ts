// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'refresh-cw-off' as const;
export const LUCIDE_REFRESH_CW_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47' }),
  svg.path({ d: 'M8 16H3v5' }),
  svg.path({ d: 'M3 12C3 9.51 4 7.26 5.64 5.64' }),
  svg.path({ d: 'm3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64' }),
  svg.path({ d: 'M21 12c0 1-.16 1.97-.47 2.87' }),
  svg.path({ d: 'M21 3v5h-5' }),
  svg.path({ d: 'M22 22 2 2' }),
];

export function renderLucideRefreshCwOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REFRESH_CW_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-refresh-cw-off-icon',
  prototypeName: 'lucide-refresh-cw-off-icon',
  shapeFactory: LUCIDE_REFRESH_CW_OFF_SHAPE_FACTORY,
});

export const asLucideRefreshCwOffIcon = fixed.asHook;
export const lucideRefreshCwOffIcon = fixed.prototype;
export default lucideRefreshCwOffIcon;
