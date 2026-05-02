// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'redo-2' as const;
export const LUCIDE_REDO_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15 14 5-5-5-5' }),
  svg.path({ d: 'M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13' }),
];

export function renderLucideRedo2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REDO_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-redo-2-icon',
  prototypeName: 'lucide-redo-2-icon',
  shapeFactory: LUCIDE_REDO_2_SHAPE_FACTORY,
});

export const asLucideRedo2Icon = fixed.asHook;
export const lucideRedo2Icon = fixed.prototype;
export default lucideRedo2Icon;
