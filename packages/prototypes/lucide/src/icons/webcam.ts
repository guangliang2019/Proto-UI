// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'webcam' as const;
export const LUCIDE_WEBCAM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 10, r: 8 }),
  svg.circle({ cx: 12, cy: 10, r: 3 }),
  svg.path({ d: 'M7 22h10' }),
  svg.path({ d: 'M12 22v-4' }),
];

export function renderLucideWebcamIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WEBCAM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-webcam-icon',
  prototypeName: 'lucide-webcam-icon',
  shapeFactory: LUCIDE_WEBCAM_SHAPE_FACTORY,
});

export const asLucideWebcamIcon = fixed.asHook;
export const lucideWebcamIcon = fixed.prototype;
export default lucideWebcamIcon;
