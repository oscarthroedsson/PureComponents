import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

/*
The dev shell consumes PureUI the way a consumer does, through one root-absolute
path instead of a chain of ../../. `<link href="/pureui/styles/button.css">` in a
page resolves to packages/ui/css/styles/button.css.
*/
const pureui = fileURLToPath(new URL("../../packages/ui/css", import.meta.url));
const repoRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "/pureui": pureui,
    },
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    fs: {
      // The library lives outside this app's root.
      allow: [repoRoot],
    },
  },
});
