// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-to-line' as const;
export const LUCIDE_ARROW_UP_TO_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 3h14' }),
  svg.path({ d: 'm18 13-6-6-6 6' }),
  svg.path({ d: 'M12 7v14' }),
];

export function renderLucideArrowUpToLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_TO_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-to-line-icon',
  prototypeName: 'lucide-arrow-up-to-line-icon',
  shapeFactory: LUCIDE_ARROW_UP_TO_LINE_SHAPE_FACTORY,
});

export const asLucideArrowUpToLineIcon = fixed.asHook;
export const lucideArrowUpToLineIcon = fixed.prototype;
export default lucideArrowUpToLineIcon;
