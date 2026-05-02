// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-git-2' as const;
export const LUCIDE_FOLDER_GIT_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 19a5 5 0 0 1-5-5v8' }),
  svg.path({
    d: 'M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5',
  }),
  svg.circle({ cx: 13, cy: 12, r: 2 }),
  svg.circle({ cx: 20, cy: 19, r: 2 }),
];

export function renderLucideFolderGit2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_GIT_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-git-2-icon',
  prototypeName: 'lucide-folder-git-2-icon',
  shapeFactory: LUCIDE_FOLDER_GIT_2_SHAPE_FACTORY,
});

export const asLucideFolderGit2Icon = fixed.asHook;
export const lucideFolderGit2Icon = fixed.prototype;
export default lucideFolderGit2Icon;
