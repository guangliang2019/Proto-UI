import type { CapsVaultView } from '@proto-ui/core';
import { capUnavailable, illegalPhase } from '@proto-ui/core';
import { ModuleBase } from '@proto-ui/modules.base';
import type { EventPort } from '@proto-ui/modules.event';

import {
  AS_TRIGGER_GET_PROTO_CAP,
  AS_TRIGGER_INSTANCE_CAP,
  AS_TRIGGER_PARENT_CAP,
  type AsTriggerParentGetter,
  type AsTriggerPrototypeGetter,
} from './caps';

export class AsTriggerModuleImpl extends ModuleBase {
  private readonly prototypeName: string;
  private readonly eventPort: EventPort;

  constructor(caps: CapsVaultView, prototypeName: string, eventPort: EventPort) {
    super(caps);
    this.prototypeName = prototypeName;
    this.eventPort = eventPort;
  }

  private ensureSetup(op: string) {
    this.sys?.ensureSetup(op);

    if (!this.sys && this.protoPhase !== 'setup') {
      throw illegalPhase(op, this.protoPhase, {
        prototypeName: this.prototypeName,
      });
    }
  }

  private getInstanceToken() {
    if (!this.caps.has(AS_TRIGGER_INSTANCE_CAP)) {
      throw capUnavailable(AS_TRIGGER_INSTANCE_CAP.id, {
        prototypeName: this.prototypeName,
      });
    }
    return this.caps.get(AS_TRIGGER_INSTANCE_CAP);
  }

  private getParentGetter(): AsTriggerParentGetter {
    if (!this.caps.has(AS_TRIGGER_PARENT_CAP)) {
      throw capUnavailable(AS_TRIGGER_PARENT_CAP.id, {
        prototypeName: this.prototypeName,
      });
    }
    return this.caps.get(AS_TRIGGER_PARENT_CAP);
  }

  private getPrototypeGetter(): AsTriggerPrototypeGetter {
    if (!this.caps.has(AS_TRIGGER_GET_PROTO_CAP)) {
      throw capUnavailable(AS_TRIGGER_GET_PROTO_CAP.id, {
        prototypeName: this.prototypeName,
      });
    }
    return this.caps.get(AS_TRIGGER_GET_PROTO_CAP);
  }

  apply(): void {
    this.ensureSetup('asTrigger.apply');

    const self = this.getInstanceToken();
    const getParent = this.getParentGetter();
    const getPrototype = this.getPrototypeGetter();

    let cur = getParent(self);
    let lastTrigger: unknown | null = null;

    while (cur) {
      const curProto = getPrototype(cur);
      if (!curProto) break;

      const trace = (curProto as any).__asHooks as Array<{ name?: string }>;
      const hasTrigger = Array.isArray(trace) ? trace.some((e) => e?.name === 'asTrigger') : false;

      if (!hasTrigger) break;

      lastTrigger = cur;
      cur = getParent(cur);
    }

    if (!lastTrigger) return;

    this.eventPort.redirectRoot(lastTrigger as any as EventTarget);
  }
}
