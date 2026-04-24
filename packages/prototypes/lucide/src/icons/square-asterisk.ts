// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-asterisk' as const;
export const LUCIDE_SQUARE_ASTERISK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M12 8v8' }),
  svg.path({ d: 'm8.5 14 7-4' }),
  svg.path({ d: 'm8.5 10 7 4' }),
];

export function renderLucideSquareAsteriskIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ASTERISK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-asterisk-icon',
  prototypeName: 'lucide-square-asterisk-icon',
  shapeFactory: LUCIDE_SQUARE_ASTERISK_SHAPE_FACTORY,
});

export const asLucideSquareAsteriskIcon = fixed.asHook;
export const lucideSquareAsteriskIcon = fixed.prototype;
export default lucideSquareAsteriskIcon;
