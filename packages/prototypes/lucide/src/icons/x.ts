// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'x' as const;
export const LUCIDE_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 6 6 18' }),
  svg.path({ d: 'm6 6 12 12' }),
];

export function renderLucideXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-x-icon',
  prototypeName: 'lucide-x-icon',
  shapeFactory: LUCIDE_X_SHAPE_FACTORY,
});

export const asLucideXIcon = fixed.asHook;
export const lucideXIcon = fixed.prototype;
export default lucideXIcon;
