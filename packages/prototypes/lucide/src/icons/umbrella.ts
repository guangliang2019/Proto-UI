// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'umbrella' as const;
export const LUCIDE_UMBRELLA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 13v7a2 2 0 0 0 4 0' }),
  svg.path({ d: 'M12 2v2' }),
  svg.path({ d: 'M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z' }),
];

export function renderLucideUmbrellaIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UMBRELLA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-umbrella-icon',
  prototypeName: 'lucide-umbrella-icon',
  shapeFactory: LUCIDE_UMBRELLA_SHAPE_FACTORY,
});

export const asLucideUmbrellaIcon = fixed.asHook;
export const lucideUmbrellaIcon = fixed.prototype;
export default lucideUmbrellaIcon;
