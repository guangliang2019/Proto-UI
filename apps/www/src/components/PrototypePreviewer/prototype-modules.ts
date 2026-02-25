// src/components/PrototypePreviewer/prototype-modules.ts
// 原型模块映射表 - 按需动态导入

import { registerPrototype } from './registry';

export type PrototypeModuleLoader = () => Promise<any>;

const DEMO_SUFFIX = '.demo.proto.ts';

function getPrototypeIdFromPath(path: string): string | null {
  const file = path.split('/').pop();
  if (!file || !file.endsWith(DEMO_SUFFIX)) return null;
  return file.slice(0, -DEMO_SUFFIX.length);
}

/**
 * 手动注册（可选）
 * key: prototypeId
 * value: 动态导入函数
 */
const manualPrototypeModules: Record<string, PrototypeModuleLoader> = {
  // 示例：'button-demo': () => import('../../content/docs/zh-cn/components/button-demo.demo.proto'),
};

/**
 * 自动注册：扫描所有 *.demo.proto.ts
 */
const autoModuleLoaders = import.meta.glob('../../content/**/*.demo.proto.ts');
const autoPrototypeModules: Record<string, PrototypeModuleLoader> = {};

for (const [path, loader] of Object.entries(autoModuleLoaders)) {
  const id = getPrototypeIdFromPath(path);
  if (!id) continue;
  if (manualPrototypeModules[id] || autoPrototypeModules[id]) {
    throw new Error(
      `[PrototypePreviewer] 原型 ID 冲突: "${id}"。\n` +
        `请确保 *.demo.proto.ts 文件名唯一，且不与手动注册重复。\n` +
        `冲突文件: ${path}`
    );
  }

  autoPrototypeModules[id] = async () => {
    const mod = await (loader as PrototypeModuleLoader)();
    if (!mod?.default) {
      throw new Error(
        `[PrototypePreviewer] 原型模块 "${path}" 缺少默认导出。\n` +
          `请使用 default export 导出一个 Prototype。`
      );
    }
    registerPrototype(id, mod.default);
  };
}

/**
 * 原型模块注册表（自动 + 手动）
 * key: prototypeId
 * value: 动态导入函数
 */
export const prototypeModules: Record<string, PrototypeModuleLoader> = {
  ...autoPrototypeModules,
  ...manualPrototypeModules,
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
        `请创建对应的 *.demo.proto.ts 文件，或在 prototype-modules.ts 中手动注册。`
    );
  }

  try {
    // 动态导入模块（模块内部可能会自动调用 registerPrototype）
    const mod = await loader();
    // 若模块提供 default export，则作为 Prototype 自动注册
    if (mod?.default) {
      registerPrototype(prototypeId, mod.default);
    }
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
  await Promise.all(prototypeIds.map((id) => loadPrototype(id)));
}

/**
 * 获取所有可用的原型 ID
 */
export function getAvailablePrototypes(): string[] {
  return Object.keys(prototypeModules);
}
