// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'fold-horizontal' as const;
export const LUCIDE_FOLD_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 12h6' }),
  svg.path({ d: 'M22 12h-6' }),
  svg.path({ d: 'M12 2v2' }),
  svg.path({ d: 'M12 8v2' }),
  svg.path({ d: 'M12 14v2' }),
  svg.path({ d: 'M12 20v2' }),
  svg.path({ d: 'm19 9-3 3 3 3' }),
  svg.path({ d: 'm5 15 3-3-3-3' }),
];

export function renderLucideFoldHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLD_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-fold-horizontal-icon',
  prototypeName: 'lucide-fold-horizontal-icon',
  shapeFactory: LUCIDE_FOLD_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideFoldHorizontalIcon = fixed.asHook;
export const lucideFoldHorizontalIcon = fixed.prototype;
export default lucideFoldHorizontalIcon;
