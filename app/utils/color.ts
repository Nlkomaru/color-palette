import { clampChroma, converter, formatHex, parse } from "culori";
import type { ColorInfo } from "../types/type";

const oklch = converter("oklch");
const rgb = converter("rgb");
// parse が失敗した場合にデフォルトの ColorInfo を返すように修正
const defaultColorInfo: ColorInfo = {
    color: "oklch(0 0 0 / 1)",
    fallback: "oklch(0 0 0 / 1)",
    lightness: 0,
    hex: "#00000000",
    index: 0,
};

export function getColorInfo(color: string, index: number): ColorInfo {
    const parsedColor = parse(color);
    // parse が失敗したらデフォルト値を返す
    if (!parsedColor) {
        console.warn(`[getColorInfo] Invalid color format: ${color}. Falling back to default.`);
        return defaultColorInfo;
    }

    const oklchColor = oklch(parsedColor);
    // oklch への変換に失敗した場合も考慮（念のため）
    if (!oklchColor) {
        console.warn(`[getColorInfo] Failed to convert color to Oklch: ${color}. Falling back to default.`);
        return defaultColorInfo;
    }

    const clampedColor = clampChroma(oklchColor, "oklch");
    // clampChroma が失敗した場合も考慮（念のため）
    if (!clampedColor) {
        console.warn(`[getColorInfo] Failed to clamp chroma for color: ${color}. Falling back to default.`);
        return defaultColorInfo;
    }
    const clampedRgb = rgb(clampedColor);
    const hex = formatHex(clampedRgb);

    return {
        color: `oklch(${oklchColor.l.toFixed(2)} ${oklchColor.c.toFixed(2)} ${oklchColor.h?.toFixed(2) ?? 0} / ${oklchColor.alpha?.toFixed(2) ?? 1})`,
        fallback: `oklch(${clampedColor.l.toFixed(2)} ${clampedColor.c.toFixed(2)} ${clampedColor.h?.toFixed(2) ?? 0} / ${clampedColor.alpha?.toFixed(2) ?? 1})`,
        lightness: Number(oklchColor.l.toFixed(2)),
        hex: hex,
        index: index,
    };
}

export function getColorChannels(
    color: string,
    lightness: { index: number; lightness: number }[],
    chroma = 1,
): string[] {
    const parsedColor = parse(color);
    if (!parsedColor) {
        console.warn(`[getColorChannels] Invalid color format: ${color}. Falling back to default.`);
        return [];
    }
    const oklchColor = oklch(parsedColor);
    if (!oklchColor) {
        console.warn(`[getColorChannels] Failed to convert color to Oklch: ${color}. Falling back to default.`);
        return [];
    }
    const clampedColor = clampChroma(oklchColor, "oklch");
    if (!clampedColor) {
        console.warn(`[getColorChannels] Failed to clamp chroma for color: ${color}. Falling back to default.`);
        return [];
    }

    const colorChannels: string[] = [];
    for (let i = 0; i < lightness.length; i++) {
        const lightnessValue = lightness[i].lightness;
        // chromaを絶対値として使用
        // 各値を小数点以下3桁に制限
        const colorChannel = `oklch(${lightnessValue.toFixed(3)} ${chroma.toFixed(3)} ${(clampedColor.h ?? 0).toFixed(3)} / ${(clampedColor.alpha ?? 1).toFixed(3)})`;
        colorChannels.push(colorChannel);
    }
    return colorChannels;
}
