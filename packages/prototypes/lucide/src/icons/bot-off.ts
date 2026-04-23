// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bot-off' as const;
export const LUCIDE_BOT_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13.67 8H18a2 2 0 0 1 2 2v4.33' }),
  svg.path({ d: 'M2 14h2' }),
  svg.path({ d: 'M20 14h2' }),
  svg.path({ d: 'M22 22 2 2' }),
  svg.path({ d: 'M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586' }),
  svg.path({ d: 'M9 13v2' }),
  svg.path({ d: 'M9.67 4H12v2.33' }),
];

export function renderLucideBotOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOT_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bot-off-icon',
  prototypeName: 'lucide-bot-off-icon',
  shapeFactory: LUCIDE_BOT_OFF_SHAPE_FACTORY,
});

export const asLucideBotOffIcon = fixed.asHook;
export const lucideBotOffIcon = fixed.prototype;
export default lucideBotOffIcon;
