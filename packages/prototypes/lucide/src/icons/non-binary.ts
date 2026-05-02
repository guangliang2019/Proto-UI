// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'non-binary' as const;
export const LUCIDE_NON_BINARY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v10' }),
  svg.path({ d: 'm8.5 4 7 4' }),
  svg.path({ d: 'm8.5 8 7-4' }),
  svg.circle({ cx: 12, cy: 17, r: 5 }),
];

export function renderLucideNonBinaryIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_NON_BINARY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-non-binary-icon',
  prototypeName: 'lucide-non-binary-icon',
  shapeFactory: LUCIDE_NON_BINARY_SHAPE_FACTORY,
});

export const asLucideNonBinaryIcon = fixed.asHook;
export const lucideNonBinaryIcon = fixed.prototype;
export default lucideNonBinaryIcon;
