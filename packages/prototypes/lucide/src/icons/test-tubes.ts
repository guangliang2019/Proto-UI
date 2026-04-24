// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'test-tubes' as const;
export const LUCIDE_TEST_TUBES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2' }),
  svg.path({ d: 'M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2' }),
  svg.path({ d: 'M3 2h7' }),
  svg.path({ d: 'M14 2h7' }),
  svg.path({ d: 'M9 16H4' }),
  svg.path({ d: 'M20 16h-5' }),
];

export function renderLucideTestTubesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEST_TUBES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-test-tubes-icon',
  prototypeName: 'lucide-test-tubes-icon',
  shapeFactory: LUCIDE_TEST_TUBES_SHAPE_FACTORY,
});

export const asLucideTestTubesIcon = fixed.asHook;
export const lucideTestTubesIcon = fixed.prototype;
export default lucideTestTubesIcon;
