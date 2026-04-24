// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'vault' as const;
export const LUCIDE_VAULT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.circle({ cx: 7.5, cy: 7.5, r: '.5', fill: 'currentColor' }),
  svg.path({ d: 'm7.9 7.9 2.7 2.7' }),
  svg.circle({ cx: 16.5, cy: 7.5, r: '.5', fill: 'currentColor' }),
  svg.path({ d: 'm13.4 10.6 2.7-2.7' }),
  svg.circle({ cx: 7.5, cy: 16.5, r: '.5', fill: 'currentColor' }),
  svg.path({ d: 'm7.9 16.1 2.7-2.7' }),
  svg.circle({ cx: 16.5, cy: 16.5, r: '.5', fill: 'currentColor' }),
  svg.path({ d: 'm13.4 13.4 2.7 2.7' }),
  svg.circle({ cx: 12, cy: 12, r: 2 }),
];

export function renderLucideVaultIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VAULT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-vault-icon',
  prototypeName: 'lucide-vault-icon',
  shapeFactory: LUCIDE_VAULT_SHAPE_FACTORY,
});

export const asLucideVaultIcon = fixed.asHook;
export const lucideVaultIcon = fixed.prototype;
export default lucideVaultIcon;
