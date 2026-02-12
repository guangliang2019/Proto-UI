import type { ModuleInstance } from "@proto-ui/core";

export type AsTriggerFacade = {
  apply(): void;
};

export type AsTriggerModule = ModuleInstance<AsTriggerFacade> & {
  name: "as-trigger";
  scope: "instance";
};
