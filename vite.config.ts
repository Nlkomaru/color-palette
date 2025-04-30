import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pandacss from "@pandacss/dev/postcss";


export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    reactRouter(),
    tsconfigPaths(),
  ],
  css: {
    postcss: {
      plugins: [pandacss, autoprefixer],
    },
  },
  server: {
    watch: {
      usePolling: true
    }
  }
});
