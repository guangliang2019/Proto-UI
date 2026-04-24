// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'whole-word' as const;
export const LUCIDE_WHOLE_WORD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 7, cy: 12, r: 3 }),
  svg.path({ d: 'M10 9v6' }),
  svg.circle({ cx: 17, cy: 12, r: 3 }),
  svg.path({ d: 'M14 7v8' }),
  svg.path({ d: 'M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1' }),
];

export function renderLucideWholeWordIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WHOLE_WORD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-whole-word-icon',
  prototypeName: 'lucide-whole-word-icon',
  shapeFactory: LUCIDE_WHOLE_WORD_SHAPE_FACTORY,
});

export const asLucideWholeWordIcon = fixed.asHook;
export const lucideWholeWordIcon = fixed.prototype;
export default lucideWholeWordIcon;
