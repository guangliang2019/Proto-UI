// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'asterisk' as const;
export const LUCIDE_ASTERISK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6v12' }),
  svg.path({ d: 'M17.196 9 6.804 15' }),
  svg.path({ d: 'm6.804 9 10.392 6' }),
];

export function renderLucideAsteriskIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ASTERISK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-asterisk-icon',
  prototypeName: 'lucide-asterisk-icon',
  shapeFactory: LUCIDE_ASTERISK_SHAPE_FACTORY,
});

export const asLucideAsteriskIcon = fixed.asHook;
export const lucideAsteriskIcon = fixed.prototype;
export default lucideAsteriskIcon;
