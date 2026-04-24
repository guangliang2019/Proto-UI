// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'signature' as const;
export const LUCIDE_SIGNATURE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284',
  }),
  svg.path({ d: 'M3 21h18' }),
];

export function renderLucideSignatureIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SIGNATURE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-signature-icon',
  prototypeName: 'lucide-signature-icon',
  shapeFactory: LUCIDE_SIGNATURE_SHAPE_FACTORY,
});

export const asLucideSignatureIcon = fixed.asHook;
export const lucideSignatureIcon = fixed.prototype;
export default lucideSignatureIcon;
