// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'app-window-mac' as const;
export const LUCIDE_APP_WINDOW_MAC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 16, x: 2, y: 4, rx: 2 }),
  svg.path({ d: 'M6 8h.01' }),
  svg.path({ d: 'M10 8h.01' }),
  svg.path({ d: 'M14 8h.01' }),
];

export function renderLucideAppWindowMacIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_APP_WINDOW_MAC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-app-window-mac-icon',
  prototypeName: 'lucide-app-window-mac-icon',
  shapeFactory: LUCIDE_APP_WINDOW_MAC_SHAPE_FACTORY,
});

export const asLucideAppWindowMacIcon = fixed.asHook;
export const lucideAppWindowMacIcon = fixed.prototype;
export default lucideAppWindowMacIcon;
