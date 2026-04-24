// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-fading-arrow-up' as const;
export const LUCIDE_CIRCLE_FADING_ARROW_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2a10 10 0 0 1 7.38 16.75' }),
  svg.path({ d: 'm16 12-4-4-4 4' }),
  svg.path({ d: 'M12 16V8' }),
  svg.path({ d: 'M2.5 8.875a10 10 0 0 0-.5 3' }),
  svg.path({ d: 'M2.83 16a10 10 0 0 0 2.43 3.4' }),
  svg.path({ d: 'M4.636 5.235a10 10 0 0 1 .891-.857' }),
  svg.path({ d: 'M8.644 21.42a10 10 0 0 0 7.631-.38' }),
];

export function renderLucideCircleFadingArrowUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_FADING_ARROW_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-fading-arrow-up-icon',
  prototypeName: 'lucide-circle-fading-arrow-up-icon',
  shapeFactory: LUCIDE_CIRCLE_FADING_ARROW_UP_SHAPE_FACTORY,
});

export const asLucideCircleFadingArrowUpIcon = fixed.asHook;
export const lucideCircleFadingArrowUpIcon = fixed.prototype;
export default lucideCircleFadingArrowUpIcon;
