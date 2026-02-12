// packages/modules/props/src/kernel/types.ts
import { PropsBaseType } from "@proto-ui/types";

export type PropsResolveMeta<P extends PropsBaseType> = {
  /** raw 里出现过的 declared keys（包含 empty/invalid） */
  providedKeys: Array<keyof P & string>;

  /** raw 里 provided 但值是 null/undefined（不等于 invalid） */
  emptyKeys: Array<keyof P & string>;

  /** raw 里 provided 且 non-empty，但不满足 spec（kind/enum/range/validator） */
  invalidKeys: Array<keyof P & string>;

  /** resolved 值来自 defaults stack / spec.default / canonical null，而不是 raw 直通 */
  usedFallbackKeys: Array<keyof P & string>;

  /** resolved 值是 null（canonical empty）且原因是 empty:"accept" */
  acceptedEmptyKeys: Array<keyof P & string>;
};
