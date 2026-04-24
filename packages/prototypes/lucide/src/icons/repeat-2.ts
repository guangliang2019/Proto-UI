// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'repeat-2' as const;
export const LUCIDE_REPEAT_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm2 9 3-3 3 3' }),
  svg.path({ d: 'M13 18H7a2 2 0 0 1-2-2V6' }),
  svg.path({ d: 'm22 15-3 3-3-3' }),
  svg.path({ d: 'M11 6h6a2 2 0 0 1 2 2v10' }),
];

export function renderLucideRepeat2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REPEAT_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-repeat-2-icon',
  prototypeName: 'lucide-repeat-2-icon',
  shapeFactory: LUCIDE_REPEAT_2_SHAPE_FACTORY,
});

export const asLucideRepeat2Icon = fixed.asHook;
export const lucideRepeat2Icon = fixed.prototype;
export default lucideRepeat2Icon;
