// packages/modules/expose-state-web/src/caps.ts
export { HOST_ELEMENT_CAP } from '@proto.ui/core';
import { cap } from '@proto.ui/core';

export type ExposeStateWebNameMap = (semantic: string) => {
  dataAttr: string;
  cssVar: string;
};

export type ExposeStateWebMode = {
  /** allow data-attr for continuous number states */
  allowContinuousAttr?: boolean;
  /** allow css var for enum/string states */
  allowStringVar?: boolean;
};

export const EXPOSE_STATE_WEB_MAP_CAP = cap<ExposeStateWebNameMap>(
  '@proto.ui/expose-state-web/nameMap'
);

export const EXPOSE_STATE_WEB_MODE_CAP = cap<ExposeStateWebMode>('@proto.ui/expose-state-web/mode');
