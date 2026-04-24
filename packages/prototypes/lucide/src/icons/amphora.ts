// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'amphora' as const;
export const LUCIDE_AMPHORA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8' }),
  svg.path({ d: 'M10 5H8a2 2 0 0 0 0 4h.68' }),
  svg.path({ d: 'M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8' }),
  svg.path({ d: 'M14 5h2a2 2 0 0 1 0 4h-.68' }),
  svg.path({ d: 'M18 22H6' }),
  svg.path({ d: 'M9 2h6' }),
];

export function renderLucideAmphoraIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AMPHORA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-amphora-icon',
  prototypeName: 'lucide-amphora-icon',
  shapeFactory: LUCIDE_AMPHORA_SHAPE_FACTORY,
});

export const asLucideAmphoraIcon = fixed.asHook;
export const lucideAmphoraIcon = fixed.prototype;
export default lucideAmphoraIcon;
