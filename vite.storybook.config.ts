import pandacss from "@pandacss/dev/postcss";
import autoprefixer from "autoprefixer";
import { type UserConfig, defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }): UserConfig => {
    const env = loadEnv(mode, process.cwd(), "");
    process.env = { ...process.env, ...env };
    return {
        css: {
            postcss: {
                plugins: [autoprefixer, pandacss],
            },
        },
        plugins: [tsconfigPaths()],
    };
});
