// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'voicemail' as const;
export const LUCIDE_VOICEMAIL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 6, cy: 12, r: 4 }),
  svg.circle({ cx: 18, cy: 12, r: 4 }),
  svg.line({ x1: 6, x2: 18, y1: 16, y2: 16 }),
];

export function renderLucideVoicemailIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VOICEMAIL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-voicemail-icon',
  prototypeName: 'lucide-voicemail-icon',
  shapeFactory: LUCIDE_VOICEMAIL_SHAPE_FACTORY,
});

export const asLucideVoicemailIcon = fixed.asHook;
export const lucideVoicemailIcon = fixed.prototype;
export default lucideVoicemailIcon;
