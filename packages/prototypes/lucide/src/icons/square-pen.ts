// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-pen' as const;
export const LUCIDE_SQUARE_PEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' }),
  svg.path({
    d: 'M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z',
  }),
];

export function renderLucideSquarePenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_PEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-pen-icon',
  prototypeName: 'lucide-square-pen-icon',
  shapeFactory: LUCIDE_SQUARE_PEN_SHAPE_FACTORY,
});

export const asLucideSquarePenIcon = fixed.asHook;
export const lucideSquarePenIcon = fixed.prototype;
export default lucideSquarePenIcon;
