// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'webhook-off' as const;
export const LUCIDE_WEBHOOK_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15' }),
  svg.path({ d: 'M9 3.4a4 4 0 0 1 6.52.66' }),
  svg.path({ d: 'm6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05' }),
  svg.path({ d: 'M20.3 20.3a4 4 0 0 1-2.3.7' }),
  svg.path({ d: 'M18.6 13a4 4 0 0 1 3.357 3.414' }),
  svg.path({ d: 'm12 6 .6 1' }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucideWebhookOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WEBHOOK_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-webhook-off-icon',
  prototypeName: 'lucide-webhook-off-icon',
  shapeFactory: LUCIDE_WEBHOOK_OFF_SHAPE_FACTORY,
});

export const asLucideWebhookOffIcon = fixed.asHook;
export const lucideWebhookOffIcon = fixed.prototype;
export default lucideWebhookOffIcon;
