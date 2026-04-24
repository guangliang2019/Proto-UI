// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'utensils' as const;
export const LUCIDE_UTENSILS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' }),
  svg.path({ d: 'M7 2v20' }),
  svg.path({ d: 'M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' }),
];

export function renderLucideUtensilsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UTENSILS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-utensils-icon',
  prototypeName: 'lucide-utensils-icon',
  shapeFactory: LUCIDE_UTENSILS_SHAPE_FACTORY,
});

export const asLucideUtensilsIcon = fixed.asHook;
export const lucideUtensilsIcon = fixed.prototype;
export default lucideUtensilsIcon;
