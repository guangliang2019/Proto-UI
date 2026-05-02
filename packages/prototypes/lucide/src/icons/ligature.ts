// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ligature' as const;
export const LUCIDE_LIGATURE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 12h2v8' }),
  svg.path({ d: 'M14 20h4' }),
  svg.path({ d: 'M6 12h4' }),
  svg.path({ d: 'M6 20h4' }),
  svg.path({ d: 'M8 20V8a4 4 0 0 1 7.464-2' }),
];

export function renderLucideLigatureIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIGATURE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ligature-icon',
  prototypeName: 'lucide-ligature-icon',
  shapeFactory: LUCIDE_LIGATURE_SHAPE_FACTORY,
});

export const asLucideLigatureIcon = fixed.asHook;
export const lucideLigatureIcon = fixed.prototype;
export default lucideLigatureIcon;
