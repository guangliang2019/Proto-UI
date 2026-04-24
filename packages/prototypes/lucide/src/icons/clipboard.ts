// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clipboard' as const;
export const LUCIDE_CLIPBOARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 8, height: 4, x: 8, y: 2, rx: 1, ry: 1 }),
  svg.path({ d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
];

export function renderLucideClipboardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLIPBOARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clipboard-icon',
  prototypeName: 'lucide-clipboard-icon',
  shapeFactory: LUCIDE_CLIPBOARD_SHAPE_FACTORY,
});

export const asLucideClipboardIcon = fixed.asHook;
export const lucideClipboardIcon = fixed.prototype;
export default lucideClipboardIcon;
