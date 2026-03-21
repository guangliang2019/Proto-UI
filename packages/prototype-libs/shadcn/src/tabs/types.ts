import type {
  TabsContentAsHookContract,
  TabsContentExposes,
  TabsContentProps,
  TabsListAsHookContract,
  TabsListExposes,
  TabsListProps,
  TabsRootAsHookContract,
  TabsRootExposes,
  TabsRootProps,
  TabsTriggerAsHookContract,
  TabsTriggerExposes,
  TabsTriggerProps,
  TabsTriggerStateHandles,
} from '@prototype-libs/base';

export interface ShadcnTabsRootProps extends TabsRootProps {}
export type ShadcnTabsRootExposes = TabsRootExposes;
export type ShadcnTabsRootAsHookContract = TabsRootAsHookContract;

export interface ShadcnTabsListProps extends TabsListProps {}
export type ShadcnTabsListExposes = TabsListExposes;
export type ShadcnTabsListAsHookContract = TabsListAsHookContract;

export interface ShadcnTabsTriggerProps extends TabsTriggerProps {}
export type ShadcnTabsTriggerExposes = TabsTriggerExposes;
export type ShadcnTabsTriggerStateHandles = TabsTriggerStateHandles;
export type ShadcnTabsTriggerAsHookContract = TabsTriggerAsHookContract;

export interface ShadcnTabsContentProps extends TabsContentProps {}
export type ShadcnTabsContentExposes = TabsContentExposes;
export type ShadcnTabsContentAsHookContract = TabsContentAsHookContract;
