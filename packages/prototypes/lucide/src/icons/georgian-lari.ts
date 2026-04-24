// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'georgian-lari' as const;
export const LUCIDE_GEORGIAN_LARI_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11.5 21a7.5 7.5 0 1 1 7.35-9' }),
  svg.path({ d: 'M13 12V3' }),
  svg.path({ d: 'M4 21h16' }),
  svg.path({ d: 'M9 12V3' }),
];

export function renderLucideGeorgianLariIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GEORGIAN_LARI_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-georgian-lari-icon',
  prototypeName: 'lucide-georgian-lari-icon',
  shapeFactory: LUCIDE_GEORGIAN_LARI_SHAPE_FACTORY,
});

export const asLucideGeorgianLariIcon = fixed.asHook;
export const lucideGeorgianLariIcon = fixed.prototype;
export default lucideGeorgianLariIcon;
