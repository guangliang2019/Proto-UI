export type ProtoUiErrorCode = 'E_ILLEGAL_PHASE' | 'E_CAP_UNAVAILABLE';

export class ProtoUiError extends Error {
  readonly code: ProtoUiErrorCode;
  readonly details?: Record<string, unknown>;

  constructor(code: ProtoUiErrorCode, message: string, details?: Record<string, unknown>) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

export function capUnavailable(cap: string, details?: Record<string, unknown>): ProtoUiError {
  return new ProtoUiError('E_CAP_UNAVAILABLE', `[Caps] capability unavailable: ${cap}`, details);
}

export function illegalPhase(
  op: string,
  phase: string,
  details?: Record<string, unknown>
): ProtoUiError {
  return new ProtoUiError('E_ILLEGAL_PHASE', `[Phase] illegal phase for ${op}: ${phase}`, details);
}
