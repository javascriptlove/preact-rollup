import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';

module.exports = {
  input: 'src/index.jsx',
  output: {
    dir: 'public/dist/',
    format: 'iife', // 'cjs' if building Node app, 'umd' for both
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
        extensions: [".js"],
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify( 'development' ),
        preventAssignment: true
    }),
    babel({
        presets: ["@babel/preset-react"],
        plugins: ["@babel/plugin-transform-react-jsx"],
        babelHelpers: 'bundled'
    }),
    commonjs(),
    serve({
        open: true,
        verbose: true,
        contentBase: ["", "public"],
        host: "localhost",
        port: 3000,
    }),
    livereload({ watch: "public" }),
    
    alias({
      entries: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
        { find: 'react-dom', replacement: 'preact/compat' },
        { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
      ]
    })
  ]
};