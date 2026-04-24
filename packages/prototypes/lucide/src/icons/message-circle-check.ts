// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'message-circle-check' as const;
export const LUCIDE_MESSAGE_CIRCLE_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
  }),
  svg.path({ d: 'm9 12 2 2 4-4' }),
];

export function renderLucideMessageCircleCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MESSAGE_CIRCLE_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-message-circle-check-icon',
  prototypeName: 'lucide-message-circle-check-icon',
  shapeFactory: LUCIDE_MESSAGE_CIRCLE_CHECK_SHAPE_FACTORY,
});

export const asLucideMessageCircleCheckIcon = fixed.asHook;
export const lucideMessageCircleCheckIcon = fixed.prototype;
export default lucideMessageCircleCheckIcon;
