// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'test-tube-diagonal' as const;
export const LUCIDE_TEST_TUBE_DIAGONAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3' }),
  svg.path({ d: 'm16 2 6 6' }),
  svg.path({ d: 'M12 16H4' }),
];

export function renderLucideTestTubeDiagonalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEST_TUBE_DIAGONAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-test-tube-diagonal-icon',
  prototypeName: 'lucide-test-tube-diagonal-icon',
  shapeFactory: LUCIDE_TEST_TUBE_DIAGONAL_SHAPE_FACTORY,
});

export const asLucideTestTubeDiagonalIcon = fixed.asHook;
export const lucideTestTubeDiagonalIcon = fixed.prototype;
export default lucideTestTubeDiagonalIcon;
