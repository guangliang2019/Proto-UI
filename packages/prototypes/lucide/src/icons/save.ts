// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'save' as const;
export const LUCIDE_SAVE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
  }),
  svg.path({ d: 'M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7' }),
  svg.path({ d: 'M7 3v4a1 1 0 0 0 1 1h7' }),
];

export function renderLucideSaveIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SAVE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-save-icon',
  prototypeName: 'lucide-save-icon',
  shapeFactory: LUCIDE_SAVE_SHAPE_FACTORY,
});

export const asLucideSaveIcon = fixed.asHook;
export const lucideSaveIcon = fixed.prototype;
export default lucideSaveIcon;
