// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'webhook' as const;
export const LUCIDE_WEBHOOK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2' }),
  svg.path({ d: 'm6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06' }),
  svg.path({ d: 'm12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8' }),
];

export function renderLucideWebhookIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WEBHOOK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-webhook-icon',
  prototypeName: 'lucide-webhook-icon',
  shapeFactory: LUCIDE_WEBHOOK_SHAPE_FACTORY,
});

export const asLucideWebhookIcon = fixed.asHook;
export const lucideWebhookIcon = fixed.prototype;
export default lucideWebhookIcon;
