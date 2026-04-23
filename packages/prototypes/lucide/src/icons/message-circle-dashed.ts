// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'message-circle-dashed' as const;
export const LUCIDE_MESSAGE_CIRCLE_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.1 2.182a10 10 0 0 1 3.8 0' }),
  svg.path({ d: 'M13.9 21.818a10 10 0 0 1-3.8 0' }),
  svg.path({ d: 'M17.609 3.72a10 10 0 0 1 2.69 2.7' }),
  svg.path({ d: 'M2.182 13.9a10 10 0 0 1 0-3.8' }),
  svg.path({ d: 'M20.28 17.61a10 10 0 0 1-2.7 2.69' }),
  svg.path({ d: 'M21.818 10.1a10 10 0 0 1 0 3.8' }),
  svg.path({ d: 'M3.721 6.391a10 10 0 0 1 2.7-2.69' }),
  svg.path({ d: 'm6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98' }),
];

export function renderLucideMessageCircleDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MESSAGE_CIRCLE_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-message-circle-dashed-icon',
  prototypeName: 'lucide-message-circle-dashed-icon',
  shapeFactory: LUCIDE_MESSAGE_CIRCLE_DASHED_SHAPE_FACTORY,
});

export const asLucideMessageCircleDashedIcon = fixed.asHook;
export const lucideMessageCircleDashedIcon = fixed.prototype;
export default lucideMessageCircleDashedIcon;
