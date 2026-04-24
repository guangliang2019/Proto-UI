// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'person-standing' as const;
export const LUCIDE_PERSON_STANDING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 5, r: 1 }),
  svg.path({ d: 'm9 20 3-6 3 6' }),
  svg.path({ d: 'm6 8 6 2 6-2' }),
  svg.path({ d: 'M12 10v4' }),
];

export function renderLucidePersonStandingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PERSON_STANDING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-person-standing-icon',
  prototypeName: 'lucide-person-standing-icon',
  shapeFactory: LUCIDE_PERSON_STANDING_SHAPE_FACTORY,
});

export const asLucidePersonStandingIcon = fixed.asHook;
export const lucidePersonStandingIcon = fixed.prototype;
export default lucidePersonStandingIcon;
