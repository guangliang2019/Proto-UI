// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'transgender' as const;
export const LUCIDE_TRANSGENDER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 16v6' }),
  svg.path({ d: 'M14 20h-4' }),
  svg.path({ d: 'M18 2h4v4' }),
  svg.path({ d: 'm2 2 7.17 7.17' }),
  svg.path({ d: 'M2 5.355V2h3.357' }),
  svg.path({ d: 'm22 2-7.17 7.17' }),
  svg.path({ d: 'M8 5 5 8' }),
  svg.circle({ cx: 12, cy: 12, r: 4 }),
];

export function renderLucideTransgenderIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRANSGENDER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-transgender-icon',
  prototypeName: 'lucide-transgender-icon',
  shapeFactory: LUCIDE_TRANSGENDER_SHAPE_FACTORY,
});

export const asLucideTransgenderIcon = fixed.asHook;
export const lucideTransgenderIcon = fixed.prototype;
export default lucideTransgenderIcon;
