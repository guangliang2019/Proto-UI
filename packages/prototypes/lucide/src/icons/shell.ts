// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shell' as const;
export const LUCIDE_SHELL_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44',
  });

export function renderLucideShellIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHELL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shell-icon',
  prototypeName: 'lucide-shell-icon',
  shapeFactory: LUCIDE_SHELL_SHAPE_FACTORY,
});

export const asLucideShellIcon = fixed.asHook;
export const lucideShellIcon = fixed.prototype;
export default lucideShellIcon;
