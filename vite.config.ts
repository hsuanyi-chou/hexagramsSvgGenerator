import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'HexagramsSvgGenerator',
      fileName: (format) => {
        if (format === 'es') return 'index.mjs';
        if (format === 'umd') return 'index.umd.js';
        return 'index.js';
      },
      formats: ['es', 'cjs', 'umd'],
    },
    outDir: 'lib',
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      exclude: ['src/dev/**/*', 'src/__tests__/**/*'],
    }),
  ],
});
