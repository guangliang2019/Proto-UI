// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hamburger' as const;
export const LUCIDE_HAMBURGER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25' }),
  svg.path({ d: 'M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2' }),
  svg.path({ d: 'M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0' }),
  svg.path({ d: 'm6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2' }),
];

export function renderLucideHamburgerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HAMBURGER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hamburger-icon',
  prototypeName: 'lucide-hamburger-icon',
  shapeFactory: LUCIDE_HAMBURGER_SHAPE_FACTORY,
});

export const asLucideHamburgerIcon = fixed.asHook;
export const lucideHamburgerIcon = fixed.prototype;
export default lucideHamburgerIcon;
