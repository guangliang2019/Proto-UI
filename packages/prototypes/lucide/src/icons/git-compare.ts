// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-compare' as const;
export const LUCIDE_GIT_COMPARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 18, cy: 18, r: 3 }),
  svg.circle({ cx: 6, cy: 6, r: 3 }),
  svg.path({ d: 'M13 6h3a2 2 0 0 1 2 2v7' }),
  svg.path({ d: 'M11 18H8a2 2 0 0 1-2-2V9' }),
];

export function renderLucideGitCompareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_COMPARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-compare-icon',
  prototypeName: 'lucide-git-compare-icon',
  shapeFactory: LUCIDE_GIT_COMPARE_SHAPE_FACTORY,
});

export const asLucideGitCompareIcon = fixed.asHook;
export const lucideGitCompareIcon = fixed.prototype;
export default lucideGitCompareIcon;
