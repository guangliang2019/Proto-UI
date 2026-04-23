// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-center-vertical' as const;
export const LUCIDE_ALIGN_CENTER_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v20' }),
  svg.path({ d: 'M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4' }),
  svg.path({ d: 'M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4' }),
  svg.path({ d: 'M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1' }),
  svg.path({ d: 'M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1' }),
];

export function renderLucideAlignCenterVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_CENTER_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-center-vertical-icon',
  prototypeName: 'lucide-align-center-vertical-icon',
  shapeFactory: LUCIDE_ALIGN_CENTER_VERTICAL_SHAPE_FACTORY,
});

export const asLucideAlignCenterVerticalIcon = fixed.asHook;
export const lucideAlignCenterVerticalIcon = fixed.prototype;
export default lucideAlignCenterVerticalIcon;
