// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clipboard-clock' as const;
export const LUCIDE_CLIPBOARD_CLOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 14v2.2l1.6 1' }),
  svg.path({ d: 'M16 4h2a2 2 0 0 1 2 2v.832' }),
  svg.path({ d: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2' }),
  svg.circle({ cx: 16, cy: 16, r: 6 }),
  svg.rect({ x: 8, y: 2, width: 8, height: 4, rx: 1 }),
];

export function renderLucideClipboardClockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLIPBOARD_CLOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clipboard-clock-icon',
  prototypeName: 'lucide-clipboard-clock-icon',
  shapeFactory: LUCIDE_CLIPBOARD_CLOCK_SHAPE_FACTORY,
});

export const asLucideClipboardClockIcon = fixed.asHook;
export const lucideClipboardClockIcon = fixed.prototype;
export default lucideClipboardClockIcon;
