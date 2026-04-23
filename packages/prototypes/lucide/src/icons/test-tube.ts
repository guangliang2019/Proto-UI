// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'test-tube' as const;
export const LUCIDE_TEST_TUBE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2' }),
  svg.path({ d: 'M8.5 2h7' }),
  svg.path({ d: 'M14.5 16h-5' }),
];

export function renderLucideTestTubeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEST_TUBE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-test-tube-icon',
  prototypeName: 'lucide-test-tube-icon',
  shapeFactory: LUCIDE_TEST_TUBE_SHAPE_FACTORY,
});

export const asLucideTestTubeIcon = fixed.asHook;
export const lucideTestTubeIcon = fixed.prototype;
export default lucideTestTubeIcon;
