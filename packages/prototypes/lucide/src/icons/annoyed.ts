// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'annoyed' as const;
export const LUCIDE_ANNOYED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M8 15h8' }),
  svg.path({ d: 'M8 9h2' }),
  svg.path({ d: 'M14 9h2' }),
];

export function renderLucideAnnoyedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ANNOYED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-annoyed-icon',
  prototypeName: 'lucide-annoyed-icon',
  shapeFactory: LUCIDE_ANNOYED_SHAPE_FACTORY,
});

export const asLucideAnnoyedIcon = fixed.asHook;
export const lucideAnnoyedIcon = fixed.prototype;
export default lucideAnnoyedIcon;
