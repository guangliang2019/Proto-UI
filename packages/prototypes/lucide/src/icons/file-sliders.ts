// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-sliders' as const;
export const LUCIDE_FILE_SLIDERS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M8 12h8' }),
  svg.path({ d: 'M10 11v2' }),
  svg.path({ d: 'M8 17h8' }),
  svg.path({ d: 'M14 16v2' }),
];

export function renderLucideFileSlidersIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_SLIDERS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-sliders-icon',
  prototypeName: 'lucide-file-sliders-icon',
  shapeFactory: LUCIDE_FILE_SLIDERS_SHAPE_FACTORY,
});

export const asLucideFileSlidersIcon = fixed.asHook;
export const lucideFileSlidersIcon = fixed.prototype;
export default lucideFileSlidersIcon;
