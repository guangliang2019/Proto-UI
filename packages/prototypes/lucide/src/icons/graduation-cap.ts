// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'graduation-cap' as const;
export const LUCIDE_GRADUATION_CAP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z',
  }),
  svg.path({ d: 'M22 10v6' }),
  svg.path({ d: 'M6 12.5V16a6 3 0 0 0 12 0v-3.5' }),
];

export function renderLucideGraduationCapIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GRADUATION_CAP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-graduation-cap-icon',
  prototypeName: 'lucide-graduation-cap-icon',
  shapeFactory: LUCIDE_GRADUATION_CAP_SHAPE_FACTORY,
});

export const asLucideGraduationCapIcon = fixed.asHook;
export const lucideGraduationCapIcon = fixed.prototype;
export default lucideGraduationCapIcon;
