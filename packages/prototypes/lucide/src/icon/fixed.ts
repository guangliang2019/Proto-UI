import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import type { LucideShapeFactory, LucideVisualProps } from './contracts';
import { renderLucideShape } from './render';

export interface LucideFixedIconProps extends LucideVisualProps {}
export type LucideFixedIconExposes = {};
export type LucideFixedIconAsHookContract = {};

const DEFAULT_ICON_SIZE = 24;
const DEFAULT_STROKE_WIDTH = 2;
const DEFAULT_STROKE = 'currentColor';
const DEFAULT_FILL = 'none';

function setupFixedIcon(def: DefHandle<LucideFixedIconProps, LucideFixedIconExposes>): void {
  def.props.define({
    size: { type: 'number', empty: 'fallback' },
    strokeWidth: { type: 'number', empty: 'fallback' },
    stroke: { type: 'string', empty: 'fallback' },
    fill: { type: 'string', empty: 'fallback' },
  });

  def.props.setDefaults({
    size: DEFAULT_ICON_SIZE,
    strokeWidth: DEFAULT_STROKE_WIDTH,
    stroke: DEFAULT_STROKE,
    fill: DEFAULT_FILL,
  });
}

function normalizeProps(props: Partial<LucideFixedIconProps>) {
  return {
    size: typeof props.size === 'number' ? props.size : DEFAULT_ICON_SIZE,
    strokeWidth: typeof props.strokeWidth === 'number' ? props.strokeWidth : DEFAULT_STROKE_WIDTH,
    stroke: typeof props.stroke === 'string' ? props.stroke : DEFAULT_STROKE,
    fill: typeof props.fill === 'string' ? props.fill : DEFAULT_FILL,
  };
}

export function createLucideFixedIcon(options: {
  asHookName: string;
  prototypeName: string;
  shapeFactory: LucideShapeFactory;
}) {
  const asHook = defineAsHook<
    LucideFixedIconProps,
    LucideFixedIconExposes,
    LucideFixedIconAsHookContract
  >({
    name: options.asHookName,
    mode: 'once',
    setup: setupFixedIcon,
  });

  const prototype = definePrototype<LucideFixedIconProps, LucideFixedIconExposes>({
    name: options.prototypeName,
    setup(def) {
      setupFixedIcon(def);
      return (renderer) => {
        const props = normalizeProps(renderer.read.props.get());
        return renderLucideShape(renderer, options.shapeFactory, props);
      };
    },
  });

  return { asHook, prototype };
}
