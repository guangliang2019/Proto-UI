// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wallet' as const;
export const LUCIDE_WALLET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1',
  }),
  svg.path({ d: 'M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4' }),
];

export function renderLucideWalletIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WALLET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wallet-icon',
  prototypeName: 'lucide-wallet-icon',
  shapeFactory: LUCIDE_WALLET_SHAPE_FACTORY,
});

export const asLucideWalletIcon = fixed.asHook;
export const lucideWalletIcon = fixed.prototype;
export default lucideWalletIcon;
