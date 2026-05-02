// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wallet-minimal' as const;
export const LUCIDE_WALLET_MINIMAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17 14h.01' }),
  svg.path({ d: 'M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14' }),
];

export function renderLucideWalletMinimalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WALLET_MINIMAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wallet-minimal-icon',
  prototypeName: 'lucide-wallet-minimal-icon',
  shapeFactory: LUCIDE_WALLET_MINIMAL_SHAPE_FACTORY,
});

export const asLucideWalletMinimalIcon = fixed.asHook;
export const lucideWalletMinimalIcon = fixed.prototype;
export default lucideWalletMinimalIcon;
