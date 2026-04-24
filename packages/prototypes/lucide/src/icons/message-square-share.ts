// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'message-square-share' as const;
export const LUCIDE_MESSAGE_SQUARE_SHARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4',
  }),
  svg.path({ d: 'M16 3h6v6' }),
  svg.path({ d: 'm16 9 6-6' }),
];

export function renderLucideMessageSquareShareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MESSAGE_SQUARE_SHARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-message-square-share-icon',
  prototypeName: 'lucide-message-square-share-icon',
  shapeFactory: LUCIDE_MESSAGE_SQUARE_SHARE_SHAPE_FACTORY,
});

export const asLucideMessageSquareShareIcon = fixed.asHook;
export const lucideMessageSquareShareIcon = fixed.prototype;
export default lucideMessageSquareShareIcon;
