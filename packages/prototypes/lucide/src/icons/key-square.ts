// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'key-square' as const;
export const LUCIDE_KEY_SQUARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z',
  }),
  svg.path({ d: 'm14 7 3 3' }),
  svg.path({
    d: 'm9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814',
  }),
];

export function renderLucideKeySquareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_KEY_SQUARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-key-square-icon',
  prototypeName: 'lucide-key-square-icon',
  shapeFactory: LUCIDE_KEY_SQUARE_SHAPE_FACTORY,
});

export const asLucideKeySquareIcon = fixed.asHook;
export const lucideKeySquareIcon = fixed.prototype;
export default lucideKeySquareIcon;
