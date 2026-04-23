// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'balloon' as const;
export const LUCIDE_BALLOON_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1' }),
  svg.path({ d: 'M12 6a2 2 0 0 1 2 2' }),
  svg.path({ d: 'M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0' }),
];

export function renderLucideBalloonIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BALLOON_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-balloon-icon',
  prototypeName: 'lucide-balloon-icon',
  shapeFactory: LUCIDE_BALLOON_SHAPE_FACTORY,
});

export const asLucideBalloonIcon = fixed.asHook;
export const lucideBalloonIcon = fixed.prototype;
export default lucideBalloonIcon;
