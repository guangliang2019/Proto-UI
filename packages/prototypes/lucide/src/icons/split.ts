// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'split' as const;
export const LUCIDE_SPLIT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 3h5v5' }),
  svg.path({ d: 'M8 3H3v5' }),
  svg.path({ d: 'M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3' }),
  svg.path({ d: 'm15 9 6-6' }),
];

export function renderLucideSplitIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPLIT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-split-icon',
  prototypeName: 'lucide-split-icon',
  shapeFactory: LUCIDE_SPLIT_SHAPE_FACTORY,
});

export const asLucideSplitIcon = fixed.asHook;
export const lucideSplitIcon = fixed.prototype;
export default lucideSplitIcon;
