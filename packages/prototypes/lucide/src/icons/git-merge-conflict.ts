// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-merge-conflict' as const;
export const LUCIDE_GIT_MERGE_CONFLICT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6h4a2 2 0 0 1 2 2v7' }),
  svg.path({ d: 'M6 12v9' }),
  svg.path({ d: 'M9 3 3 9' }),
  svg.path({ d: 'M9 9 3 3' }),
  svg.circle({ cx: 18, cy: 18, r: 3 }),
];

export function renderLucideGitMergeConflictIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_MERGE_CONFLICT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-merge-conflict-icon',
  prototypeName: 'lucide-git-merge-conflict-icon',
  shapeFactory: LUCIDE_GIT_MERGE_CONFLICT_SHAPE_FACTORY,
});

export const asLucideGitMergeConflictIcon = fixed.asHook;
export const lucideGitMergeConflictIcon = fixed.prototype;
export default lucideGitMergeConflictIcon;
