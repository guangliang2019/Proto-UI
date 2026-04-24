// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'space' as const;
export const LUCIDE_SPACE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1' });

export function renderLucideSpaceIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPACE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-space-icon',
  prototypeName: 'lucide-space-icon',
  shapeFactory: LUCIDE_SPACE_SHAPE_FACTORY,
});

export const asLucideSpaceIcon = fixed.asHook;
export const lucideSpaceIcon = fixed.prototype;
export default lucideSpaceIcon;
