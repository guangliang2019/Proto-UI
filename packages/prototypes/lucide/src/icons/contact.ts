// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'contact' as const;
export const LUCIDE_CONTACT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 2v2' }),
  svg.path({ d: 'M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2' }),
  svg.path({ d: 'M8 2v2' }),
  svg.circle({ cx: 12, cy: 11, r: 3 }),
  svg.rect({ x: 3, y: 4, width: 18, height: 18, rx: 2 }),
];

export function renderLucideContactIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CONTACT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-contact-icon',
  prototypeName: 'lucide-contact-icon',
  shapeFactory: LUCIDE_CONTACT_SHAPE_FACTORY,
});

export const asLucideContactIcon = fixed.asHook;
export const lucideContactIcon = fixed.prototype;
export default lucideContactIcon;
