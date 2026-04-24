// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'baggage-claim' as const;
export const LUCIDE_BAGGAGE_CLAIM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2' }),
  svg.path({ d: 'M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10' }),
  svg.rect({ width: 13, height: 8, x: 8, y: 6, rx: 1 }),
  svg.circle({ cx: 18, cy: 20, r: 2 }),
  svg.circle({ cx: 9, cy: 20, r: 2 }),
];

export function renderLucideBaggageClaimIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BAGGAGE_CLAIM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-baggage-claim-icon',
  prototypeName: 'lucide-baggage-claim-icon',
  shapeFactory: LUCIDE_BAGGAGE_CLAIM_SHAPE_FACTORY,
});

export const asLucideBaggageClaimIcon = fixed.asHook;
export const lucideBaggageClaimIcon = fixed.prototype;
export default lucideBaggageClaimIcon;
