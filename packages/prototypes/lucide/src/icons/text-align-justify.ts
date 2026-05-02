// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'text-align-justify' as const;
export const LUCIDE_TEXT_ALIGN_JUSTIFY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 5h18' }),
  svg.path({ d: 'M3 12h18' }),
  svg.path({ d: 'M3 19h18' }),
];

export function renderLucideTextAlignJustifyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEXT_ALIGN_JUSTIFY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-text-align-justify-icon',
  prototypeName: 'lucide-text-align-justify-icon',
  shapeFactory: LUCIDE_TEXT_ALIGN_JUSTIFY_SHAPE_FACTORY,
});

export const asLucideTextAlignJustifyIcon = fixed.asHook;
export const lucideTextAlignJustifyIcon = fixed.prototype;
export default lucideTextAlignJustifyIcon;
