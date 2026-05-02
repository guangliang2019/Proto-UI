// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panda' as const;
export const LUCIDE_PANDA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11.25 17.25h1.5L12 18z' }),
  svg.path({ d: 'm15 12 2 2' }),
  svg.path({ d: 'M18 6.5a.5.5 0 0 0-.5-.5' }),
  svg.path({
    d: 'M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83',
  }),
  svg.path({ d: 'M6 6.5a.495.495 0 0 1 .5-.5' }),
  svg.path({ d: 'm9 12-2 2' }),
];

export function renderLucidePandaIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANDA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panda-icon',
  prototypeName: 'lucide-panda-icon',
  shapeFactory: LUCIDE_PANDA_SHAPE_FACTORY,
});

export const asLucidePandaIcon = fixed.asHook;
export const lucidePandaIcon = fixed.prototype;
export default lucidePandaIcon;
