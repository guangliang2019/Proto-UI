// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'plug-2' as const;
export const LUCIDE_PLUG_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9 2v6' }),
  svg.path({ d: 'M15 2v6' }),
  svg.path({ d: 'M12 17v5' }),
  svg.path({ d: 'M5 8h14' }),
  svg.path({ d: 'M6 11V8h12v3a6 6 0 1 1-12 0Z' }),
];

export function renderLucidePlug2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PLUG_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-plug-2-icon',
  prototypeName: 'lucide-plug-2-icon',
  shapeFactory: LUCIDE_PLUG_2_SHAPE_FACTORY,
});

export const asLucidePlug2Icon = fixed.asHook;
export const lucidePlug2Icon = fixed.prototype;
export default lucidePlug2Icon;
