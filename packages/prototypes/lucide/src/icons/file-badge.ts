// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-badge' as const;
export const LUCIDE_FILE_BADGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({
    d: 'm7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88',
  }),
  svg.circle({ cx: 6, cy: 14, r: 3 }),
];

export function renderLucideFileBadgeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_BADGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-badge-icon',
  prototypeName: 'lucide-file-badge-icon',
  shapeFactory: LUCIDE_FILE_BADGE_SHAPE_FACTORY,
});

export const asLucideFileBadgeIcon = fixed.asHook;
export const lucideFileBadgeIcon = fixed.prototype;
export default lucideFileBadgeIcon;
