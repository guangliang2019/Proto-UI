import { LUCIDE_ICON_REGISTRY, type LucideIconName } from './icons';
import type {
  LucideShapeFactory,
  LucideVisualProps,
  SvgRenderResult,
  SvgRendererHandle,
} from './contracts';

export interface RenderLucideShapeOptions extends LucideVisualProps {}

export interface RenderLucideIconOptions extends RenderLucideShapeOptions {
  name: LucideIconName;
}

function normalizePositiveNumber(value: unknown, fallback: number): number {
  if (typeof value !== 'number') return fallback;
  if (!Number.isFinite(value)) return fallback;
  if (value <= 0) return fallback;
  return value;
}

function resolveVisualOptions(options: RenderLucideShapeOptions) {
  return {
    size: normalizePositiveNumber(options.size, 24),
    strokeWidth: normalizePositiveNumber(options.strokeWidth, 2),
    stroke: options.stroke ?? 'currentColor',
    fill: options.fill ?? 'none',
  };
}

export function renderLucideShape(
  renderer: SvgRendererHandle,
  shapeFactory: LucideShapeFactory,
  options: RenderLucideShapeOptions = {}
): SvgRenderResult {
  const visual = resolveVisualOptions(options);

  return renderer.svg.root(
    {
      viewBox: '0 0 24 24',
      width: visual.size,
      height: visual.size,
      fill: visual.fill,
      stroke: visual.stroke,
      strokeWidth: visual.strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    shapeFactory(renderer.svg)
  );
}

export function renderLucideIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideIconOptions
): SvgRenderResult {
  const shapeFactory = LUCIDE_ICON_REGISTRY[options.name];
  return renderLucideShape(renderer, shapeFactory, options);
}
