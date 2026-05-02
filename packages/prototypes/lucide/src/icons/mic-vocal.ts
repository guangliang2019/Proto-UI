// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mic-vocal' as const;
export const LUCIDE_MIC_VOCAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12' }),
  svg.path({
    d: 'M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5',
  }),
  svg.circle({ cx: 16, cy: 7, r: 5 }),
];

export function renderLucideMicVocalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MIC_VOCAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mic-vocal-icon',
  prototypeName: 'lucide-mic-vocal-icon',
  shapeFactory: LUCIDE_MIC_VOCAL_SHAPE_FACTORY,
});

export const asLucideMicVocalIcon = fixed.asHook;
export const lucideMicVocalIcon = fixed.prototype;
export default lucideMicVocalIcon;
