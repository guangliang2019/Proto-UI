// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'soup' as const;
export const LUCIDE_SOUP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z' }),
  svg.path({ d: 'M7 21h10' }),
  svg.path({ d: 'M19.5 12 22 6' }),
  svg.path({ d: 'M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62' }),
  svg.path({ d: 'M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62' }),
  svg.path({ d: 'M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62' }),
];

export function renderLucideSoupIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SOUP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-soup-icon',
  prototypeName: 'lucide-soup-icon',
  shapeFactory: LUCIDE_SOUP_SHAPE_FACTORY,
});

export const asLucideSoupIcon = fixed.asHook;
export const lucideSoupIcon = fixed.prototype;
export default lucideSoupIcon;
