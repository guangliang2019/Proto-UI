// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-commit-vertical' as const;
export const LUCIDE_GIT_COMMIT_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3v6' }),
  svg.circle({ cx: 12, cy: 12, r: 3 }),
  svg.path({ d: 'M12 15v6' }),
];

export function renderLucideGitCommitVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_COMMIT_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-commit-vertical-icon',
  prototypeName: 'lucide-git-commit-vertical-icon',
  shapeFactory: LUCIDE_GIT_COMMIT_VERTICAL_SHAPE_FACTORY,
});

export const asLucideGitCommitVerticalIcon = fixed.asHook;
export const lucideGitCommitVerticalIcon = fixed.prototype;
export default lucideGitCommitVerticalIcon;
