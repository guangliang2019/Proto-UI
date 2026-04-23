// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'log-out' as const;
export const LUCIDE_LOG_OUT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 17 5-5-5-5' }),
  svg.path({ d: 'M21 12H9' }),
  svg.path({ d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }),
];

export function renderLucideLogOutIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOG_OUT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-log-out-icon',
  prototypeName: 'lucide-log-out-icon',
  shapeFactory: LUCIDE_LOG_OUT_SHAPE_FACTORY,
});

export const asLucideLogOutIcon = fixed.asHook;
export const lucideLogOutIcon = fixed.prototype;
export default lucideLogOutIcon;
