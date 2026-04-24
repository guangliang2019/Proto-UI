// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'briefcase-medical' as const;
export const LUCIDE_BRIEFCASE_MEDICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 11v4' }),
  svg.path({ d: 'M14 13h-4' }),
  svg.path({ d: 'M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2' }),
  svg.path({ d: 'M18 6v14' }),
  svg.path({ d: 'M6 6v14' }),
  svg.rect({ width: 20, height: 14, x: 2, y: 6, rx: 2 }),
];

export function renderLucideBriefcaseMedicalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BRIEFCASE_MEDICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-briefcase-medical-icon',
  prototypeName: 'lucide-briefcase-medical-icon',
  shapeFactory: LUCIDE_BRIEFCASE_MEDICAL_SHAPE_FACTORY,
});

export const asLucideBriefcaseMedicalIcon = fixed.asHook;
export const lucideBriefcaseMedicalIcon = fixed.prototype;
export default lucideBriefcaseMedicalIcon;
