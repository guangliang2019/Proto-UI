// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flower' as const;
export const LUCIDE_FLOWER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 3 }),
  svg.path({
    d: 'M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5',
  }),
  svg.path({ d: 'M12 7.5V9' }),
  svg.path({ d: 'M7.5 12H9' }),
  svg.path({ d: 'M16.5 12H15' }),
  svg.path({ d: 'M12 16.5V15' }),
  svg.path({ d: 'm8 8 1.88 1.88' }),
  svg.path({ d: 'M14.12 9.88 16 8' }),
  svg.path({ d: 'm8 16 1.88-1.88' }),
  svg.path({ d: 'M14.12 14.12 16 16' }),
];

export function renderLucideFlowerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLOWER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flower-icon',
  prototypeName: 'lucide-flower-icon',
  shapeFactory: LUCIDE_FLOWER_SHAPE_FACTORY,
});

export const asLucideFlowerIcon = fixed.asHook;
export const lucideFlowerIcon = fixed.prototype;
export default lucideFlowerIcon;
