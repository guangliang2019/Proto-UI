// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'megaphone' as const;
export const LUCIDE_MEGAPHONE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z',
  }),
  svg.path({ d: 'M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14' }),
  svg.path({ d: 'M8 6v8' }),
];

export function renderLucideMegaphoneIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MEGAPHONE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-megaphone-icon',
  prototypeName: 'lucide-megaphone-icon',
  shapeFactory: LUCIDE_MEGAPHONE_SHAPE_FACTORY,
});

export const asLucideMegaphoneIcon = fixed.asHook;
export const lucideMegaphoneIcon = fixed.prototype;
export default lucideMegaphoneIcon;
