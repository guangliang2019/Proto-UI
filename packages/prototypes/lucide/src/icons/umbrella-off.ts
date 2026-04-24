// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'umbrella-off' as const;
export const LUCIDE_UMBRELLA_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 13v7a2 2 0 0 0 4 0' }),
  svg.path({ d: 'M12 2v2' }),
  svg.path({ d: 'M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10' }),
];

export function renderLucideUmbrellaOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UMBRELLA_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-umbrella-off-icon',
  prototypeName: 'lucide-umbrella-off-icon',
  shapeFactory: LUCIDE_UMBRELLA_OFF_SHAPE_FACTORY,
});

export const asLucideUmbrellaOffIcon = fixed.asHook;
export const lucideUmbrellaOffIcon = fixed.prototype;
export default lucideUmbrellaOffIcon;
