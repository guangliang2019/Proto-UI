// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mail-open' as const;
export const LUCIDE_MAIL_OPEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z',
  }),
  svg.path({ d: 'm22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10' }),
];

export function renderLucideMailOpenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAIL_OPEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mail-open-icon',
  prototypeName: 'lucide-mail-open-icon',
  shapeFactory: LUCIDE_MAIL_OPEN_SHAPE_FACTORY,
});

export const asLucideMailOpenIcon = fixed.asHook;
export const lucideMailOpenIcon = fixed.prototype;
export default lucideMailOpenIcon;
