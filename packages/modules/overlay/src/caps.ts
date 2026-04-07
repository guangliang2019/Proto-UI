import { cap, type OverlayLayerRole } from '@proto.ui/core';

export type OverlayGlobalMount = {
  mount(el: HTMLElement): void;
  unmount(el: HTMLElement): void;
};

export const OVERLAY_GLOBAL_MOUNT_CAP = cap<OverlayGlobalMount>('@proto.ui/overlay/globalMount');

export type OverlayModal = {
  lock(): void;
  unlock(): void;
};

export const OVERLAY_MODAL_CAP = cap<OverlayModal>('@proto.ui/overlay/modal');

export type OverlayLayerRequest = Readonly<{
  role: OverlayLayerRole;
  offset: number;
  modal: boolean;
  portal: boolean;
  meta?: Readonly<Record<string, unknown>>;
}>;

export type OverlayLayerScheduler = {
  attach(target: HTMLElement, request: OverlayLayerRequest): () => void;
};

export const OVERLAY_LAYER_SCHEDULER_CAP = cap<OverlayLayerScheduler>(
  '@proto.ui/overlay/layerScheduler'
);
