import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['test/**/*.test.ts', 'src/**/*.test.ts'],
    alias: {
      '@proto.ui/core': path.resolve(__dirname, '../../core/src/index.ts'),
      '@proto.ui/types': path.resolve(__dirname, '../../types/src/index.ts'),
      '@proto.ui/module-base': path.resolve(__dirname, '../base/src/index.ts'),
    },
  },
});
