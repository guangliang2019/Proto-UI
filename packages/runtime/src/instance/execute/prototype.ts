import { Prototype } from '@proto-ui/core';
import { PropsBaseType } from '@proto-ui/types';
import { ExecuteOptions, ExecuteResult } from './types';
import { createRuntimeInstance } from '../instance';

/**
 * Pure in-memory executor (used by internal specimens).
 * Does not commit to any host.
 */
export function executePrototype<P extends PropsBaseType>(
  proto: Prototype<P>,
  opt: ExecuteOptions = {}
): ExecuteResult<P> {
  const inst = createRuntimeInstance(proto, {
    allowRunUpdate: false,
  });

  const children = inst.renderOnce();

  return {
    children,
    lifecycle: inst.kernel.lifecycle,
    invoke: (kind) => inst.runLifecycle(kind),
  };
}
