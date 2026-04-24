// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-pull-request-draft' as const;
export const LUCIDE_GIT_PULL_REQUEST_DRAFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 18, cy: 18, r: 3 }),
  svg.circle({ cx: 6, cy: 6, r: 3 }),
  svg.path({ d: 'M18 6V5' }),
  svg.path({ d: 'M18 11v-1' }),
  svg.line({ x1: 6, x2: 6, y1: 9, y2: 21 }),
];

export function renderLucideGitPullRequestDraftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_PULL_REQUEST_DRAFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-pull-request-draft-icon',
  prototypeName: 'lucide-git-pull-request-draft-icon',
  shapeFactory: LUCIDE_GIT_PULL_REQUEST_DRAFT_SHAPE_FACTORY,
});

export const asLucideGitPullRequestDraftIcon = fixed.asHook;
export const lucideGitPullRequestDraftIcon = fixed.prototype;
export default lucideGitPullRequestDraftIcon;
