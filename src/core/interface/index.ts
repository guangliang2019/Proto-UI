import { Prototype } from './prototype';

export * from './component';
export * from './managers';
export * from './prototype';
export * from './renderer';
export * from './props';

export type Adapter<Component> = (
  prototype: Prototype
) => Component;
