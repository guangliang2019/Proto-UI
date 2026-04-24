// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'command' as const;
export const LUCIDE_COMMAND_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' });

export function renderLucideCommandIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COMMAND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-command-icon',
  prototypeName: 'lucide-command-icon',
  shapeFactory: LUCIDE_COMMAND_SHAPE_FACTORY,
});

export const asLucideCommandIcon = fixed.asHook;
export const lucideCommandIcon = fixed.prototype;
export default lucideCommandIcon;
