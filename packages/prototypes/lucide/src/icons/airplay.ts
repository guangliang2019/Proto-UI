// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'airplay' as const;
export const LUCIDE_AIRPLAY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1' }),
  svg.path({ d: 'm12 15 5 6H7Z' }),
];

export function renderLucideAirplayIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AIRPLAY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-airplay-icon',
  prototypeName: 'lucide-airplay-icon',
  shapeFactory: LUCIDE_AIRPLAY_SHAPE_FACTORY,
});

export const asLucideAirplayIcon = fixed.asHook;
export const lucideAirplayIcon = fixed.prototype;
export default lucideAirplayIcon;
