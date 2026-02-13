import type { CapsVaultView } from '@proto-ui/core';
import { SYS_CAP, type SystemCaps } from '@proto-ui/modules.base';
import type { SysSnapshot, TestSysPort } from './types';

export class TestSysImpl {
  private readonly sys: SystemCaps;
  private readonly prototypeName: string;

  private traceLog: SysSnapshot[] = [];

  constructor(caps: CapsVaultView, prototypeName: string) {
    this.prototypeName = prototypeName;
    this.sys = caps.get(SYS_CAP);
  }

  snapshot(label?: string): SysSnapshot {
    return {
      label,
      t: Date.now(),
      execPhase: String(this.sys.execPhase?.() ?? 'unknown'),
      domain: this.sys.domain(),
      protoPhase: String(this.sys.protoPhase()),
      disposed: this.sys.isDisposed(),
      prototypeName: this.prototypeName,
    };
  }

  trace(label?: string): SysSnapshot {
    const s = this.snapshot(label);
    this.traceLog.push(s);
    return s;
  }

  getTrace(): readonly SysSnapshot[] {
    return this.traceLog;
  }

  clearTrace(): void {
    this.traceLog = [];
  }

  port(): TestSysPort {
    return {
      snapshot: (label) => this.snapshot(label),
      trace: (label) => this.trace(label),
      getTrace: () => this.getTrace(),
      clearTrace: () => this.clearTrace(),
    };
  }
}
