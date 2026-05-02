// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-sync' as const;
export const LUCIDE_CLOUD_SYNC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm17 18-1.535 1.605a5 5 0 0 1-8-1.5' }),
  svg.path({ d: 'M17 22v-4h-4' }),
  svg.path({ d: 'M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607' }),
  svg.path({ d: 'M7 10v4h4' }),
  svg.path({ d: 'm7 14 1.535-1.605a5 5 0 0 1 8 1.5' }),
];

export function renderLucideCloudSyncIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_SYNC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-sync-icon',
  prototypeName: 'lucide-cloud-sync-icon',
  shapeFactory: LUCIDE_CLOUD_SYNC_SHAPE_FACTORY,
});

export const asLucideCloudSyncIcon = fixed.asHook;
export const lucideCloudSyncIcon = fixed.prototype;
export default lucideCloudSyncIcon;
