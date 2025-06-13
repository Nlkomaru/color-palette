import { cloudflare } from "@cloudflare/vite-plugin";
import pandacss from "@pandacss/dev/postcss";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), reactRouter(), tsconfigPaths()],
    css: {
        postcss: {
            plugins: [autoprefixer, pandacss],
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
    build: {
        sourcemap: false, // ソースマップ警告を回避
    },
});
