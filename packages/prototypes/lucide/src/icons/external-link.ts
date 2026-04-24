// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'external-link' as const;
export const LUCIDE_EXTERNAL_LINK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 3h6v6' }),
  svg.path({ d: 'M10 14 21 3' }),
  svg.path({ d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
];

export function renderLucideExternalLinkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EXTERNAL_LINK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-external-link-icon',
  prototypeName: 'lucide-external-link-icon',
  shapeFactory: LUCIDE_EXTERNAL_LINK_SHAPE_FACTORY,
});

export const asLucideExternalLinkIcon = fixed.asHook;
export const lucideExternalLinkIcon = fixed.prototype;
export default lucideExternalLinkIcon;
