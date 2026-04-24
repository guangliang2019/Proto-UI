// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'proportions' as const;
export const LUCIDE_PROPORTIONS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 16, x: 2, y: 4, rx: 2 }),
  svg.path({ d: 'M12 9v11' }),
  svg.path({ d: 'M2 9h13a2 2 0 0 1 2 2v9' }),
];

export function renderLucideProportionsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PROPORTIONS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-proportions-icon',
  prototypeName: 'lucide-proportions-icon',
  shapeFactory: LUCIDE_PROPORTIONS_SHAPE_FACTORY,
});

export const asLucideProportionsIcon = fixed.asHook;
export const lucideProportionsIcon = fixed.prototype;
export default lucideProportionsIcon;
