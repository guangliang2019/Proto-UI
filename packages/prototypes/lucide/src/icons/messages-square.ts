// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'messages-square' as const;
export const LUCIDE_MESSAGES_SQUARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',
  }),
  svg.path({
    d: 'M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1',
  }),
];

export function renderLucideMessagesSquareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MESSAGES_SQUARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-messages-square-icon',
  prototypeName: 'lucide-messages-square-icon',
  shapeFactory: LUCIDE_MESSAGES_SQUARE_SHAPE_FACTORY,
});

export const asLucideMessagesSquareIcon = fixed.asHook;
export const lucideMessagesSquareIcon = fixed.prototype;
export default lucideMessagesSquareIcon;
