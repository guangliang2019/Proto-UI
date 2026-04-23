// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'squircle' as const;
export const LUCIDE_SQUIRCLE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9' });

export function renderLucideSquircleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUIRCLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-squircle-icon',
  prototypeName: 'lucide-squircle-icon',
  shapeFactory: LUCIDE_SQUIRCLE_SHAPE_FACTORY,
});

export const asLucideSquircleIcon = fixed.asHook;
export const lucideSquircleIcon = fixed.prototype;
export default lucideSquircleIcon;
