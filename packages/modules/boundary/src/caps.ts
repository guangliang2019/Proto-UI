import { cap } from '@proto.ui/core';
import type { BoundaryClassification, BoundaryRegion, BoundarySample } from '@proto.ui/core';

export type BoundaryHostBridge = {
  classify(args: {
    regions: readonly BoundaryRegion[];
    sample?: BoundarySample;
  }): BoundaryClassification;
};

export const BOUNDARY_HOST_BRIDGE_CAP = cap<BoundaryHostBridge>('@proto.ui/boundary/hostBridge');
