// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'disc-2' as const;
export const LUCIDE_DISC_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.circle({ cx: 12, cy: 12, r: 4 }),
  svg.path({ d: 'M12 12h.01' }),
];

export function renderLucideDisc2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DISC_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-disc-2-icon',
  prototypeName: 'lucide-disc-2-icon',
  shapeFactory: LUCIDE_DISC_2_SHAPE_FACTORY,
});

export const asLucideDisc2Icon = fixed.asHook;
export const lucideDisc2Icon = fixed.prototype;
export default lucideDisc2Icon;
