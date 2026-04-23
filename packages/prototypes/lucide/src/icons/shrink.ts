// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shrink' as const;
export const LUCIDE_SHRINK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15 15 6 6m-6-6v4.8m0-4.8h4.8' }),
  svg.path({ d: 'M9 19.8V15m0 0H4.2M9 15l-6 6' }),
  svg.path({ d: 'M15 4.2V9m0 0h4.8M15 9l6-6' }),
  svg.path({ d: 'M9 4.2V9m0 0H4.2M9 9 3 3' }),
];

export function renderLucideShrinkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHRINK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shrink-icon',
  prototypeName: 'lucide-shrink-icon',
  shapeFactory: LUCIDE_SHRINK_SHAPE_FACTORY,
});

export const asLucideShrinkIcon = fixed.asHook;
export const lucideShrinkIcon = fixed.prototype;
export default lucideShrinkIcon;
