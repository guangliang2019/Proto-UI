// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lamp-ceiling' as const;
export const LUCIDE_LAMP_CEILING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v5' }),
  svg.path({ d: 'M14.829 15.998a3 3 0 1 1-5.658 0' }),
  svg.path({
    d: 'M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z',
  }),
];

export function renderLucideLampCeilingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAMP_CEILING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lamp-ceiling-icon',
  prototypeName: 'lucide-lamp-ceiling-icon',
  shapeFactory: LUCIDE_LAMP_CEILING_SHAPE_FACTORY,
});

export const asLucideLampCeilingIcon = fixed.asHook;
export const lucideLampCeilingIcon = fixed.prototype;
export default lucideLampCeilingIcon;
