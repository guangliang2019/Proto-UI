import type { AnatomyOrderObserver, AnatomyRootTarget } from '@proto.ui/module-anatomy';

function isNodeLike(value: unknown): value is Node {
  return !!value && typeof (value as Node).nodeType === 'number';
}

export const createDomOrderObserver: AnatomyOrderObserver = (
  target: AnatomyRootTarget,
  notify: () => void
) => {
  if (typeof MutationObserver === 'undefined') return () => {};
  if (!isNodeLike(target)) return () => {};

  const observer = new MutationObserver(() => {
    notify();
  });
  observer.observe(target, { childList: true, subtree: true });
  return () => observer.disconnect();
};
