// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'text-initial' as const;
export const LUCIDE_TEXT_INITIAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 5h6' }),
  svg.path({ d: 'M15 12h6' }),
  svg.path({ d: 'M3 19h18' }),
  svg.path({ d: 'm3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12' }),
  svg.path({ d: 'M3.92 10h6.16' }),
];

export function renderLucideTextInitialIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEXT_INITIAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-text-initial-icon',
  prototypeName: 'lucide-text-initial-icon',
  shapeFactory: LUCIDE_TEXT_INITIAL_SHAPE_FACTORY,
});

export const asLucideTextInitialIcon = fixed.asHook;
export const lucideTextInitialIcon = fixed.prototype;
export default lucideTextInitialIcon;
