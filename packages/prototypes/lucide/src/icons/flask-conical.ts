// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flask-conical' as const;
export const LUCIDE_FLASK_CONICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2',
  }),
  svg.path({ d: 'M6.453 15h11.094' }),
  svg.path({ d: 'M8.5 2h7' }),
];

export function renderLucideFlaskConicalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLASK_CONICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flask-conical-icon',
  prototypeName: 'lucide-flask-conical-icon',
  shapeFactory: LUCIDE_FLASK_CONICAL_SHAPE_FACTORY,
});

export const asLucideFlaskConicalIcon = fixed.asHook;
export const lucideFlaskConicalIcon = fixed.prototype;
export default lucideFlaskConicalIcon;
