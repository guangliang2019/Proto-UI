// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cake' as const;
export const LUCIDE_CAKE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8' }),
  svg.path({ d: 'M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1' }),
  svg.path({ d: 'M2 21h20' }),
  svg.path({ d: 'M7 8v3' }),
  svg.path({ d: 'M12 8v3' }),
  svg.path({ d: 'M17 8v3' }),
  svg.path({ d: 'M7 4h.01' }),
  svg.path({ d: 'M12 4h.01' }),
  svg.path({ d: 'M17 4h.01' }),
];

export function renderLucideCakeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CAKE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cake-icon',
  prototypeName: 'lucide-cake-icon',
  shapeFactory: LUCIDE_CAKE_SHAPE_FACTORY,
});

export const asLucideCakeIcon = fixed.asHook;
export const lucideCakeIcon = fixed.prototype;
export default lucideCakeIcon;
