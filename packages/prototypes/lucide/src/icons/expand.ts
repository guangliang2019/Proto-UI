// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'expand' as const;
export const LUCIDE_EXPAND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15 15 6 6' }),
  svg.path({ d: 'm15 9 6-6' }),
  svg.path({ d: 'M21 16v5h-5' }),
  svg.path({ d: 'M21 8V3h-5' }),
  svg.path({ d: 'M3 16v5h5' }),
  svg.path({ d: 'm3 21 6-6' }),
  svg.path({ d: 'M3 8V3h5' }),
  svg.path({ d: 'M9 9 3 3' }),
];

export function renderLucideExpandIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EXPAND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-expand-icon',
  prototypeName: 'lucide-expand-icon',
  shapeFactory: LUCIDE_EXPAND_SHAPE_FACTORY,
});

export const asLucideExpandIcon = fixed.asHook;
export const lucideExpandIcon = fixed.prototype;
export default lucideExpandIcon;
