// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clipboard-type' as const;
export const LUCIDE_CLIPBOARD_TYPE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 8, height: 4, x: 8, y: 2, rx: 1, ry: 1 }),
  svg.path({ d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
  svg.path({ d: 'M9 12v-1h6v1' }),
  svg.path({ d: 'M11 17h2' }),
  svg.path({ d: 'M12 11v6' }),
];

export function renderLucideClipboardTypeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLIPBOARD_TYPE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clipboard-type-icon',
  prototypeName: 'lucide-clipboard-type-icon',
  shapeFactory: LUCIDE_CLIPBOARD_TYPE_SHAPE_FACTORY,
});

export const asLucideClipboardTypeIcon = fixed.asHook;
export const lucideClipboardTypeIcon = fixed.prototype;
export default lucideClipboardTypeIcon;
