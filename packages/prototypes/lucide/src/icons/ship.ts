// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ship' as const;
export const LUCIDE_SHIP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 10.189V14' }),
  svg.path({ d: 'M12 2v3' }),
  svg.path({ d: 'M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6' }),
  svg.path({
    d: 'M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76',
  }),
  svg.path({
    d: 'M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
  }),
];

export function renderLucideShipIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHIP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ship-icon',
  prototypeName: 'lucide-ship-icon',
  shapeFactory: LUCIDE_SHIP_SHAPE_FACTORY,
});

export const asLucideShipIcon = fixed.asHook;
export const lucideShipIcon = fixed.prototype;
export default lucideShipIcon;
