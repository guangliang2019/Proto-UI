// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'superscript' as const;
export const LUCIDE_SUPERSCRIPT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm4 19 8-8' }),
  svg.path({ d: 'm12 19-8-8' }),
  svg.path({
    d: 'M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06',
  }),
];

export function renderLucideSuperscriptIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SUPERSCRIPT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-superscript-icon',
  prototypeName: 'lucide-superscript-icon',
  shapeFactory: LUCIDE_SUPERSCRIPT_SHAPE_FACTORY,
});

export const asLucideSuperscriptIcon = fixed.asHook;
export const lucideSuperscriptIcon = fixed.prototype;
export default lucideSuperscriptIcon;
