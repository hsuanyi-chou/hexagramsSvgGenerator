import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.js',
      format: 'esm',
    },
    plugins: [
      typescript({
        verbosity: 3,
        tsconfigOverride: {
          compilerOptions: {
            module: "ESNext"
          }
        },
        clean: true,
        check: true,
        tsconfig: './tsconfig.json',
        typescript: require('typescript'),
        useTsconfigDeclarationDir: true
    }),
      nodeResolve({dedupe:['lunar-calendar-zh']}),
      commonjs({transformMixedEsModules: true, include:['.js', '.cjs']}),
    ],
  },
  
]