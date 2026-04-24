// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flame-kindling' as const;
export const LUCIDE_FLAME_KINDLING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z',
  }),
  svg.path({ d: 'm5 22 14-4' }),
  svg.path({ d: 'm5 18 14 4' }),
];

export function renderLucideFlameKindlingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLAME_KINDLING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flame-kindling-icon',
  prototypeName: 'lucide-flame-kindling-icon',
  shapeFactory: LUCIDE_FLAME_KINDLING_SHAPE_FACTORY,
});

export const asLucideFlameKindlingIcon = fixed.asHook;
export const lucideFlameKindlingIcon = fixed.prototype;
export default lucideFlameKindlingIcon;
