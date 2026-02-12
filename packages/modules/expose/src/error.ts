// packages/modules/expose/src/error.ts

export class ExposeError extends Error {
  readonly code: string;
  readonly detail?: any;

  constructor(code: string, message: string, detail?: any) {
    super(message);
    this.name = "ExposeError";
    this.code = code;
    this.detail = detail;
  }
}

export function exposeInvalidKey(message: string, detail?: any) {
  return new ExposeError("EXPOSE_INVALID_KEY", message, detail);
}

export function exposeDuplicateKey(message: string, detail?: any) {
  return new ExposeError("EXPOSE_DUPLICATE_KEY", message, detail);
}

export function exposeDisposed(message: string, detail?: any) {
  return new ExposeError("EXPOSE_DISPOSED", message, detail);
}

export function exposePhaseViolation(message: string, detail?: any) {
  return new ExposeError("EXPOSE_PHASE_VIOLATION", message, detail);
}
