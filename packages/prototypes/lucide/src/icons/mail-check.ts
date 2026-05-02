// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mail-check' as const;
export const LUCIDE_MAIL_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8' }),
  svg.path({ d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' }),
  svg.path({ d: 'm16 19 2 2 4-4' }),
];

export function renderLucideMailCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAIL_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mail-check-icon',
  prototypeName: 'lucide-mail-check-icon',
  shapeFactory: LUCIDE_MAIL_CHECK_SHAPE_FACTORY,
});

export const asLucideMailCheckIcon = fixed.asHook;
export const lucideMailCheckIcon = fixed.prototype;
export default lucideMailCheckIcon;
