// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-pull-request-closed' as const;
export const LUCIDE_GIT_PULL_REQUEST_CLOSED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 6, cy: 6, r: 3 }),
  svg.path({ d: 'M6 9v12' }),
  svg.path({ d: 'm21 3-6 6' }),
  svg.path({ d: 'm21 9-6-6' }),
  svg.path({ d: 'M18 11.5V15' }),
  svg.circle({ cx: 18, cy: 18, r: 3 }),
];

export function renderLucideGitPullRequestClosedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_PULL_REQUEST_CLOSED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-pull-request-closed-icon',
  prototypeName: 'lucide-git-pull-request-closed-icon',
  shapeFactory: LUCIDE_GIT_PULL_REQUEST_CLOSED_SHAPE_FACTORY,
});

export const asLucideGitPullRequestClosedIcon = fixed.asHook;
export const lucideGitPullRequestClosedIcon = fixed.prototype;
export default lucideGitPullRequestClosedIcon;
