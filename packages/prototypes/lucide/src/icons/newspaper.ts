// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'newspaper' as const;
export const LUCIDE_NEWSPAPER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 18h-5' }),
  svg.path({ d: 'M18 14h-8' }),
  svg.path({
    d: 'M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2',
  }),
  svg.rect({ width: 8, height: 4, x: 10, y: 6, rx: 1 }),
];

export function renderLucideNewspaperIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_NEWSPAPER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-newspaper-icon',
  prototypeName: 'lucide-newspaper-icon',
  shapeFactory: LUCIDE_NEWSPAPER_SHAPE_FACTORY,
});

export const asLucideNewspaperIcon = fixed.asHook;
export const lucideNewspaperIcon = fixed.prototype;
export default lucideNewspaperIcon;
