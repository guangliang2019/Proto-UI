// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'replace' as const;
export const LUCIDE_REPLACE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 4a1 1 0 0 1 1-1' }),
  svg.path({ d: 'M15 10a1 1 0 0 1-1-1' }),
  svg.path({ d: 'M21 4a1 1 0 0 0-1-1' }),
  svg.path({ d: 'M21 9a1 1 0 0 1-1 1' }),
  svg.path({ d: 'm3 7 3 3 3-3' }),
  svg.path({ d: 'M6 10V5a2 2 0 0 1 2-2h2' }),
  svg.rect({ x: 3, y: 14, width: 7, height: 7, rx: 1 }),
];

export function renderLucideReplaceIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REPLACE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-replace-icon',
  prototypeName: 'lucide-replace-icon',
  shapeFactory: LUCIDE_REPLACE_SHAPE_FACTORY,
});

export const asLucideReplaceIcon = fixed.asHook;
export const lucideReplaceIcon = fixed.prototype;
export default lucideReplaceIcon;
