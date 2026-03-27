# Contract: adapter-web-component / Lifecycle And Registration (v0)

## Scope

This contract defines two adapter-level behaviors for `@proto.ui/adapters.web-component` v0:

- how mount/unmount reacts to DOM connectivity changes
- how `AdaptToWebComponent(...)` handles custom-element registration

## Lifecycle

### L1. Connected mount

When a custom element instance is connected for the first time:

- runtime setup must become reachable
- `created` must run before `mounted`

### L2. True document removal triggers unmount

When an instance is removed from the document and remains disconnected after the adapter's deferred check:

- `unmounted` must run
- runtime disposal may complete

### L3. Intra-document synchronous move is not unmount

If an instance is synchronously moved within the same document, for example:

- parent A removes it as part of DOM replacement
- parent B inserts it again in the same task / microtask window

then the adapter must treat this as a move, not as a true unmount.

Observable requirements:

- `unmounted` must not run for the transient disconnect
- adapter-owned feedback styles must remain applied
- the instance must remain usable after reconnection

The implementation strategy is not prescribed. The contract only constrains the observable result.

## Registration

### R1. Default behavior is auto-registration

`AdaptToWebComponent(proto)` should register the generated class to `customElements` using the effective tag name.

### R2. Manual registration mode

`AdaptToWebComponent(proto, { register: false })` must:

- return a usable custom element class
- not call `customElements.define(...)`

### R3. Explicit tag override

`registerAs` may provide an explicit effective tag name for either auto-registration or manual-registration flows.

Examples:

```ts
const Ctor = AdaptToWebComponent(proto, {
  register: false,
  registerAs: 'x-manual-demo',
});

customElements.define('x-manual-demo', Ctor);
```

## Related tests

- `packages/adapters/web-component/test/contract/lifecycle-wc-adapter.v0.contract.test.ts`
