// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'blocks' as const;
export const LUCIDE_BLOCKS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2',
  }),
  svg.rect({ x: 14, y: 2, width: 8, height: 8, rx: 1 }),
];

export function renderLucideBlocksIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BLOCKS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-blocks-icon',
  prototypeName: 'lucide-blocks-icon',
  shapeFactory: LUCIDE_BLOCKS_SHAPE_FACTORY,
});

export const asLucideBlocksIcon = fixed.asHook;
export const lucideBlocksIcon = fixed.prototype;
export default lucideBlocksIcon;
