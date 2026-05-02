// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flower-2' as const;
export const LUCIDE_FLOWER_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1',
  }),
  svg.circle({ cx: 12, cy: 8, r: 2 }),
  svg.path({ d: 'M12 10v12' }),
  svg.path({ d: 'M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z' }),
  svg.path({ d: 'M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z' }),
];

export function renderLucideFlower2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLOWER_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flower-2-icon',
  prototypeName: 'lucide-flower-2-icon',
  shapeFactory: LUCIDE_FLOWER_2_SHAPE_FACTORY,
});

export const asLucideFlower2Icon = fixed.asHook;
export const lucideFlower2Icon = fixed.prototype;
export default lucideFlower2Icon;
