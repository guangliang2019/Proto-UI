// packages/modules/props/src/caps.ts
import { cap } from "@proto-ui/core";
import type { PropsBaseType } from "@proto-ui/types";
import type { RawPropsSource } from "./types";

/**
 * Host-provided raw props source for props module.
 * Namespaced id is required.
 */
export const RAW_PROPS_SOURCE_CAP = cap<RawPropsSource<PropsBaseType>>(
  "@proto-ui/props/rawPropsSource"
);
