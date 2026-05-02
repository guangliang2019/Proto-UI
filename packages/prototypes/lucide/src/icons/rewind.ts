// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rewind' as const;
export const LUCIDE_REWIND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z' }),
  svg.path({ d: 'M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z' }),
];

export function renderLucideRewindIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REWIND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rewind-icon',
  prototypeName: 'lucide-rewind-icon',
  shapeFactory: LUCIDE_REWIND_SHAPE_FACTORY,
});

export const asLucideRewindIcon = fixed.asHook;
export const lucideRewindIcon = fixed.prototype;
export default lucideRewindIcon;
