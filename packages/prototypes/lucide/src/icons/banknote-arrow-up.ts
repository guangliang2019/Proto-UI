// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'banknote-arrow-up' as const;
export const LUCIDE_BANKNOTE_ARROW_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5' }),
  svg.path({ d: 'M18 12h.01' }),
  svg.path({ d: 'M19 22v-6' }),
  svg.path({ d: 'm22 19-3-3-3 3' }),
  svg.path({ d: 'M6 12h.01' }),
  svg.circle({ cx: 12, cy: 12, r: 2 }),
];

export function renderLucideBanknoteArrowUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BANKNOTE_ARROW_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-banknote-arrow-up-icon',
  prototypeName: 'lucide-banknote-arrow-up-icon',
  shapeFactory: LUCIDE_BANKNOTE_ARROW_UP_SHAPE_FACTORY,
});

export const asLucideBanknoteArrowUpIcon = fixed.asHook;
export const lucideBanknoteArrowUpIcon = fixed.prototype;
export default lucideBanknoteArrowUpIcon;
