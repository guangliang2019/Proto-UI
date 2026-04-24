// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clipboard-paste' as const;
export const LUCIDE_CLIPBOARD_PASTE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 14h10' }),
  svg.path({ d: 'M16 4h2a2 2 0 0 1 2 2v1.344' }),
  svg.path({ d: 'm17 18 4-4-4-4' }),
  svg.path({ d: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113' }),
  svg.rect({ x: 8, y: 2, width: 8, height: 4, rx: 1 }),
];

export function renderLucideClipboardPasteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLIPBOARD_PASTE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clipboard-paste-icon',
  prototypeName: 'lucide-clipboard-paste-icon',
  shapeFactory: LUCIDE_CLIPBOARD_PASTE_SHAPE_FACTORY,
});

export const asLucideClipboardPasteIcon = fixed.asHook;
export const lucideClipboardPasteIcon = fixed.prototype;
export default lucideClipboardPasteIcon;
