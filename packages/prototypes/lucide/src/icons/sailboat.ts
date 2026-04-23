// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sailboat' as const;
export const LUCIDE_SAILBOAT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 2v15' }),
  svg.path({ d: 'M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z' }),
  svg.path({
    d: 'M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z',
  }),
];

export function renderLucideSailboatIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SAILBOAT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sailboat-icon',
  prototypeName: 'lucide-sailboat-icon',
  shapeFactory: LUCIDE_SAILBOAT_SHAPE_FACTORY,
});

export const asLucideSailboatIcon = fixed.asHook;
export const lucideSailboatIcon = fixed.prototype;
export default lucideSailboatIcon;
