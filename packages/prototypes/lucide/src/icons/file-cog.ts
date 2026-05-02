// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-cog' as const;
export const LUCIDE_FILE_COG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z' }),
  svg.path({ d: 'M20 8v12a2 2 0 0 1-2 2h-4.182' }),
  svg.path({ d: 'm3.305 19.53.923-.382' }),
  svg.path({ d: 'M4 10.592V4a2 2 0 0 1 2-2h8' }),
  svg.path({ d: 'm4.228 16.852-.924-.383' }),
  svg.path({ d: 'm5.852 15.228-.383-.923' }),
  svg.path({ d: 'm5.852 20.772-.383.924' }),
  svg.path({ d: 'm8.148 15.228.383-.923' }),
  svg.path({ d: 'm8.53 21.696-.382-.924' }),
  svg.path({ d: 'm9.773 16.852.922-.383' }),
  svg.path({ d: 'm9.773 19.148.922.383' }),
  svg.circle({ cx: 7, cy: 18, r: 3 }),
];

export function renderLucideFileCogIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_COG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-cog-icon',
  prototypeName: 'lucide-file-cog-icon',
  shapeFactory: LUCIDE_FILE_COG_SHAPE_FACTORY,
});

export const asLucideFileCogIcon = fixed.asHook;
export const lucideFileCogIcon = fixed.prototype;
export default lucideFileCogIcon;
