// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-fork' as const;
export const LUCIDE_GIT_FORK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 18, r: 3 }),
  svg.circle({ cx: 6, cy: 6, r: 3 }),
  svg.circle({ cx: 18, cy: 6, r: 3 }),
  svg.path({ d: 'M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9' }),
  svg.path({ d: 'M12 12v3' }),
];

export function renderLucideGitForkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_FORK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-fork-icon',
  prototypeName: 'lucide-git-fork-icon',
  shapeFactory: LUCIDE_GIT_FORK_SHAPE_FACTORY,
});

export const asLucideGitForkIcon = fixed.asHook;
export const lucideGitForkIcon = fixed.prototype;
export default lucideGitForkIcon;
