// packages/runtime/src/instance/execute/with-host.ts
import { Prototype, RunHandle } from '@proto-ui/core';
import { PropsBaseType } from '@proto-ui/types';
import { RuntimeHost } from '../host';
import { ExecuteWithHostResult, RuntimeController } from './types';
import { createTimeline } from '../../kernel/timeline';
import type { PropsFacade, PropsPort } from '@proto-ui/modules.props';
import type { RulePort } from '@proto-ui/modules.rule';
import { EventPort } from '@proto-ui/modules.event';
import { __RT_EVENT_CALLBACKS } from '../../kernel/event';
import { createRuntimeInstance } from '../instance';

export function executeWithHost<P extends PropsBaseType>(
  proto: Prototype<P>,
  host: RuntimeHost<P>
): ExecuteWithHostResult {
  const timeline = createTimeline();

  const inst = createRuntimeInstance(proto, {
    allowRunUpdate: true,
    onModulesReady: (hub) => {
      host.onRuntimeReady?.(hub.getWiring());
    },
  });
  inst.setTimeline(timeline);

  const { kernel, moduleHub, callbackScope } = inst;
  const { lifecycle, run } = kernel;

  const facades = moduleHub.getFacades();
  const propsFacade = facades['props'] as PropsFacade<P>;
  const rulePort = moduleHub.getPort<RulePort<P>>('rule');

  const propsPort = moduleHub.getPort<PropsPort<P>>('props');
  if (!propsPort) {
    throw new Error('props port not found');
  }

  // initial props hydration (before any callbacks + before initial render)
  propsPort.applyRaw({ ...(host.getRawProps?.() ?? {}) });
  timeline.mark('host:ready');

  const doRenderCommit = (kind: 'initial' | 'update') => {
    // pull latest raw before rendering
    propsPort.syncFromHost();

    const children = inst.renderOnce();

    timeline.mark('commit:begin');

    let commitDone = false;
    const afterCommit = () => {
      if (commitDone) return;
      commitDone = true;

      timeline.mark('commit:done');

      timeline.mark('instance:reachable');

      // bind event dispatch
      const eventPort = moduleHub.getPort<EventPort>('event');
      const eventRegistry = (moduleHub as any)[__RT_EVENT_CALLBACKS] as
        | { dispatch: (run: RunHandle<P>, id: string, ev: any) => void }
        | undefined;

      if (eventPort?.bind && eventRegistry) {
        const dispatch = (id: string, ev: any) => {
          callbackScope.run(run, () => {
            eventRegistry.dispatch(run, id, ev);
          });
        };
        eventPort.bind(dispatch);
      }

      moduleHub.afterRenderCommit();
      timeline.mark('afterRenderCommit');

      if (kind === 'update') {
        moduleHub.setProtoPhase('updated');
        // updated callbacks
        callbackScope.run(run, () => {
          for (const cb of lifecycle.updated) cb(run);
        });
      }
    };

    host.commit(children, { done: afterCommit });
    afterCommit();

    return children;
  };

  let controller!: RuntimeController;

  const evaluateRuleStyle = () => {
    propsPort.syncFromHost();
    const current = propsFacade.get();
    if (!rulePort) return [];
    const res = rulePort.evaluate({ props: current });
    if (res.kind === 'plan' && res.plan.kind === 'style.tokens') {
      const tokens = res.plan.tokens;
      return tokens;
    }
    return [];
  };

  controller = {
    applyRawProps(nextRaw) {
      // must trigger watches but must NOT render/commit
      propsPort.applyRaw({ ...(nextRaw ?? {}) });
      callbackScope.runNoSync(run, () => {});
    },
    update() {
      doRenderCommit('update');
    },
    getRuleStyleTokens() {
      return evaluateRuleStyle();
    },
  };

  (run as any).update = () => controller.update();

  // created callbacks: once, before first commit
  callbackScope.run(run, () => {
    for (const cb of lifecycle.created) cb(run);
  });

  // initial commit
  const children = doRenderCommit('initial');

  moduleHub.setProtoPhase('mounted');
  timeline.mark('proto:mounted');

  let ended = false;

  host.schedule(() => {
    if (ended) return;
    timeline.mark('mounted:callbacks');

    callbackScope.run(run, () => {
      for (const cb of lifecycle.mounted) cb(run);
    });
  });

  const invokeUnmounted = () => {
    if (ended) return;
    ended = true;

    timeline.mark('unmount:begin');
    host.onUnmountBegin?.();

    const eventPort = moduleHub.getPort<EventPort>('event');
    eventPort?.unbind?.();
    const eventRegistry = (moduleHub as any)[__RT_EVENT_CALLBACKS] as
      | { clear: () => void }
      | undefined;
    eventRegistry?.clear?.();

    callbackScope.run(run, () => {
      for (const cb of lifecycle.unmounted) cb(run);
    });
    timeline.mark('unmounted:callbacks');

    moduleHub.setProtoPhase('unmounted');
    inst.dispose();
    timeline.mark('dispose:done');
  };

  return { children, controller, invokeUnmounted, caps: moduleHub };
}
