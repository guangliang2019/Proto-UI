const ERR = {
  PHASE: 'ANATOMY_PHASE_VIOLATION',
  CAP: 'ANATOMY_CAP_UNAVAILABLE',
  FAMILY_INVALID: 'ANATOMY_FAMILY_INVALID',
  CLAIM_INVALID: 'ANATOMY_CLAIM_INVALID',
} as const;

export type AnatomyErrorCode = (typeof ERR)[keyof typeof ERR];

export function anatomyError(code: AnatomyErrorCode, message: string): Error {
  const err = new Error(message) as Error & { code?: AnatomyErrorCode };
  (err as any).code = code;
  return err;
}

export { ERR as ANATOMY_ERROR };
