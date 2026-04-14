import type {
  BoundaryClassification,
  BoundaryConfig,
  BoundaryConfigPatch,
  BoundaryHandle,
  BoundaryOutsideEvent,
  BoundaryRegion,
  BoundaryRegionOptions,
  BoundarySample,
  ModuleInstance,
  ModulePort,
} from '@proto.ui/core';
import type { PropsBaseType } from '@proto.ui/types';

export type { BoundaryHostBridge } from './caps';

export type BoundaryFacade = {
  getBoundary<P extends PropsBaseType = PropsBaseType>(): BoundaryHandle<P>;
};

export type BoundaryPort = ModulePort & {
  configure(patch: BoundaryConfigPatch): void;
  setStackActive(active: boolean): void;
  registerRegion(target: unknown, options?: BoundaryRegionOptions): () => void;
  unregisterRegion(target: unknown): void;
  classify(sample?: BoundarySample): BoundaryClassification;
  notify(sample?: BoundarySample): BoundaryClassification;
  subscribeOutside(cb: (event: BoundaryOutsideEvent) => void): () => void;
  getConfig(): BoundaryConfig;
  getWarnings(): readonly string[];
  getRegions(): readonly BoundaryRegion[];
};

export type BoundaryModule = ModuleInstance<BoundaryFacade> & {
  name: 'boundary';
  scope: 'instance';
  port: BoundaryPort;
};
