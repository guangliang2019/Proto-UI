// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-branch-minus' as const;
export const LUCIDE_GIT_BRANCH_MINUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 6a9 9 0 0 0-9 9V3' }),
  svg.path({ d: 'M21 18h-6' }),
  svg.circle({ cx: 18, cy: 6, r: 3 }),
  svg.circle({ cx: 6, cy: 18, r: 3 }),
];

export function renderLucideGitBranchMinusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_BRANCH_MINUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-branch-minus-icon',
  prototypeName: 'lucide-git-branch-minus-icon',
  shapeFactory: LUCIDE_GIT_BRANCH_MINUS_SHAPE_FACTORY,
});

export const asLucideGitBranchMinusIcon = fixed.asHook;
export const lucideGitBranchMinusIcon = fixed.prototype;
export default lucideGitBranchMinusIcon;
