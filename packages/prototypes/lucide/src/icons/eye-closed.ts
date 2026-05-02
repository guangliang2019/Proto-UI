// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'eye-closed' as const;
export const LUCIDE_EYE_CLOSED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15 18-.722-3.25' }),
  svg.path({ d: 'M2 8a10.645 10.645 0 0 0 20 0' }),
  svg.path({ d: 'm20 15-1.726-2.05' }),
  svg.path({ d: 'm4 15 1.726-2.05' }),
  svg.path({ d: 'm9 18 .722-3.25' }),
];

export function renderLucideEyeClosedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EYE_CLOSED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-eye-closed-icon',
  prototypeName: 'lucide-eye-closed-icon',
  shapeFactory: LUCIDE_EYE_CLOSED_SHAPE_FACTORY,
});

export const asLucideEyeClosedIcon = fixed.asHook;
export const lucideEyeClosedIcon = fixed.prototype;
export default lucideEyeClosedIcon;
