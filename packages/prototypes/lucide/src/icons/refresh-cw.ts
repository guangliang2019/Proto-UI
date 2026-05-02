// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'refresh-cw' as const;
export const LUCIDE_REFRESH_CW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' }),
  svg.path({ d: 'M21 3v5h-5' }),
  svg.path({ d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' }),
  svg.path({ d: 'M8 16H3v5' }),
];

export function renderLucideRefreshCwIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REFRESH_CW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-refresh-cw-icon',
  prototypeName: 'lucide-refresh-cw-icon',
  shapeFactory: LUCIDE_REFRESH_CW_SHAPE_FACTORY,
});

export const asLucideRefreshCwIcon = fixed.asHook;
export const lucideRefreshCwIcon = fixed.prototype;
export default lucideRefreshCwIcon;
