// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'option' as const;
export const LUCIDE_OPTION_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 3h6l6 18h6' }),
  svg.path({ d: 'M14 3h7' }),
];

export function renderLucideOptionIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_OPTION_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-option-icon',
  prototypeName: 'lucide-option-icon',
  shapeFactory: LUCIDE_OPTION_SHAPE_FACTORY,
});

export const asLucideOptionIcon = fixed.asHook;
export const lucideOptionIcon = fixed.prototype;
export default lucideOptionIcon;
