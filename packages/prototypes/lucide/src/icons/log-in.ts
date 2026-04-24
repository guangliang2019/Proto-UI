// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'log-in' as const;
export const LUCIDE_LOG_IN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10 17 5-5-5-5' }),
  svg.path({ d: 'M15 12H3' }),
  svg.path({ d: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' }),
];

export function renderLucideLogInIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOG_IN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-log-in-icon',
  prototypeName: 'lucide-log-in-icon',
  shapeFactory: LUCIDE_LOG_IN_SHAPE_FACTORY,
});

export const asLucideLogInIcon = fixed.asHook;
export const lucideLogInIcon = fixed.prototype;
export default lucideLogInIcon;
