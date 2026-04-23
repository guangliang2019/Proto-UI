// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clipboard-list' as const;
export const LUCIDE_CLIPBOARD_LIST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 8, height: 4, x: 8, y: 2, rx: 1, ry: 1 }),
  svg.path({ d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
  svg.path({ d: 'M12 11h4' }),
  svg.path({ d: 'M12 16h4' }),
  svg.path({ d: 'M8 11h.01' }),
  svg.path({ d: 'M8 16h.01' }),
];

export function renderLucideClipboardListIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLIPBOARD_LIST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clipboard-list-icon',
  prototypeName: 'lucide-clipboard-list-icon',
  shapeFactory: LUCIDE_CLIPBOARD_LIST_SHAPE_FACTORY,
});

export const asLucideClipboardListIcon = fixed.asHook;
export const lucideClipboardListIcon = fixed.prototype;
export default lucideClipboardListIcon;
