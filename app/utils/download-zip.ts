import { saveAs } from "file-saver";
import JSZip from "jszip";
import type { LightnessMode } from "../types/type";
import { getColorChannels } from "./color";
import { DEFAULT_MAX_LIGHTNESS, DEFAULT_MIN_LIGHTNESS, getLightness } from "./lightness";

/**
 * Generate Panda token files for the current palette and download as ZIP.
 *
 * @param palettes array of base colours chosen by the user
 * @param length   number of shades per palette
 * @param mode     lightness distribution mode (linear / sigmoid / constant)
 * @param gain     gain for sigmoid mode
 * @param max      max lightness value
 * @param min      min lightness value
 */
export async function downloadColorTokensZip(
    palettes: ColorPaletteInput[],
    length: number,
    mode: LightnessMode,
    gain: number,
    max: number = DEFAULT_MAX_LIGHTNESS,
    min: number = DEFAULT_MIN_LIGHTNESS,
    chroma = 1,
) {
    const zip = new JSZip();
    const folder = zip.folder("base");
    if (!folder) return;

    // Helper: ensure identifier safe for file/variable names
    const toIdentifier = (str: string, fallback: string): string => {
        const safe = str.replace(/[^a-zA-Z0-9_$]/g, "_");
        return /[a-zA-Z_$]/.test(safe.charAt(0)) ? safe : fallback;
    };

    const importLines: string[] = [];
    const spreadLines: string[] = [];

    // Pre-compute common lightness array once
    const lightnessArr = getLightness(length, mode, gain, max, min);

    palettes.forEach(({ colorValue, colorId }, idx) => {
        const id = toIdentifier(colorId, `color${idx}`);
        const filename = `${id}.ts`;

        // Generate colour channels for the palette
        const channels = getColorChannels(colorValue, lightnessArr, chroma);

        // Build token object lines (100, 200, ...)
        const entries = channels
            .map((ch, i) => {
                const step = lightnessArr[i].index;
                return `        ${step}: { value: "${ch}" },`;
            })
            .join("\n");

        const fileContent = `import { defineTokens } from "@pandacss/dev";

export const ${id} = defineTokens.colors({
    ${id}: {
${entries}
    },
});
`;

        folder.file(filename, fileContent);

        importLines.push(`import { ${id} } from "./${id}";`);
        spreadLines.push(`    ...${id},`);
    });

    // Build index.ts with dynamic imports/spreads
    const indexTs = `import { defineTokens } from "@pandacss/dev";
${importLines.join("\n")}

export const colors = defineTokens.colors({
${spreadLines.join("\n")}
});
`;

    folder.file("index.ts", indexTs);

    // Generate and trigger download
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "color-tokens.zip");
}

export type ColorPaletteInput = {
    colorValue: string;
    colorId: string;
};
