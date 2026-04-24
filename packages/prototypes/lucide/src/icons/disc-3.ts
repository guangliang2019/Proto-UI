// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'disc-3' as const;
export const LUCIDE_DISC_3_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M6 12c0-1.7.7-3.2 1.8-4.2' }),
  svg.circle({ cx: 12, cy: 12, r: 2 }),
  svg.path({ d: 'M18 12c0 1.7-.7 3.2-1.8 4.2' }),
];

export function renderLucideDisc3Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DISC_3_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-disc-3-icon',
  prototypeName: 'lucide-disc-3-icon',
  shapeFactory: LUCIDE_DISC_3_SHAPE_FACTORY,
});

export const asLucideDisc3Icon = fixed.asHook;
export const lucideDisc3Icon = fixed.prototype;
export default lucideDisc3Icon;
