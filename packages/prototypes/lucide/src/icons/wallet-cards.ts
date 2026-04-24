// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wallet-cards' as const;
export const LUCIDE_WALLET_CARDS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2' }),
  svg.path({
    d: 'M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21',
  }),
];

export function renderLucideWalletCardsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WALLET_CARDS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wallet-cards-icon',
  prototypeName: 'lucide-wallet-cards-icon',
  shapeFactory: LUCIDE_WALLET_CARDS_SHAPE_FACTORY,
});

export const asLucideWalletCardsIcon = fixed.asHook;
export const lucideWalletCardsIcon = fixed.prototype;
export default lucideWalletCardsIcon;
