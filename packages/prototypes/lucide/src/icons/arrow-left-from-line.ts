// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-left-from-line' as const;
export const LUCIDE_ARROW_LEFT_FROM_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm9 6-6 6 6 6' }),
  svg.path({ d: 'M3 12h14' }),
  svg.path({ d: 'M21 19V5' }),
];

export function renderLucideArrowLeftFromLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_LEFT_FROM_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-left-from-line-icon',
  prototypeName: 'lucide-arrow-left-from-line-icon',
  shapeFactory: LUCIDE_ARROW_LEFT_FROM_LINE_SHAPE_FACTORY,
});

export const asLucideArrowLeftFromLineIcon = fixed.asHook;
export const lucideArrowLeftFromLineIcon = fixed.prototype;
export default lucideArrowLeftFromLineIcon;
