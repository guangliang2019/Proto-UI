export * from './types';
export * from './create';

// runtime 用：挂到 run 上的 key（避免污染正常 API）
export const __RUN_TEST_SYS = '__testSys' as const;
