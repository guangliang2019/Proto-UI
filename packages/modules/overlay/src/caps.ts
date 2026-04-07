import { cap } from '@proto.ui/core';

export type OverlayGlobalMount = {
  mount(el: HTMLElement): void;
  unmount(): void;
};

export const OVERLAY_GLOBAL_MOUNT_CAP = cap<OverlayGlobalMount>('@proto.ui/overlay/globalMount');

export type OverlayModal = {
  lock(): void;
  unlock(): void;
};

export const OVERLAY_MODAL_CAP = cap<OverlayModal>('@proto.ui/overlay/modal');
