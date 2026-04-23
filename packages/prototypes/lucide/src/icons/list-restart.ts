// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-restart' as const;
export const LUCIDE_LIST_RESTART_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 5H3' }),
  svg.path({ d: 'M7 12H3' }),
  svg.path({ d: 'M7 19H3' }),
  svg.path({ d: 'M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14' }),
  svg.path({ d: 'M11 10v4h4' }),
];

export function renderLucideListRestartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_RESTART_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-restart-icon',
  prototypeName: 'lucide-list-restart-icon',
  shapeFactory: LUCIDE_LIST_RESTART_SHAPE_FACTORY,
});

export const asLucideListRestartIcon = fixed.asHook;
export const lucideListRestartIcon = fixed.prototype;
export default lucideListRestartIcon;
