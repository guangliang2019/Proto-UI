// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cannabis-off' as const;
export const LUCIDE_CANNABIS_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 22v-4c1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5' }),
  svg.path({ d: 'M13.988 8.327C13.902 6.054 13.365 3.82 12 2a9.3 9.3 0 0 0-1.445 2.9' }),
  svg.path({ d: 'M17.375 11.725C18.882 10.53 21 7.841 21 6c-2.324 0-5.08 1.296-6.662 2.684' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M21.024 15.378A15 15 0 0 0 22 15c-.426-1.279-2.67-2.557-4.25-2.907' }),
  svg.path({
    d: 'M6.995 6.992C5.714 6.4 4.29 6 3 6c0 2 2.5 5 4 6-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3',
  }),
];

export function renderLucideCannabisOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CANNABIS_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cannabis-off-icon',
  prototypeName: 'lucide-cannabis-off-icon',
  shapeFactory: LUCIDE_CANNABIS_OFF_SHAPE_FACTORY,
});

export const asLucideCannabisOffIcon = fixed.asHook;
export const lucideCannabisOffIcon = fixed.prototype;
export default lucideCannabisOffIcon;
