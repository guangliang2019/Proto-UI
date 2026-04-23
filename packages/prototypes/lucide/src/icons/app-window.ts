// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'app-window' as const;
export const LUCIDE_APP_WINDOW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ x: 2, y: 4, width: 20, height: 16, rx: 2 }),
  svg.path({ d: 'M10 4v4' }),
  svg.path({ d: 'M2 8h20' }),
  svg.path({ d: 'M6 4v4' }),
];

export function renderLucideAppWindowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_APP_WINDOW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-app-window-icon',
  prototypeName: 'lucide-app-window-icon',
  shapeFactory: LUCIDE_APP_WINDOW_SHAPE_FACTORY,
});

export const asLucideAppWindowIcon = fixed.asHook;
export const lucideAppWindowIcon = fixed.prototype;
export default lucideAppWindowIcon;
