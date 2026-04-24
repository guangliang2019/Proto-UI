// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mail' as const;
export const LUCIDE_MAIL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' }),
  svg.rect({ x: 2, y: 4, width: 20, height: 16, rx: 2 }),
];

export function renderLucideMailIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAIL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mail-icon',
  prototypeName: 'lucide-mail-icon',
  shapeFactory: LUCIDE_MAIL_SHAPE_FACTORY,
});

export const asLucideMailIcon = fixed.asHook;
export const lucideMailIcon = fixed.prototype;
export default lucideMailIcon;
