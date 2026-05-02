// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'code' as const;
export const LUCIDE_CODE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 18 6-6-6-6' }),
  svg.path({ d: 'm8 6-6 6 6 6' }),
];

export function renderLucideCodeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CODE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-code-icon',
  prototypeName: 'lucide-code-icon',
  shapeFactory: LUCIDE_CODE_SHAPE_FACTORY,
});

export const asLucideCodeIcon = fixed.asHook;
export const lucideCodeIcon = fixed.prototype;
export default lucideCodeIcon;
