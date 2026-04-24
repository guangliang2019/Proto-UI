// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'message-circle' as const;
export const LUCIDE_MESSAGE_CIRCLE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
  });

export function renderLucideMessageCircleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MESSAGE_CIRCLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-message-circle-icon',
  prototypeName: 'lucide-message-circle-icon',
  shapeFactory: LUCIDE_MESSAGE_CIRCLE_SHAPE_FACTORY,
});

export const asLucideMessageCircleIcon = fixed.asHook;
export const lucideMessageCircleIcon = fixed.prototype;
export default lucideMessageCircleIcon;
