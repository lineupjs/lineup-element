import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

export default {
  entry: './src/index.ts',
  output: {
    format: 'esm'
  },
  plugins: [
    resolve({
      module: false
    }),
    commonjs(),
    typescript()
  ],
  external: [
    '@polymer/polymer',
    '@polymer/decorators'
  ]
};
