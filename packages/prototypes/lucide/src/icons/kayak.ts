// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'kayak' as const;
export const LUCIDE_KAYAK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z' }),
  svg.path({
    d: 'M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61',
  }),
  svg.path({ d: 'm6.707 6.707 10.586 10.586' }),
  svg.path({ d: 'M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z' }),
];

export function renderLucideKayakIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_KAYAK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-kayak-icon',
  prototypeName: 'lucide-kayak-icon',
  shapeFactory: LUCIDE_KAYAK_SHAPE_FACTORY,
});

export const asLucideKayakIcon = fixed.asHook;
export const lucideKayakIcon = fixed.prototype;
export default lucideKayakIcon;
