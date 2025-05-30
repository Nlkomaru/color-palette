import { defineConfig } from "@pandacss/dev";

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./app/**/*.{js,jsx,ts,tsx}", "./app/components/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: {},
    },
    globalCss: {
        body: {
            fontFamily: "Poppins, Zen Kaku Gothic New, sans-serif",
            color: "var(--chakra-colors-fg-muted)",
        },
    },

    jsxFramework: "react",

    // The output directory for your css system
    outdir: "styled-system",
});
