import tabsContent from './content';
import tabsList from './list';
import tabsRoot from './root';
import tabsTrigger from './trigger';

export type {
  ShadcnTabsRootProps,
  ShadcnTabsRootExposes,
  ShadcnTabsRootAsHookContract,
  ShadcnTabsListProps,
  ShadcnTabsListExposes,
  ShadcnTabsListAsHookContract,
  ShadcnTabsTriggerProps,
  ShadcnTabsTriggerExposes,
  ShadcnTabsTriggerStateHandles,
  ShadcnTabsTriggerAsHookContract,
  ShadcnTabsContentProps,
  ShadcnTabsContentExposes,
  ShadcnTabsContentAsHookContract,
} from './types';

export { tabsRoot, tabsList, tabsTrigger, tabsContent };
export { default as shadcnTabsRoot } from './root';
export { default as shadcnTabsList } from './list';
export { default as shadcnTabsTrigger } from './trigger';
export { default as shadcnTabsContent } from './content';
