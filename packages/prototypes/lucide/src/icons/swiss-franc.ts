// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'swiss-franc' as const;
export const LUCIDE_SWISS_FRANC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 21V3h8' }),
  svg.path({ d: 'M6 16h9' }),
  svg.path({ d: 'M10 9.5h7' }),
];

export function renderLucideSwissFrancIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SWISS_FRANC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-swiss-franc-icon',
  prototypeName: 'lucide-swiss-franc-icon',
  shapeFactory: LUCIDE_SWISS_FRANC_SHAPE_FACTORY,
});

export const asLucideSwissFrancIcon = fixed.asHook;
export const lucideSwissFrancIcon = fixed.prototype;
export default lucideSwissFrancIcon;
