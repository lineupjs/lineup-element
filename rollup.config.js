import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import string from 'rollup-plugin-string';

export default {
  input: './src/index.ts',
  output: {
    file: 'lineup-element.js',
    format: 'iife',
    name: 'LineUpElement'
  },
  plugins: [
    resolve(),
    typescript({
      typescript: require('typescript')
    }),
    string({
      // Required to be specified
      include: '**.css'
    })
  ]
}
