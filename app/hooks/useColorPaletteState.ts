"use client";

import type { LightnessMode } from "../types/type";
import { useQueryState } from "nuqs";
import { colorsNamed, formatHex } from "culori";

type ColorPalette = {
    colorValue: string;
    colorId: string;
    uniqueId: number;
};

const defaultColors: ColorPalette[] = [
    {
        colorValue: "#539676",
        colorId: "mori",
        uniqueId: 1,
    },
    {
        colorValue: "#00368e",
        colorId: "umi",
        uniqueId: 2,
    },
];

export function useColorPaletteState() {
    const [colors, setColors] = useQueryState<ColorPalette[]>("data", {
        defaultValue: defaultColors,
        parse: (value) => JSON.parse(value),
        serialize: (value) => JSON.stringify(value),
    });

    const [length, setLength] = useQueryState("length", {
        defaultValue: 12,
        parse: (value) => Number.parseInt(value),
        serialize: (value) => String(value),
    });

    const [mode, setMode] = useQueryState<LightnessMode>("mode", {
        defaultValue: "sigmoid",
        parse: (value) => value as LightnessMode,
        serialize: (value) => value,
    });

    const [gain, setGain] = useQueryState("gain", {
        defaultValue: 1.25,
        parse: (value) => Number.parseFloat(value),
        serialize: (value) => String(value),
    });

    const lastUniqueId = colors.at(-1)?.uniqueId ?? 1;

    const addColorPalette = () => {
        // 新しいカラーパレットを追加する際、length も更新する必要がある点に注意
        // (現状の実装では length がパレットの数ではなく、生成色の数を意味しているため、
        //  必ずしもインクリメントする必要はないかもしれない。要件に応じて調整が必要)
        const newUniqueId = lastUniqueId + 1;
        const colorNames = Object.keys(colorsNamed)
        const randomColor = colorNames[Math.floor(Math.random() * colorNames.length)];
        const randomColorValue = formatHex(randomColor) ?? "#000000";
        setColors([...colors, { colorValue: randomColorValue, colorId: randomColor, uniqueId: newUniqueId }]);
        // setLength(length + 1); // 必要に応じてコメントアウトを解除または修正
    };

    const removeColorPalette = (uniqueId: number) => {
        setColors(colors.filter(({ uniqueId: id }) => id !== uniqueId));
        // パレット削除時に length もデクリメントするかどうかは要件次第
        // setLength(length - 1); // 必要に応じてコメントアウトを解除または修正
    };

    const updateColorValue = (uniqueId: number, newColor: string) => {
        setColors(colors.map((c) => (c.uniqueId === uniqueId ? { ...c, colorValue: newColor } : c)));
    };

    const updateColorId = (uniqueId: number, newId: string) => {
        setColors(colors.map((c) => (c.uniqueId === uniqueId ? { ...c, colorId: newId } : c)));
    };

    return {
        colors,
        length,
        setLength,
        mode,
        setMode,
        gain,
        setGain,
        addColorPalette,
        removeColorPalette,
        updateColorId,
        updateColorValue,
    };
}
