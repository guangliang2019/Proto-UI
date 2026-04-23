// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'vote' as const;
export const LUCIDE_VOTE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm9 12 2 2 4-4' }),
  svg.path({ d: 'M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z' }),
  svg.path({ d: 'M22 19H2' }),
];

export function renderLucideVoteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VOTE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-vote-icon',
  prototypeName: 'lucide-vote-icon',
  shapeFactory: LUCIDE_VOTE_SHAPE_FACTORY,
});

export const asLucideVoteIcon = fixed.asHook;
export const lucideVoteIcon = fixed.prototype;
export default lucideVoteIcon;
