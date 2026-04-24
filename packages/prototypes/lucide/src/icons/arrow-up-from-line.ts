// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-from-line' as const;
export const LUCIDE_ARROW_UP_FROM_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm18 9-6-6-6 6' }),
  svg.path({ d: 'M12 3v14' }),
  svg.path({ d: 'M5 21h14' }),
];

export function renderLucideArrowUpFromLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_FROM_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-from-line-icon',
  prototypeName: 'lucide-arrow-up-from-line-icon',
  shapeFactory: LUCIDE_ARROW_UP_FROM_LINE_SHAPE_FACTORY,
});

export const asLucideArrowUpFromLineIcon = fixed.asHook;
export const lucideArrowUpFromLineIcon = fixed.prototype;
export default lucideArrowUpFromLineIcon;
