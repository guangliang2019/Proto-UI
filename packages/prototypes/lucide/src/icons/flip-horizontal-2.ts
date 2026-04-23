// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flip-horizontal-2' as const;
export const LUCIDE_FLIP_HORIZONTAL_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm3 7 5 5-5 5V7' }),
  svg.path({ d: 'm21 7-5 5 5 5V7' }),
  svg.path({ d: 'M12 20v2' }),
  svg.path({ d: 'M12 14v2' }),
  svg.path({ d: 'M12 8v2' }),
  svg.path({ d: 'M12 2v2' }),
];

export function renderLucideFlipHorizontal2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLIP_HORIZONTAL_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flip-horizontal-2-icon',
  prototypeName: 'lucide-flip-horizontal-2-icon',
  shapeFactory: LUCIDE_FLIP_HORIZONTAL_2_SHAPE_FACTORY,
});

export const asLucideFlipHorizontal2Icon = fixed.asHook;
export const lucideFlipHorizontal2Icon = fixed.prototype;
export default lucideFlipHorizontal2Icon;
