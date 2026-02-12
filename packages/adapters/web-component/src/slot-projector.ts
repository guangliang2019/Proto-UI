// packages/adapters/web-component/src/slot-projector.ts

export class SlotProjector {
  private el: HTMLElement;

  // 每次 commit 都会换新的 WeakSet（不要复用老的，否则没法“清掉”旧 owned 节点）
  owned: WeakSet<Node> = new WeakSet<Node>();

  // 当前被投影进去的节点（外部节点）
  projected: Node[] = [];

  // light slot anchors（空 Text）
  slotStart: Text | null = null;
  slotEnd: Text | null = null;

  private mo: MutationObserver | null = null;
  private suppress = 0;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  disconnect() {
    this.mo?.disconnect();
    this.mo = null;
    this.slotStart = null;
    this.slotEnd = null;
  }

  /** rebuild 前：收集并“保住”外部节点 */
  collectSlotPoolBeforeCommit(): Node[] {
    const pool: Node[] = [];

    // 1) 先把已投影的节点从 DOM 拿出来（否则 replaceChildren 会把它们丢掉）
    for (const n of this.projected) {
      if (n.parentNode) {
        n.parentNode.removeChild(n);
      }
      pool.push(n);
    }

    // 2) 再收集 custom element 的 direct children 中 “非 owned” 的节点（用户 appendChild 到 el）
    for (const n of Array.from(this.el.childNodes)) {
      if (this.owned.has(n)) continue;
      // 注意：这里 n 可能是用户刚 append 的节点，此时还没投影
      pool.push(n);
    }

    // 去重（顺序保留）
    const seen = new Set<Node>();
    return pool.filter((n) => (seen.has(n) ? false : (seen.add(n), true)));
  }

  /** rebuild 后：更新 anchors / owned / projected，并启动 MO */
  afterCommit(args: {
    owned: WeakSet<Node>;
    slotStart?: Text;
    slotEnd?: Text;
    projected: Node[];
    enableMO: boolean;
  }) {
    this.owned = args.owned;
    this.slotStart = args.slotStart ?? null;
    this.slotEnd = args.slotEnd ?? null;
    this.projected = args.projected;

    if (!args.enableMO) {
      this.disconnect();
      return;
    }

    if (!this.mo) {
      this.mo = new MutationObserver((muts) => this.onMutations(muts));
      // subtree 需要 true：用户可能 remove 掉已经在内部 div 的投影节点
      this.mo.observe(this.el, { childList: true, subtree: true });
    }
  }

  private onMutations(muts: MutationRecord[]) {
    if (this.suppress) return;
    if (!this.slotEnd) return;

    // 1) 把 direct children 上新加的“非 owned”节点投影进去
    const toMove: Node[] = [];
    for (const m of muts) {
      if (m.type !== "childList") continue;
      if (m.target !== this.el) continue; // 只处理 direct children 的新增
      for (const n of Array.from(m.addedNodes)) {
        if (this.owned.has(n)) continue;
        toMove.push(n);
      }
    }

    if (toMove.length) {
      this.suppress++;
      try {
        const end = this.slotEnd!;
        const parent = end.parentNode;
        if (!parent) return;

        for (const n of toMove) {
          // n 目前是 el 的 direct child，移走
          if (n.parentNode === this.el) this.el.removeChild(n);

          parent.insertBefore(n, end);
          this.projected.push(n);
        }
      } finally {
        this.suppress--;
      }
    }

    // 2) 清理已被用户移除的投影节点（removeChild 可能发生在 subtree 内）
    if (this.projected.length) {
      this.projected = this.projected.filter((n) => !!n.parentNode);
    }
  }
}
