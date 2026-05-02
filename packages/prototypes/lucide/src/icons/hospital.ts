// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hospital' as const;
export const LUCIDE_HOSPITAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 7v4' }),
  svg.path({ d: 'M14 21v-3a2 2 0 0 0-4 0v3' }),
  svg.path({ d: 'M14 9h-4' }),
  svg.path({ d: 'M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2' }),
  svg.path({ d: 'M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16' }),
];

export function renderLucideHospitalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HOSPITAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hospital-icon',
  prototypeName: 'lucide-hospital-icon',
  shapeFactory: LUCIDE_HOSPITAL_SHAPE_FACTORY,
});

export const asLucideHospitalIcon = fixed.asHook;
export const lucideHospitalIcon = fixed.prototype;
export default lucideHospitalIcon;
