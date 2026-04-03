import { createAnatomyFamily } from '@proto.ui/core';

export const SWITCH_FAMILY = createAnatomyFamily('base-switch', {
  roles: {
    root: { cardinality: { min: 1, max: 1 } },
    thumb: { cardinality: { min: 0, max: 1 } },
  },
  relations: [{ kind: 'contains', parent: 'root', child: 'thumb' }],
});
