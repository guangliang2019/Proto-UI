// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-branch-plus' as const;
export const LUCIDE_GIT_BRANCH_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 3v12' }),
  svg.path({ d: 'M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' }),
  svg.path({ d: 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' }),
  svg.path({ d: 'M15 6a9 9 0 0 0-9 9' }),
  svg.path({ d: 'M18 15v6' }),
  svg.path({ d: 'M21 18h-6' }),
];

export function renderLucideGitBranchPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_BRANCH_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-branch-plus-icon',
  prototypeName: 'lucide-git-branch-plus-icon',
  shapeFactory: LUCIDE_GIT_BRANCH_PLUS_SHAPE_FACTORY,
});

export const asLucideGitBranchPlusIcon = fixed.asHook;
export const lucideGitBranchPlusIcon = fixed.prototype;
export default lucideGitBranchPlusIcon;
