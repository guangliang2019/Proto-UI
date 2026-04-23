// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'save-off' as const;
export const LUCIDE_SAVE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 13H8a1 1 0 0 0-1 1v7' }),
  svg.path({ d: 'M14 8h1' }),
  svg.path({ d: 'M17 21v-4' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41' }),
  svg.path({ d: 'M29.5 11.5s5 5 4 5' }),
  svg.path({ d: 'M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15' }),
];

export function renderLucideSaveOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SAVE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-save-off-icon',
  prototypeName: 'lucide-save-off-icon',
  shapeFactory: LUCIDE_SAVE_OFF_SHAPE_FACTORY,
});

export const asLucideSaveOffIcon = fixed.asHook;
export const lucideSaveOffIcon = fixed.prototype;
export default lucideSaveOffIcon;
