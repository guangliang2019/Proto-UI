// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'disc' as const;
export const LUCIDE_DISC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.circle({ cx: 12, cy: 12, r: 2 }),
];

export function renderLucideDiscIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DISC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-disc-icon',
  prototypeName: 'lucide-disc-icon',
  shapeFactory: LUCIDE_DISC_SHAPE_FACTORY,
});

export const asLucideDiscIcon = fixed.asHook;
export const lucideDiscIcon = fixed.prototype;
export default lucideDiscIcon;
