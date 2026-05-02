// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pocket-knife' as const;
export const LUCIDE_POCKET_KNIFE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2' }),
  svg.path({ d: 'M18 6h.01' }),
  svg.path({ d: 'M6 18h.01' }),
  svg.path({ d: 'M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z' }),
  svg.path({ d: 'M18 11.66V22a4 4 0 0 0 4-4V6' }),
];

export function renderLucidePocketKnifeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_POCKET_KNIFE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pocket-knife-icon',
  prototypeName: 'lucide-pocket-knife-icon',
  shapeFactory: LUCIDE_POCKET_KNIFE_SHAPE_FACTORY,
});

export const asLucidePocketKnifeIcon = fixed.asHook;
export const lucidePocketKnifeIcon = fixed.prototype;
export default lucidePocketKnifeIcon;
