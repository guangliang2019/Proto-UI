// src/content/docs/zh-cn/prototypes.ts
// 旧的集中注册方式（兼容保留）

import DemoInline from './demo-inline.demo.proto';
import { registerPrototype } from '../../../components/PrototypePreviewer/registry';

registerPrototype('demo-inline', DemoInline);

// 在这里添加更多原型的导入并手动注册
// import AnotherDemo from './another.demo.proto';
// registerPrototype('another', AnotherDemo);
