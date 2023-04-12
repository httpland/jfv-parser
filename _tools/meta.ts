import { BuildOptions } from "https://deno.land/x/dnt@0.34.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},

  typeCheck: false,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/jfv-parser",
    version,
    description: "JSON field values for HTTP parser and serialize",
    keywords: [
      "http",
      "parser",
      "parse",
      "serializer",
      "serialize",
      "header",
      "JSON",
      "field",
      "JSON-field-value",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/jfv-parser",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/jfv-parser.git",
    },
    bugs: {
      url: "https://github.com/httpland/jfv-parser/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
  mappings: {
    "https://esm.sh/ascii-json@0.2.0?pin=v114": {
      name: "ascii-json",
      version: "0.2.0",
    },
  },
});
