// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'school' as const;
export const LUCIDE_SCHOOL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 21v-3a2 2 0 0 0-4 0v3' }),
  svg.path({ d: 'M18 4.933V21' }),
  svg.path({ d: 'm4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6' }),
  svg.path({
    d: 'm6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11',
  }),
  svg.path({ d: 'M6 4.933V21' }),
  svg.circle({ cx: 12, cy: 9, r: 2 }),
];

export function renderLucideSchoolIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCHOOL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-school-icon',
  prototypeName: 'lucide-school-icon',
  shapeFactory: LUCIDE_SCHOOL_SHAPE_FACTORY,
});

export const asLucideSchoolIcon = fixed.asHook;
export const lucideSchoolIcon = fixed.prototype;
export default lucideSchoolIcon;
