// Behavior helpers should stay on public semantic surfaces and avoid depending on
// internal ports, host thread scheduling details, or event propagation semantics.
export { asFocusRoving } from './as-focus-roving';
export type { FocusRovingExposes, FocusRovingOptions } from './as-focus-roving';
