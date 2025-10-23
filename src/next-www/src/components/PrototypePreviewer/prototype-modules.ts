// src/components/PrototypePreviewer/prototype-modules.ts
// 原型模块映射表 - 按需动态导入

export type PrototypeModuleLoader = () => Promise<any>;

/**
 * 原型模块注册表
 * key: prototypeId
 * value: 动态导入函数
 */
export const prototypeModules: Record<string, PrototypeModuleLoader> = {
  // 示例：'demo-inline' 原型
  'demo-inline': () => import('../../content/docs/zh-cn/demo-inline'),
  
  // 后续添加更多原型时，在这里注册：
  // 'button-demo': () => import('../../content/docs/zh-cn/components/button-demo'),
  // 'form-demo': () => import('../../content/docs/zh-cn/examples/form-demo'),
};

/**
 * 动态加载并注册原型
 * @param prototypeId 原型 ID
 * @returns 加载成功返回 true，失败抛出错误
 */
export async function loadPrototype(prototypeId: string): Promise<boolean> {
  const loader = prototypeModules[prototypeId];
  
  if (!loader) {
    throw new Error(
      `[PrototypePreviewer] 未找到原型 "${prototypeId}" 的加载器。\n` +
      `可用的原型: ${Object.keys(prototypeModules).join(', ')}\n` +
      `请在 prototype-modules.ts 中注册该原型。`
    );
  }
  
  try {
    // 动态导入模块（模块内部会自动调用 registerPrototype）
    await loader();
    return true;
  } catch (err) {
    throw new Error(
      `[PrototypePreviewer] 加载原型模块 "${prototypeId}" 失败: ${(err as any)?.message || err}`
    );
  }
}

/**
 * 批量加载原型
 * @param prototypeIds 原型 ID 列表
 */
export async function loadPrototypes(prototypeIds: string[]): Promise<void> {
  await Promise.all(prototypeIds.map(id => loadPrototype(id)));
}

/**
 * 获取所有可用的原型 ID
 */
export function getAvailablePrototypes(): string[] {
  return Object.keys(prototypeModules);
}

