// packages/modules/event/src/error.ts

export class EventError extends Error {
  readonly code: string;
  readonly detail?: any;

  constructor(code: string, message: string, detail?: any) {
    super(message);
    this.name = "EventError";
    this.code = code;
    this.detail = detail;
  }
}

export function eventInvalidArg(message: string, detail?: any) {
  return new EventError("EVENT_INVALID_ARGUMENT", message, detail);
}

export function eventTargetUnavailable(message: string, detail?: any) {
  return new EventError("EVENT_TARGET_UNAVAILABLE", message, detail);
}

export function eventPhaseViolation(message: string, detail?: any) {
  return new EventError("EVENT_PHASE_VIOLATION", message, detail);
}
