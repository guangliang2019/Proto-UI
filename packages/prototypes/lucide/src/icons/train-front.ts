// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'train-front' as const;
export const LUCIDE_TRAIN_FRONT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 3.1V7a4 4 0 0 0 8 0V3.1' }),
  svg.path({ d: 'm9 15-1-1' }),
  svg.path({ d: 'm15 15 1-1' }),
  svg.path({ d: 'M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z' }),
  svg.path({ d: 'm8 19-2 3' }),
  svg.path({ d: 'm16 19 2 3' }),
];

export function renderLucideTrainFrontIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRAIN_FRONT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-train-front-icon',
  prototypeName: 'lucide-train-front-icon',
  shapeFactory: LUCIDE_TRAIN_FRONT_SHAPE_FACTORY,
});

export const asLucideTrainFrontIcon = fixed.asHook;
export const lucideTrainFrontIcon = fixed.prototype;
export default lucideTrainFrontIcon;
