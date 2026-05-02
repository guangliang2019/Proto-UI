// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'unlink-2' as const;
export const LUCIDE_UNLINK_2_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2' });

export function renderLucideUnlink2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UNLINK_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-unlink-2-icon',
  prototypeName: 'lucide-unlink-2-icon',
  shapeFactory: LUCIDE_UNLINK_2_SHAPE_FACTORY,
});

export const asLucideUnlink2Icon = fixed.asHook;
export const lucideUnlink2Icon = fixed.prototype;
export default lucideUnlink2Icon;
