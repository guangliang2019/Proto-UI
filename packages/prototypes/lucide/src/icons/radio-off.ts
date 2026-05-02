// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'radio-off' as const;
export const LUCIDE_RADIO_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13.414 13.414a2 2 0 1 1-2.828-2.828' }),
  svg.path({ d: 'M16.247 7.761a6 6 0 0 1 1.744 4.572' }),
  svg.path({ d: 'M19.075 4.933a10 10 0 0 1 2.234 10.72' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M4.925 19.067a10 10 0 0 1 0-14.134' }),
  svg.path({ d: 'M7.753 16.239a6 6 0 0 1 0-8.478' }),
];

export function renderLucideRadioOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RADIO_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-radio-off-icon',
  prototypeName: 'lucide-radio-off-icon',
  shapeFactory: LUCIDE_RADIO_OFF_SHAPE_FACTORY,
});

export const asLucideRadioOffIcon = fixed.asHook;
export const lucideRadioOffIcon = fixed.prototype;
export default lucideRadioOffIcon;
