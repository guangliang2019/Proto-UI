// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'russian-ruble' as const;
export const LUCIDE_RUSSIAN_RUBLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 11h8a4 4 0 0 0 0-8H9v18' }),
  svg.path({ d: 'M6 15h8' }),
];

export function renderLucideRussianRubleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RUSSIAN_RUBLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-russian-ruble-icon',
  prototypeName: 'lucide-russian-ruble-icon',
  shapeFactory: LUCIDE_RUSSIAN_RUBLE_SHAPE_FACTORY,
});

export const asLucideRussianRubleIcon = fixed.asHook;
export const lucideRussianRubleIcon = fixed.prototype;
export default lucideRussianRubleIcon;
