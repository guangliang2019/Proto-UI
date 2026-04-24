// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-pull-request' as const;
export const LUCIDE_GIT_PULL_REQUEST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 18, cy: 18, r: 3 }),
  svg.circle({ cx: 6, cy: 6, r: 3 }),
  svg.path({ d: 'M13 6h3a2 2 0 0 1 2 2v7' }),
  svg.line({ x1: 6, x2: 6, y1: 9, y2: 21 }),
];

export function renderLucideGitPullRequestIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_PULL_REQUEST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-pull-request-icon',
  prototypeName: 'lucide-git-pull-request-icon',
  shapeFactory: LUCIDE_GIT_PULL_REQUEST_SHAPE_FACTORY,
});

export const asLucideGitPullRequestIcon = fixed.asHook;
export const lucideGitPullRequestIcon = fixed.prototype;
export default lucideGitPullRequestIcon;
