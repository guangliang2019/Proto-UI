// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bitcoin' as const;
export const LUCIDE_BITCOIN_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727',
  });

export function renderLucideBitcoinIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BITCOIN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bitcoin-icon',
  prototypeName: 'lucide-bitcoin-icon',
  shapeFactory: LUCIDE_BITCOIN_SHAPE_FACTORY,
});

export const asLucideBitcoinIcon = fixed.asHook;
export const lucideBitcoinIcon = fixed.prototype;
export default lucideBitcoinIcon;
