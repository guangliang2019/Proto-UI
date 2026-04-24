// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ampersand' as const;
export const LUCIDE_AMPERSAND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 12h3' }),
  svg.path({
    d: 'M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13',
  }),
];

export function renderLucideAmpersandIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AMPERSAND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ampersand-icon',
  prototypeName: 'lucide-ampersand-icon',
  shapeFactory: LUCIDE_AMPERSAND_SHAPE_FACTORY,
});

export const asLucideAmpersandIcon = fixed.asHook;
export const lucideAmpersandIcon = fixed.prototype;
export default lucideAmpersandIcon;
