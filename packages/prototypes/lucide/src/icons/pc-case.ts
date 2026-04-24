// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pc-case' as const;
export const LUCIDE_PC_CASE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 14, height: 20, x: 5, y: 2, rx: 2 }),
  svg.path({ d: 'M15 14h.01' }),
  svg.path({ d: 'M9 6h6' }),
  svg.path({ d: 'M9 10h6' }),
];

export function renderLucidePcCaseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PC_CASE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pc-case-icon',
  prototypeName: 'lucide-pc-case-icon',
  shapeFactory: LUCIDE_PC_CASE_SHAPE_FACTORY,
});

export const asLucidePcCaseIcon = fixed.asHook;
export const lucidePcCaseIcon = fixed.prototype;
export default lucidePcCaseIcon;
