// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-checks' as const;
export const LUCIDE_LIST_CHECKS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 5h8' }),
  svg.path({ d: 'M13 12h8' }),
  svg.path({ d: 'M13 19h8' }),
  svg.path({ d: 'm3 17 2 2 4-4' }),
  svg.path({ d: 'm3 7 2 2 4-4' }),
];

export function renderLucideListChecksIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_CHECKS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-checks-icon',
  prototypeName: 'lucide-list-checks-icon',
  shapeFactory: LUCIDE_LIST_CHECKS_SHAPE_FACTORY,
});

export const asLucideListChecksIcon = fixed.asHook;
export const lucideListChecksIcon = fixed.prototype;
export default lucideListChecksIcon;
