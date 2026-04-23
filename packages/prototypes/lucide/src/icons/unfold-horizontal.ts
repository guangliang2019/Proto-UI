// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'unfold-horizontal' as const;
export const LUCIDE_UNFOLD_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 12h6' }),
  svg.path({ d: 'M8 12H2' }),
  svg.path({ d: 'M12 2v2' }),
  svg.path({ d: 'M12 8v2' }),
  svg.path({ d: 'M12 14v2' }),
  svg.path({ d: 'M12 20v2' }),
  svg.path({ d: 'm19 15 3-3-3-3' }),
  svg.path({ d: 'm5 9-3 3 3 3' }),
];

export function renderLucideUnfoldHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UNFOLD_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-unfold-horizontal-icon',
  prototypeName: 'lucide-unfold-horizontal-icon',
  shapeFactory: LUCIDE_UNFOLD_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideUnfoldHorizontalIcon = fixed.asHook;
export const lucideUnfoldHorizontalIcon = fixed.prototype;
export default lucideUnfoldHorizontalIcon;
