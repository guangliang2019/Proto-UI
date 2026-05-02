import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { LUCIDE_ICON_NAMES, type LucideIconName } from './icons';
import { renderLucideIcon } from './render';
import type { LucideIconAsHookContract, LucideIconExposes, LucideIconProps } from './types';

const DEFAULT_ICON_NAME: LucideIconName = 'circle';
const DEFAULT_ICON_SIZE = 24;
const DEFAULT_STROKE_WIDTH = 2;
const DEFAULT_STROKE = 'currentColor';
const DEFAULT_FILL = 'none';

function setupLucideIcon(def: DefHandle<LucideIconProps, LucideIconExposes>): void {
  def.props.define({
    name: { type: 'string', empty: 'fallback', enum: [...LUCIDE_ICON_NAMES] },
    size: { type: 'number', empty: 'fallback' },
    strokeWidth: { type: 'number', empty: 'fallback' },
    stroke: { type: 'string', empty: 'fallback' },
    fill: { type: 'string', empty: 'fallback' },
  });

  def.props.setDefaults({
    name: DEFAULT_ICON_NAME,
    size: DEFAULT_ICON_SIZE,
    strokeWidth: DEFAULT_STROKE_WIDTH,
    stroke: DEFAULT_STROKE,
    fill: DEFAULT_FILL,
  });
}

export const asLucideIcon = defineAsHook<
  LucideIconProps,
  LucideIconExposes,
  LucideIconAsHookContract
>({
  name: 'as-lucide-icon',
  mode: 'once',
  setup: setupLucideIcon,
});

const lucideIcon = definePrototype<LucideIconProps, LucideIconExposes>({
  name: 'lucide-icon',
  setup(def) {
    setupLucideIcon(def);
    return (renderer) => {
      const props = renderer.read.props.get();
      return renderLucideIcon(renderer, {
        name: (props.name ?? DEFAULT_ICON_NAME) as LucideIconName,
        size: typeof props.size === 'number' ? props.size : DEFAULT_ICON_SIZE,
        strokeWidth:
          typeof props.strokeWidth === 'number' ? props.strokeWidth : DEFAULT_STROKE_WIDTH,
        stroke: typeof props.stroke === 'string' ? props.stroke : DEFAULT_STROKE,
        fill: typeof props.fill === 'string' ? props.fill : DEFAULT_FILL,
      });
    };
  },
});

export default lucideIcon;
