// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sticky-note' as const;
export const LUCIDE_STICKY_NOTE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z',
  }),
  svg.path({ d: 'M15 3v5a1 1 0 0 0 1 1h5' }),
];

export function renderLucideStickyNoteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_STICKY_NOTE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sticky-note-icon',
  prototypeName: 'lucide-sticky-note-icon',
  shapeFactory: LUCIDE_STICKY_NOTE_SHAPE_FACTORY,
});

export const asLucideStickyNoteIcon = fixed.asHook;
export const lucideStickyNoteIcon = fixed.prototype;
export default lucideStickyNoteIcon;
