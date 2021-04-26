import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import url from "rollup-plugin-url"
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import { name } from "./package.json";

export default [
  {
    input: "src/index.jsx",
    output: [
      {
        // exports: "named",
        file: `esm/${name}.jsx`,
        format: "esm",
      },
    ],
    plugins: [
      nodeResolve({
        mainFields: ["module", "main"],
      }),
      commonjs({
        include: "node_modules/**",
      }),
      babel({
        exclude: "node_modules/**",
        extensions: ['.js', '.ts', '.jsx','tsx'],
      }),
      url({
        limit: 10 * 1024, // inline files < 10k, copy files > 10k
        // include: ["**/*.svg"], // defaults to .svg, .png, .jpg and .gif files
        emitFiles: true // defaults to true
      }),
      terser(),
      postcss({
        plugins: [autoprefixer, cssnano],
        extensions: ['.less', '.css'],
        use: ['less'],
        extract: 'multi-select.css', // 输出路径
      }),
    ],
  },
];
