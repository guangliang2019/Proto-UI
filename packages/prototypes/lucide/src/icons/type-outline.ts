// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'type-outline' as const;
export const LUCIDE_TYPE_OUTLINE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z',
  });

export function renderLucideTypeOutlineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TYPE_OUTLINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-type-outline-icon',
  prototypeName: 'lucide-type-outline-icon',
  shapeFactory: LUCIDE_TYPE_OUTLINE_SHAPE_FACTORY,
});

export const asLucideTypeOutlineIcon = fixed.asHook;
export const lucideTypeOutlineIcon = fixed.prototype;
export default lucideTypeOutlineIcon;
