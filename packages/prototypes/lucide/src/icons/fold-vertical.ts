// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'fold-vertical' as const;
export const LUCIDE_FOLD_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 22v-6' }),
  svg.path({ d: 'M12 8V2' }),
  svg.path({ d: 'M4 12H2' }),
  svg.path({ d: 'M10 12H8' }),
  svg.path({ d: 'M16 12h-2' }),
  svg.path({ d: 'M22 12h-2' }),
  svg.path({ d: 'm15 19-3-3-3 3' }),
  svg.path({ d: 'm15 5-3 3-3-3' }),
];

export function renderLucideFoldVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLD_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-fold-vertical-icon',
  prototypeName: 'lucide-fold-vertical-icon',
  shapeFactory: LUCIDE_FOLD_VERTICAL_SHAPE_FACTORY,
});

export const asLucideFoldVerticalIcon = fixed.asHook;
export const lucideFoldVerticalIcon = fixed.prototype;
export default lucideFoldVerticalIcon;
