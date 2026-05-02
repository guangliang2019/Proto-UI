// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'line-style' as const;
export const LUCIDE_LINE_STYLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 5h2' }),
  svg.path({ d: 'M15 12h6' }),
  svg.path({ d: 'M19 5h2' }),
  svg.path({ d: 'M3 12h6' }),
  svg.path({ d: 'M3 19h18' }),
  svg.path({ d: 'M3 5h2' }),
];

export function renderLucideLineStyleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LINE_STYLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-line-style-icon',
  prototypeName: 'lucide-line-style-icon',
  shapeFactory: LUCIDE_LINE_STYLE_SHAPE_FACTORY,
});

export const asLucideLineStyleIcon = fixed.asHook;
export const lucideLineStyleIcon = fixed.prototype;
export default lucideLineStyleIcon;
