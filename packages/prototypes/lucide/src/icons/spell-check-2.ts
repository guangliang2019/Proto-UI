// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'spell-check-2' as const;
export const LUCIDE_SPELL_CHECK_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm6 16 6-12 6 12' }),
  svg.path({ d: 'M8 12h8' }),
  svg.path({
    d: 'M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1',
  }),
];

export function renderLucideSpellCheck2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPELL_CHECK_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-spell-check-2-icon',
  prototypeName: 'lucide-spell-check-2-icon',
  shapeFactory: LUCIDE_SPELL_CHECK_2_SHAPE_FACTORY,
});

export const asLucideSpellCheck2Icon = fixed.asHook;
export const lucideSpellCheck2Icon = fixed.prototype;
export default lucideSpellCheck2Icon;
