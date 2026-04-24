// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'spell-check' as const;
export const LUCIDE_SPELL_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm6 16 6-12 6 12' }),
  svg.path({ d: 'M8 12h8' }),
  svg.path({ d: 'm16 20 2 2 4-4' }),
];

export function renderLucideSpellCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPELL_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-spell-check-icon',
  prototypeName: 'lucide-spell-check-icon',
  shapeFactory: LUCIDE_SPELL_CHECK_SHAPE_FACTORY,
});

export const asLucideSpellCheckIcon = fixed.asHook;
export const lucideSpellCheckIcon = fixed.prototype;
export default lucideSpellCheckIcon;
