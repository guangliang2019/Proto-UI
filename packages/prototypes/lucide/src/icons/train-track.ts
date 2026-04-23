// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'train-track' as const;
export const LUCIDE_TRAIN_TRACK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 17 17 2' }),
  svg.path({ d: 'm2 14 8 8' }),
  svg.path({ d: 'm5 11 8 8' }),
  svg.path({ d: 'm8 8 8 8' }),
  svg.path({ d: 'm11 5 8 8' }),
  svg.path({ d: 'm14 2 8 8' }),
  svg.path({ d: 'M7 22 22 7' }),
];

export function renderLucideTrainTrackIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRAIN_TRACK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-train-track-icon',
  prototypeName: 'lucide-train-track-icon',
  shapeFactory: LUCIDE_TRAIN_TRACK_SHAPE_FACTORY,
});

export const asLucideTrainTrackIcon = fixed.asHook;
export const lucideTrainTrackIcon = fixed.prototype;
export default lucideTrainTrackIcon;
