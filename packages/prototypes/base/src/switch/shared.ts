import { createAnatomyFamily, type DefHandle } from '@proto.ui/core';
import type { PropsBaseType } from '@proto.ui/types';

export const SWITCH_FAMILY = createAnatomyFamily('base-switch');

export function registerSwitchFamily(def: DefHandle<PropsBaseType, any>): void {
  def.anatomy.family(SWITCH_FAMILY, {
    roles: {
      root: { cardinality: { min: 1, max: 1 } },
      thumb: { cardinality: { min: 0, max: 1 } },
    },
    relations: [{ kind: 'contains', parent: 'root', child: 'thumb' }],
  });
}
