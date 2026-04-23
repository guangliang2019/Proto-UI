// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bot' as const;
export const LUCIDE_BOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 8V4H8' }),
  svg.rect({ width: 16, height: 12, x: 4, y: 8, rx: 2 }),
  svg.path({ d: 'M2 14h2' }),
  svg.path({ d: 'M20 14h2' }),
  svg.path({ d: 'M15 13v2' }),
  svg.path({ d: 'M9 13v2' }),
];

export function renderLucideBotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bot-icon',
  prototypeName: 'lucide-bot-icon',
  shapeFactory: LUCIDE_BOT_SHAPE_FACTORY,
});

export const asLucideBotIcon = fixed.asHook;
export const lucideBotIcon = fixed.prototype;
export default lucideBotIcon;
