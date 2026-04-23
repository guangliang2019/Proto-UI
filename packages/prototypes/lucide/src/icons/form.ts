// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'form' as const;
export const LUCIDE_FORM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 14h6' }),
  svg.path({ d: 'M4 2h10' }),
  svg.rect({ x: 4, y: 18, width: 16, height: 4, rx: 1 }),
  svg.rect({ x: 4, y: 6, width: 16, height: 4, rx: 1 }),
];

export function renderLucideFormIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FORM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-form-icon',
  prototypeName: 'lucide-form-icon',
  shapeFactory: LUCIDE_FORM_SHAPE_FACTORY,
});

export const asLucideFormIcon = fixed.asHook;
export const lucideFormIcon = fixed.prototype;
export default lucideFormIcon;
