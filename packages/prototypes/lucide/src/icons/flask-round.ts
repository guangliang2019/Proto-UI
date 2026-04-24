// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flask-round' as const;
export const LUCIDE_FLASK_ROUND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 2v6.292a7 7 0 1 0 4 0V2' }),
  svg.path({ d: 'M5 15h14' }),
  svg.path({ d: 'M8.5 2h7' }),
];

export function renderLucideFlaskRoundIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLASK_ROUND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flask-round-icon',
  prototypeName: 'lucide-flask-round-icon',
  shapeFactory: LUCIDE_FLASK_ROUND_SHAPE_FACTORY,
});

export const asLucideFlaskRoundIcon = fixed.asHook;
export const lucideFlaskRoundIcon = fixed.prototype;
export default lucideFlaskRoundIcon;
