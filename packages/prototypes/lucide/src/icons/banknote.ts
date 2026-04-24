// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'banknote' as const;
export const LUCIDE_BANKNOTE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 12, x: 2, y: 6, rx: 2 }),
  svg.circle({ cx: 12, cy: 12, r: 2 }),
  svg.path({ d: 'M6 12h.01M18 12h.01' }),
];

export function renderLucideBanknoteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BANKNOTE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-banknote-icon',
  prototypeName: 'lucide-banknote-icon',
  shapeFactory: LUCIDE_BANKNOTE_SHAPE_FACTORY,
});

export const asLucideBanknoteIcon = fixed.asHook;
export const lucideBanknoteIcon = fixed.prototype;
export default lucideBanknoteIcon;
