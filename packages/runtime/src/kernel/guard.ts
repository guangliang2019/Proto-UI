// packages/runtime/src/kernel/guard.ts

export function illegalPhase(
  op: string,
  prototypeName: string,
  phase: string,
  hint?: string
): never {
  const msg =
    `[ProtoUI] illegal call: ${op}\n` +
    `prototype: ${prototypeName}\n` +
    `phase: ${phase}\n` +
    (hint ? `hint: ${hint}\n` : "");
  throw new Error(msg);
}
