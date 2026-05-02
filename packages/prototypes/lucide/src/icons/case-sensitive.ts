// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'case-sensitive' as const;
export const LUCIDE_CASE_SENSITIVE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16' }),
  svg.path({ d: 'M22 9v7' }),
  svg.path({ d: 'M3.304 13h6.392' }),
  svg.circle({ cx: 18.5, cy: 12.5, r: 3.5 }),
];

export function renderLucideCaseSensitiveIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CASE_SENSITIVE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-case-sensitive-icon',
  prototypeName: 'lucide-case-sensitive-icon',
  shapeFactory: LUCIDE_CASE_SENSITIVE_SHAPE_FACTORY,
});

export const asLucideCaseSensitiveIcon = fixed.asHook;
export const lucideCaseSensitiveIcon = fixed.prototype;
export default lucideCaseSensitiveIcon;
