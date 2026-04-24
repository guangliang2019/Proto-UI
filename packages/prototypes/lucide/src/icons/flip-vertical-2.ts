// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flip-vertical-2' as const;
export const LUCIDE_FLIP_VERTICAL_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm17 3-5 5-5-5h10' }),
  svg.path({ d: 'm17 21-5-5-5 5h10' }),
  svg.path({ d: 'M4 12H2' }),
  svg.path({ d: 'M10 12H8' }),
  svg.path({ d: 'M16 12h-2' }),
  svg.path({ d: 'M22 12h-2' }),
];

export function renderLucideFlipVertical2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLIP_VERTICAL_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flip-vertical-2-icon',
  prototypeName: 'lucide-flip-vertical-2-icon',
  shapeFactory: LUCIDE_FLIP_VERTICAL_2_SHAPE_FACTORY,
});

export const asLucideFlipVertical2Icon = fixed.asHook;
export const lucideFlipVertical2Icon = fixed.prototype;
export default lucideFlipVertical2Icon;
