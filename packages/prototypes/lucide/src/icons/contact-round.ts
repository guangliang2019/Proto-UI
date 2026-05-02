// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'contact-round' as const;
export const LUCIDE_CONTACT_ROUND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 2v2' }),
  svg.path({ d: 'M17.915 22a6 6 0 0 0-12 0' }),
  svg.path({ d: 'M8 2v2' }),
  svg.circle({ cx: 12, cy: 12, r: 4 }),
  svg.rect({ x: 3, y: 4, width: 18, height: 18, rx: 2 }),
];

export function renderLucideContactRoundIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CONTACT_ROUND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-contact-round-icon',
  prototypeName: 'lucide-contact-round-icon',
  shapeFactory: LUCIDE_CONTACT_ROUND_SHAPE_FACTORY,
});

export const asLucideContactRoundIcon = fixed.asHook;
export const lucideContactRoundIcon = fixed.prototype;
export default lucideContactRoundIcon;
