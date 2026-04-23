// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'waves-ladder' as const;
export const LUCIDE_WAVES_LADDER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19 5a2 2 0 0 0-2 2v11' }),
  svg.path({
    d: 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
  }),
  svg.path({ d: 'M7 13h10' }),
  svg.path({ d: 'M7 9h10' }),
  svg.path({ d: 'M9 5a2 2 0 0 0-2 2v11' }),
];

export function renderLucideWavesLadderIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WAVES_LADDER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-waves-ladder-icon',
  prototypeName: 'lucide-waves-ladder-icon',
  shapeFactory: LUCIDE_WAVES_LADDER_SHAPE_FACTORY,
});

export const asLucideWavesLadderIcon = fixed.asHook;
export const lucideWavesLadderIcon = fixed.prototype;
export default lucideWavesLadderIcon;
