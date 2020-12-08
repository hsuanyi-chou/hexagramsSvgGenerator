import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './lib/GuaGenerator.js',
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
      nodeResolve(),
      commonjs({transformMixedEsModules: true}),
      // 跟下面的差別就是少了terser()。若有異動上述功能要記得兩邊一起改
    ],
  },
  {
    input: './src/index.ts',
    output: {
      file: './lib/GuaGenerator.min.js',
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
      nodeResolve(),
      commonjs({transformMixedEsModules: true}),
      terser(), // 若要測試一起打包lunar-Calender-zh的話，則先註解此段
    ],
  },
  
]