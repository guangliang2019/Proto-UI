// packages/modules/test-sys/src/caps.ts
import { cap } from "@proto-ui/core";

/**
 * Optional host-provided probe capability.
 * - NOT required by v0 tests.
 * - If provided by host wiring, module-test-sys can verify host caps pipeline.
 */
export type HostProbeCap = {
  debugName?: string;
  ping?: () => string;
  now?: () => number;
};

export const HOST_PROBE_CAP = cap<HostProbeCap>("@proto-ui/test/hostProbe");
