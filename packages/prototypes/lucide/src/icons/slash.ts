// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'slash' as const;
export const LUCIDE_SLASH_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M22 2 2 22' });

export function renderLucideSlashIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SLASH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-slash-icon',
  prototypeName: 'lucide-slash-icon',
  shapeFactory: LUCIDE_SLASH_SHAPE_FACTORY,
});

export const asLucideSlashIcon = fixed.asHook;
export const lucideSlashIcon = fixed.prototype;
export default lucideSlashIcon;
