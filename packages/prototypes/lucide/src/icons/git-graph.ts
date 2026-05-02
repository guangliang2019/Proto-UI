// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'git-graph' as const;
export const LUCIDE_GIT_GRAPH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 5, cy: 6, r: 3 }),
  svg.path({ d: 'M5 9v6' }),
  svg.circle({ cx: 5, cy: 18, r: 3 }),
  svg.path({ d: 'M12 3v18' }),
  svg.circle({ cx: 19, cy: 6, r: 3 }),
  svg.path({ d: 'M16 15.7A9 9 0 0 0 19 9' }),
];

export function renderLucideGitGraphIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIT_GRAPH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-git-graph-icon',
  prototypeName: 'lucide-git-graph-icon',
  shapeFactory: LUCIDE_GIT_GRAPH_SHAPE_FACTORY,
});

export const asLucideGitGraphIcon = fixed.asHook;
export const lucideGitGraphIcon = fixed.prototype;
export default lucideGitGraphIcon;
