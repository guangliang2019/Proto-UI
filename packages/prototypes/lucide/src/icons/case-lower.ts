// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'case-lower' as const;
export const LUCIDE_CASE_LOWER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 9v7' }),
  svg.path({ d: 'M14 6v10' }),
  svg.circle({ cx: 17.5, cy: 12.5, r: 3.5 }),
  svg.circle({ cx: 6.5, cy: 12.5, r: 3.5 }),
];

export function renderLucideCaseLowerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CASE_LOWER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-case-lower-icon',
  prototypeName: 'lucide-case-lower-icon',
  shapeFactory: LUCIDE_CASE_LOWER_SHAPE_FACTORY,
});

export const asLucideCaseLowerIcon = fixed.asHook;
export const lucideCaseLowerIcon = fixed.prototype;
export default lucideCaseLowerIcon;
