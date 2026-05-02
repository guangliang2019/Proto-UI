// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'subscript' as const;
export const LUCIDE_SUBSCRIPT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm4 5 8 8' }),
  svg.path({ d: 'm12 5-8 8' }),
  svg.path({
    d: 'M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07',
  }),
];

export function renderLucideSubscriptIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SUBSCRIPT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-subscript-icon',
  prototypeName: 'lucide-subscript-icon',
  shapeFactory: LUCIDE_SUBSCRIPT_SHAPE_FACTORY,
});

export const asLucideSubscriptIcon = fixed.asHook;
export const lucideSubscriptIcon = fixed.prototype;
export default lucideSubscriptIcon;
