import type { ModuleInstance } from "@proto-ui/core";

export type SysSnapshot = {
  label?: string;
  t: number;

  execPhase: string; // "setup" | "render" | "callback" | "unknown" ...
  domain: "setup" | "runtime";
  protoPhase: string; // "setup" | "created" | "mounted" | "updated" | "unmounted"
  disposed: boolean;

  // helpful identity
  prototypeName: string;
};

export type TestSysPort = {
  snapshot(label?: string): SysSnapshot;
  trace(label?: string): SysSnapshot;
  getTrace(): readonly SysSnapshot[];
  clearTrace(): void;
};

export type TestSysFacade = {
  // (可选) 暴露少量 facade，不强依赖
};

export type TestSysModule = ModuleInstance<TestSysFacade> & {
  name: "test-sys";
  scope: "instance";
};
