// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-commit-horizontal' as const;
export const LUCIDE_GIT_COMMIT_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 3 }),
  svg.line({ x1: 3, x2: 9, y1: 12, y2: 12 }),
  svg.line({ x1: 15, x2: 21, y1: 12, y2: 12 }),
];

export function renderLucideGitCommitHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_COMMIT_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-commit-horizontal-icon',
  prototypeName: 'lucide-git-commit-horizontal-icon',
  shapeFactory: LUCIDE_GIT_COMMIT_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideGitCommitHorizontalIcon = fixed.asHook;
export const lucideGitCommitHorizontalIcon = fixed.prototype;
export default lucideGitCommitHorizontalIcon;
