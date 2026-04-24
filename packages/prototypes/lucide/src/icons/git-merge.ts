// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-merge' as const;
export const LUCIDE_GIT_MERGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 18, cy: 18, r: 3 }),
  svg.circle({ cx: 6, cy: 6, r: 3 }),
  svg.path({ d: 'M6 21V9a9 9 0 0 0 9 9' }),
];

export function renderLucideGitMergeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_MERGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-merge-icon',
  prototypeName: 'lucide-git-merge-icon',
  shapeFactory: LUCIDE_GIT_MERGE_SHAPE_FACTORY,
});

export const asLucideGitMergeIcon = fixed.asHook;
export const lucideGitMergeIcon = fixed.prototype;
export default lucideGitMergeIcon;
