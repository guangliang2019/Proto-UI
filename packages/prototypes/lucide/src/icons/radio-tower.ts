// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'radio-tower' as const;
export const LUCIDE_RADIO_TOWER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4.9 16.1C1 12.2 1 5.8 4.9 1.9' }),
  svg.path({ d: 'M7.8 4.7a6.14 6.14 0 0 0-.8 7.5' }),
  svg.circle({ cx: 12, cy: 9, r: 2 }),
  svg.path({ d: 'M16.2 4.8c2 2 2.26 5.11.8 7.47' }),
  svg.path({ d: 'M19.1 1.9a9.96 9.96 0 0 1 0 14.1' }),
  svg.path({ d: 'M9.5 18h5' }),
  svg.path({ d: 'm8 22 4-11 4 11' }),
];

export function renderLucideRadioTowerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RADIO_TOWER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-radio-tower-icon',
  prototypeName: 'lucide-radio-tower-icon',
  shapeFactory: LUCIDE_RADIO_TOWER_SHAPE_FACTORY,
});

export const asLucideRadioTowerIcon = fixed.asHook;
export const lucideRadioTowerIcon = fixed.prototype;
export default lucideRadioTowerIcon;
