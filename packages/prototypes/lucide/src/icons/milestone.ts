// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'milestone' as const;
export const LUCIDE_MILESTONE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 13v8' }),
  svg.path({ d: 'M12 3v3' }),
  svg.path({
    d: 'M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z',
  }),
];

export function renderLucideMilestoneIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MILESTONE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-milestone-icon',
  prototypeName: 'lucide-milestone-icon',
  shapeFactory: LUCIDE_MILESTONE_SHAPE_FACTORY,
});

export const asLucideMilestoneIcon = fixed.asHook;
export const lucideMilestoneIcon = fixed.prototype;
export default lucideMilestoneIcon;
