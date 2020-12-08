import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve';
export default [
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.esm.js',
      format: 'esm',
    },
    plugins: [
      nodeResolve(),
      typescript(),
    ],
  },
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.js',
      format: 'cjs',
    },
    plugins: [
      nodeResolve(),
      typescript(),
    ],
  },
  
]