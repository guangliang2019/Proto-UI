// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'videotape' as const;
export const LUCIDE_VIDEOTAPE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 16, x: 2, y: 4, rx: 2 }),
  svg.path({ d: 'M2 8h20' }),
  svg.circle({ cx: 8, cy: 14, r: 2 }),
  svg.path({ d: 'M8 12h8' }),
  svg.circle({ cx: 16, cy: 14, r: 2 }),
];

export function renderLucideVideotapeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VIDEOTAPE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-videotape-icon',
  prototypeName: 'lucide-videotape-icon',
  shapeFactory: LUCIDE_VIDEOTAPE_SHAPE_FACTORY,
});

export const asLucideVideotapeIcon = fixed.asHook;
export const lucideVideotapeIcon = fixed.prototype;
export default lucideVideotapeIcon;
