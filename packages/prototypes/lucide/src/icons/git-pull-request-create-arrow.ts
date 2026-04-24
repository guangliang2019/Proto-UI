// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-pull-request-create-arrow' as const;
export const LUCIDE_GIT_PULL_REQUEST_CREATE_ARROW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 5, cy: 6, r: 3 }),
  svg.path({ d: 'M5 9v12' }),
  svg.path({ d: 'm15 9-3-3 3-3' }),
  svg.path({ d: 'M12 6h5a2 2 0 0 1 2 2v3' }),
  svg.path({ d: 'M19 15v6' }),
  svg.path({ d: 'M22 18h-6' }),
];

export function renderLucideGitPullRequestCreateArrowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_PULL_REQUEST_CREATE_ARROW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-pull-request-create-arrow-icon',
  prototypeName: 'lucide-git-pull-request-create-arrow-icon',
  shapeFactory: LUCIDE_GIT_PULL_REQUEST_CREATE_ARROW_SHAPE_FACTORY,
});

export const asLucideGitPullRequestCreateArrowIcon = fixed.asHook;
export const lucideGitPullRequestCreateArrowIcon = fixed.prototype;
export default lucideGitPullRequestCreateArrowIcon;
