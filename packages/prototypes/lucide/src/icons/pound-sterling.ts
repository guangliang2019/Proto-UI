// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pound-sterling' as const;
export const LUCIDE_POUND_STERLING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 7c0-5.333-8-5.333-8 0' }),
  svg.path({ d: 'M10 7v14' }),
  svg.path({ d: 'M6 21h12' }),
  svg.path({ d: 'M6 13h10' }),
];

export function renderLucidePoundSterlingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_POUND_STERLING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pound-sterling-icon',
  prototypeName: 'lucide-pound-sterling-icon',
  shapeFactory: LUCIDE_POUND_STERLING_SHAPE_FACTORY,
});

export const asLucidePoundSterlingIcon = fixed.asHook;
export const lucidePoundSterlingIcon = fixed.prototype;
export default lucidePoundSterlingIcon;
