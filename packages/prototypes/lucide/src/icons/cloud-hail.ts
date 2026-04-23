// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-hail' as const;
export const LUCIDE_CLOUD_HAIL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }),
  svg.path({ d: 'M16 14v2' }),
  svg.path({ d: 'M8 14v2' }),
  svg.path({ d: 'M16 20h.01' }),
  svg.path({ d: 'M8 20h.01' }),
  svg.path({ d: 'M12 16v2' }),
  svg.path({ d: 'M12 22h.01' }),
];

export function renderLucideCloudHailIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_HAIL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-hail-icon',
  prototypeName: 'lucide-cloud-hail-icon',
  shapeFactory: LUCIDE_CLOUD_HAIL_SHAPE_FACTORY,
});

export const asLucideCloudHailIcon = fixed.asHook;
export const lucideCloudHailIcon = fixed.prototype;
export default lucideCloudHailIcon;
