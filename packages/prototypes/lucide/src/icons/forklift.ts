// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'forklift' as const;
export const LUCIDE_FORKLIFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 12H5a2 2 0 0 0-2 2v5' }),
  svg.path({ d: 'M15 19h7' }),
  svg.path({ d: 'M16 19V2' }),
  svg.path({
    d: 'M6 12V7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 16 10.828',
  }),
  svg.path({ d: 'M7 19h4' }),
  svg.circle({ cx: 13, cy: 19, r: 2 }),
  svg.circle({ cx: 5, cy: 19, r: 2 }),
];

export function renderLucideForkliftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FORKLIFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-forklift-icon',
  prototypeName: 'lucide-forklift-icon',
  shapeFactory: LUCIDE_FORKLIFT_SHAPE_FACTORY,
});

export const asLucideForkliftIcon = fixed.asHook;
export const lucideForkliftIcon = fixed.prototype;
export default lucideForkliftIcon;
