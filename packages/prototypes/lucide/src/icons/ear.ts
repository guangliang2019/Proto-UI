// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ear' as const;
export const LUCIDE_EAR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0' }),
  svg.path({ d: 'M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4' }),
];

export function renderLucideEarIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EAR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ear-icon',
  prototypeName: 'lucide-ear-icon',
  shapeFactory: LUCIDE_EAR_SHAPE_FACTORY,
});

export const asLucideEarIcon = fixed.asHook;
export const lucideEarIcon = fixed.prototype;
export default lucideEarIcon;
