// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'radio' as const;
export const LUCIDE_RADIO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16.247 7.761a6 6 0 0 1 0 8.478' }),
  svg.path({ d: 'M19.075 4.933a10 10 0 0 1 0 14.134' }),
  svg.path({ d: 'M4.925 19.067a10 10 0 0 1 0-14.134' }),
  svg.path({ d: 'M7.753 16.239a6 6 0 0 1 0-8.478' }),
  svg.circle({ cx: 12, cy: 12, r: 2 }),
];

export function renderLucideRadioIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RADIO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-radio-icon',
  prototypeName: 'lucide-radio-icon',
  shapeFactory: LUCIDE_RADIO_SHAPE_FACTORY,
});

export const asLucideRadioIcon = fixed.asHook;
export const lucideRadioIcon = fixed.prototype;
export default lucideRadioIcon;
