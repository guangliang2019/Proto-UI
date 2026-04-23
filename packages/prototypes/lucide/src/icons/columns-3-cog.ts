// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'columns-3-cog' as const;
export const LUCIDE_COLUMNS_3_COG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5' }),
  svg.path({ d: 'm14.3 19.6 1-.4' }),
  svg.path({ d: 'M15 3v7.5' }),
  svg.path({ d: 'm15.2 16.9-.9-.3' }),
  svg.path({ d: 'm16.6 21.7.3-.9' }),
  svg.path({ d: 'm16.8 15.3-.4-1' }),
  svg.path({ d: 'm19.1 15.2.3-.9' }),
  svg.path({ d: 'm19.6 21.7-.4-1' }),
  svg.path({ d: 'm20.7 16.8 1-.4' }),
  svg.path({ d: 'm21.7 19.4-.9-.3' }),
  svg.path({ d: 'M9 3v18' }),
  svg.circle({ cx: 18, cy: 18, r: 3 }),
];

export function renderLucideColumns3CogIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COLUMNS_3_COG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-columns-3-cog-icon',
  prototypeName: 'lucide-columns-3-cog-icon',
  shapeFactory: LUCIDE_COLUMNS_3_COG_SHAPE_FACTORY,
});

export const asLucideColumns3CogIcon = fixed.asHook;
export const lucideColumns3CogIcon = fixed.prototype;
export default lucideColumns3CogIcon;
