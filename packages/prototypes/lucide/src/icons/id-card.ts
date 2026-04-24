// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'id-card' as const;
export const LUCIDE_ID_CARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 10h2' }),
  svg.path({ d: 'M16 14h2' }),
  svg.path({ d: 'M6.17 15a3 3 0 0 1 5.66 0' }),
  svg.circle({ cx: 9, cy: 11, r: 2 }),
  svg.rect({ x: 2, y: 5, width: 20, height: 14, rx: 2 }),
];

export function renderLucideIdCardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ID_CARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-id-card-icon',
  prototypeName: 'lucide-id-card-icon',
  shapeFactory: LUCIDE_ID_CARD_SHAPE_FACTORY,
});

export const asLucideIdCardIcon = fixed.asHook;
export const lucideIdCardIcon = fixed.prototype;
export default lucideIdCardIcon;
