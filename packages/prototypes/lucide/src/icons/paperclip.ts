// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'paperclip' as const;
export const LUCIDE_PAPERCLIP_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'm16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551',
  });

export function renderLucidePaperclipIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PAPERCLIP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-paperclip-icon',
  prototypeName: 'lucide-paperclip-icon',
  shapeFactory: LUCIDE_PAPERCLIP_SHAPE_FACTORY,
});

export const asLucidePaperclipIcon = fixed.asHook;
export const lucidePaperclipIcon = fixed.prototype;
export default lucidePaperclipIcon;
