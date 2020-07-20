import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

import { name } from "./package.json";

export default [
  {
    input: "build/index.js",
    output: [
      {
        exports: "named",
        file: `lib/${name}.cjs.js`,
        format: "cjs",
      },
      {
        exports: "named",
        file: `es/${name}.es.js`,
        format: "es",
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
      }),
      terser(),
    ],
  },
];
