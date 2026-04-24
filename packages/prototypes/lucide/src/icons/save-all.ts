// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'save-all' as const;
export const LUCIDE_SAVE_ALL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 2v3a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6' }),
  svg.path({ d: 'M18 22H4a2 2 0 0 1-2-2V6' }),
  svg.path({
    d: 'M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z',
  }),
];

export function renderLucideSaveAllIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SAVE_ALL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-save-all-icon',
  prototypeName: 'lucide-save-all-icon',
  shapeFactory: LUCIDE_SAVE_ALL_SHAPE_FACTORY,
});

export const asLucideSaveAllIcon = fixed.asHook;
export const lucideSaveAllIcon = fixed.prototype;
export default lucideSaveAllIcon;
