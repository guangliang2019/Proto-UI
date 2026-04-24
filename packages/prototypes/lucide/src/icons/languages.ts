// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'languages' as const;
export const LUCIDE_LANGUAGES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm5 8 6 6' }),
  svg.path({ d: 'm4 14 6-6 2-3' }),
  svg.path({ d: 'M2 5h12' }),
  svg.path({ d: 'M7 2h1' }),
  svg.path({ d: 'm22 22-5-10-5 10' }),
  svg.path({ d: 'M14 18h6' }),
];

export function renderLucideLanguagesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LANGUAGES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-languages-icon',
  prototypeName: 'lucide-languages-icon',
  shapeFactory: LUCIDE_LANGUAGES_SHAPE_FACTORY,
});

export const asLucideLanguagesIcon = fixed.asHook;
export const lucideLanguagesIcon = fixed.prototype;
export default lucideLanguagesIcon;
