// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-cog' as const;
export const LUCIDE_FOLDER_COG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3',
  }),
  svg.path({ d: 'm14.305 19.53.923-.382' }),
  svg.path({ d: 'm15.228 16.852-.923-.383' }),
  svg.path({ d: 'm16.852 15.228-.383-.923' }),
  svg.path({ d: 'm16.852 20.772-.383.924' }),
  svg.path({ d: 'm19.148 15.228.383-.923' }),
  svg.path({ d: 'm19.53 21.696-.382-.924' }),
  svg.path({ d: 'm20.772 16.852.924-.383' }),
  svg.path({ d: 'm20.772 19.148.924.383' }),
  svg.circle({ cx: 18, cy: 18, r: 3 }),
];

export function renderLucideFolderCogIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_COG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-cog-icon',
  prototypeName: 'lucide-folder-cog-icon',
  shapeFactory: LUCIDE_FOLDER_COG_SHAPE_FACTORY,
});

export const asLucideFolderCogIcon = fixed.asHook;
export const lucideFolderCogIcon = fixed.prototype;
export default lucideFolderCogIcon;
