// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bot-message-square' as const;
export const LUCIDE_BOT_MESSAGE_SQUARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6V2H8' }),
  svg.path({ d: 'M15 11v2' }),
  svg.path({ d: 'M2 12h2' }),
  svg.path({ d: 'M20 12h2' }),
  svg.path({
    d: 'M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z',
  }),
  svg.path({ d: 'M9 11v2' }),
];

export function renderLucideBotMessageSquareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOT_MESSAGE_SQUARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bot-message-square-icon',
  prototypeName: 'lucide-bot-message-square-icon',
  shapeFactory: LUCIDE_BOT_MESSAGE_SQUARE_SHAPE_FACTORY,
});

export const asLucideBotMessageSquareIcon = fixed.asHook;
export const lucideBotMessageSquareIcon = fixed.prototype;
export default lucideBotMessageSquareIcon;
