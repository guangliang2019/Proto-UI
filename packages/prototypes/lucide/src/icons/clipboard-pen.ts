// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clipboard-pen' as const;
export const LUCIDE_CLIPBOARD_PEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 4h2a2 2 0 0 1 2 2v2' }),
  svg.path({
    d: 'M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
  }),
  svg.path({ d: 'M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
  svg.rect({ x: 8, y: 2, width: 8, height: 4, rx: 1 }),
];

export function renderLucideClipboardPenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLIPBOARD_PEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clipboard-pen-icon',
  prototypeName: 'lucide-clipboard-pen-icon',
  shapeFactory: LUCIDE_CLIPBOARD_PEN_SHAPE_FACTORY,
});

export const asLucideClipboardPenIcon = fixed.asHook;
export const lucideClipboardPenIcon = fixed.prototype;
export default lucideClipboardPenIcon;
