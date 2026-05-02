// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'fullscreen' as const;
export const LUCIDE_FULLSCREEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 7V5a2 2 0 0 1 2-2h2' }),
  svg.path({ d: 'M17 3h2a2 2 0 0 1 2 2v2' }),
  svg.path({ d: 'M21 17v2a2 2 0 0 1-2 2h-2' }),
  svg.path({ d: 'M7 21H5a2 2 0 0 1-2-2v-2' }),
  svg.rect({ width: 10, height: 8, x: 7, y: 8, rx: 1 }),
];

export function renderLucideFullscreenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FULLSCREEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-fullscreen-icon',
  prototypeName: 'lucide-fullscreen-icon',
  shapeFactory: LUCIDE_FULLSCREEN_SHAPE_FACTORY,
});

export const asLucideFullscreenIcon = fixed.asHook;
export const lucideFullscreenIcon = fixed.prototype;
export default lucideFullscreenIcon;
