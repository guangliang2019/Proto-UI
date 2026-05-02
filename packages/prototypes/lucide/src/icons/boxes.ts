// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'boxes' as const;
export const LUCIDE_BOXES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z',
  }),
  svg.path({ d: 'm7 16.5-4.74-2.85' }),
  svg.path({ d: 'm7 16.5 5-3' }),
  svg.path({ d: 'M7 16.5v5.17' }),
  svg.path({
    d: 'M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z',
  }),
  svg.path({ d: 'm17 16.5-5-3' }),
  svg.path({ d: 'm17 16.5 4.74-2.85' }),
  svg.path({ d: 'M17 16.5v5.17' }),
  svg.path({
    d: 'M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z',
  }),
  svg.path({ d: 'M12 8 7.26 5.15' }),
  svg.path({ d: 'm12 8 4.74-2.85' }),
  svg.path({ d: 'M12 13.5V8' }),
];

export function renderLucideBoxesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOXES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-boxes-icon',
  prototypeName: 'lucide-boxes-icon',
  shapeFactory: LUCIDE_BOXES_SHAPE_FACTORY,
});

export const asLucideBoxesIcon = fixed.asHook;
export const lucideBoxesIcon = fixed.prototype;
export default lucideBoxesIcon;
