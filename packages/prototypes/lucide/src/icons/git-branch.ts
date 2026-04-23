// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-branch' as const;
export const LUCIDE_GIT_BRANCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 6a9 9 0 0 0-9 9V3' }),
  svg.circle({ cx: 18, cy: 6, r: 3 }),
  svg.circle({ cx: 6, cy: 18, r: 3 }),
];

export function renderLucideGitBranchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_BRANCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-branch-icon',
  prototypeName: 'lucide-git-branch-icon',
  shapeFactory: LUCIDE_GIT_BRANCH_SHAPE_FACTORY,
});

export const asLucideGitBranchIcon = fixed.asHook;
export const lucideGitBranchIcon = fixed.prototype;
export default lucideGitBranchIcon;
