// packages/adapters/web-component/test/contract/context.basic.v0.contract.test.ts
import { describe, it, expect } from "vitest";
import type { Prototype } from "@proto-ui/core";
import { AdaptToWebComponent } from "@proto-ui/adapters.web-component";

const KEY = { __brand: "ContextKey", debugName: "ctx" } as any;

describe("contract: adapter-web-component / context basic (v0)", () => {
  it("context provide/subscribe/update works via WC adapter caps", async () => {
    const log: Array<[number, number]> = [];
    let mounted = false;

    const P: Prototype = {
      name: "x-context-basic-1",
      setup(def) {
        const update = def.context.provide(KEY, { value: 0 });

        def.context.subscribe(KEY, (_run, next, prev) => {
          log.push([prev.value, next.value]);
        });

        def.lifecycle.onMounted((run) => {
          mounted = true;
          run.context.update(KEY, { value: 1 });
          update({ value: 2 });
        });

        return (r) => [r.el("div", "ok")];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement("x-context-basic-1") as any;
    document.body.appendChild(el);

    // mounted callbacks are scheduled; flush microtasks
    await Promise.resolve();
    await Promise.resolve();

    expect(mounted).toBe(true);
    expect(log).toEqual([
      [0, 1],
      [1, 2],
    ]);

    el.remove();
    await Promise.resolve();
  });
});
