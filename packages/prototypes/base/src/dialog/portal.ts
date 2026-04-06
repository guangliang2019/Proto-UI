// 将 host 元素立即移动到 document.body，避免被 overflow:hidden 祖先裁剪
// 在 onMounted 时移动，在 onUnmounted 时恢复到原来的位置
// 通过覆盖 parentNode getter 保留原始 DOM 层级，使 context/anatomy 的 getProtoParent 继续工作

function isBrowserEnvironment() {
  if (typeof document === 'undefined') return false;
  // 在 happy-dom 等测试环境中跳过 portal，避免 connected/disconnected 循环污染测试
  const win = document.defaultView as any;
  if (win?.happyDOM) return false;
  return true;
}

export function createBodyPortal() {
  let hostEl: HTMLElement | null = null;
  let originalParentNode: Node | null = null;
  let originalNextSibling: Node | null = null;
  let moved = false;

  const moveToBody = (el: HTMLElement) => {
    if (!isBrowserEnvironment()) return;
    if (moved) return;

    originalParentNode = el.parentNode;
    originalNextSibling = el.nextSibling;

    // 保存原始 parentNode，让 getProtoParent 仍能正确遍历到 context provider
    try {
      Object.defineProperty(el, 'parentNode', {
        get() {
          return originalParentNode;
        },
        configurable: true,
      });
    } catch {
      // 如果无法覆盖（如某些旧环境），则静默回退
    }

    document.body.appendChild(el);
    moved = true;
  };

  const restore = () => {
    if (!isBrowserEnvironment()) return;
    if (!moved || !hostEl) return;

    try {
      delete (hostEl as any).parentNode;
    } catch {
      // ignore
    }

    if (originalParentNode) {
      originalParentNode.insertBefore(hostEl, originalNextSibling);
    }

    moved = false;
    hostEl = null;
  };

  return {
    mount(el: HTMLElement) {
      hostEl = el;
      moveToBody(el);
    },
    unmount() {
      restore();
    },
  };
}
