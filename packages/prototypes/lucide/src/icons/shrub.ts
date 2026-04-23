// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shrub' as const;
export const LUCIDE_SHRUB_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5' }),
  svg.path({ d: 'M14.5 14.5 12 17' }),
  svg.path({ d: 'M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z' }),
];

export function renderLucideShrubIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHRUB_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shrub-icon',
  prototypeName: 'lucide-shrub-icon',
  shapeFactory: LUCIDE_SHRUB_SHAPE_FACTORY,
});

export const asLucideShrubIcon = fixed.asHook;
export const lucideShrubIcon = fixed.prototype;
export default lucideShrubIcon;
