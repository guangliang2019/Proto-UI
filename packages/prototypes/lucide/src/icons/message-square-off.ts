// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'message-square-off' as const;
export const LUCIDE_MESSAGE_SQUARE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826',
  }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M8.656 3H20a2 2 0 0 1 2 2v11.344' }),
];

export function renderLucideMessageSquareOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MESSAGE_SQUARE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-message-square-off-icon',
  prototypeName: 'lucide-message-square-off-icon',
  shapeFactory: LUCIDE_MESSAGE_SQUARE_OFF_SHAPE_FACTORY,
});

export const asLucideMessageSquareOffIcon = fixed.asHook;
export const lucideMessageSquareOffIcon = fixed.prototype;
export default lucideMessageSquareOffIcon;
