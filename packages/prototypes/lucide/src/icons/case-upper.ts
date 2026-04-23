// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'case-upper' as const;
export const LUCIDE_CASE_UPPER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5',
  }),
  svg.path({ d: 'm2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16' }),
  svg.path({ d: 'M3.304 13h6.392' }),
];

export function renderLucideCaseUpperIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CASE_UPPER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-case-upper-icon',
  prototypeName: 'lucide-case-upper-icon',
  shapeFactory: LUCIDE_CASE_UPPER_SHAPE_FACTORY,
});

export const asLucideCaseUpperIcon = fixed.asHook;
export const lucideCaseUpperIcon = fixed.prototype;
export default lucideCaseUpperIcon;
