// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'briefcase-conveyor-belt' as const;
export const LUCIDE_BRIEFCASE_CONVEYOR_BELT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 20v2' }),
  svg.path({ d: 'M14 20v2' }),
  svg.path({ d: 'M18 20v2' }),
  svg.path({ d: 'M21 20H3' }),
  svg.path({ d: 'M6 20v2' }),
  svg.path({ d: 'M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12' }),
  svg.rect({ x: 4, y: 6, width: 16, height: 10, rx: 2 }),
];

export function renderLucideBriefcaseConveyorBeltIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BRIEFCASE_CONVEYOR_BELT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-briefcase-conveyor-belt-icon',
  prototypeName: 'lucide-briefcase-conveyor-belt-icon',
  shapeFactory: LUCIDE_BRIEFCASE_CONVEYOR_BELT_SHAPE_FACTORY,
});

export const asLucideBriefcaseConveyorBeltIcon = fixed.asHook;
export const lucideBriefcaseConveyorBeltIcon = fixed.prototype;
export default lucideBriefcaseConveyorBeltIcon;
