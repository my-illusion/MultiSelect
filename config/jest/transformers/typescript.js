const tsc = require("typescript");
const crypto = require("crypto");

const babelTransformer = require("./javascript");

// const tsConfig = require("../../../tsconfig.json");

const tsConfig = {
  target: "ES2016",
  module: "es2015",
  lib: ["dom", "es2015", "es2016", "es2017"],
  jsx: "react",
  declaration: true,
  outDir: "build/",
  importHelpers: true,
  noImplicitAny: true,
  strictNullChecks: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  moduleResolution: "node",
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  experimentalDecorators: true,
};

module.exports = {
  getCacheKey(src, path, configString) {
    return crypto
      .createHash("md5")
      .update(src)
      .update(configString)
      .digest("hex");
  },
  process(src, path, ...rest) {
    if (path.endsWith(".ts") || path.endsWith(".tsx")) {
      const tsOutput = tsc.transpile(src, tsConfig, path, []);

      const fakeJSPath = path.replace(/\.tsx?$/, ".js");
      return babelTransformer.process(tsOutput, fakeJSPath, ...rest);
    }
    return src;
  },
};
