"use client";

import { useAtom, useSetAtom } from "jotai";
import {
    addColorPaletteAtom,
    chromaAtom,
    colorsAtom,
    gainAtom,
    lengthAtom,
    maxAtom,
    minAtom,
    modeAtom,
    removeColorPaletteAtom,
    updateColorIdAtom,
    updateColorValueAtom,
} from "../atoms/colorPaletteAtoms";

export function useColorPaletteState() {
    const [colors] = useAtom(colorsAtom);
    const [length, setLength] = useAtom(lengthAtom);
    const [mode, setMode] = useAtom(modeAtom);
    const [gain, setGain] = useAtom(gainAtom);
    const [max, setMax] = useAtom(maxAtom);
    const [min, setMin] = useAtom(minAtom);
    const [chroma, setChroma] = useAtom(chromaAtom);

    const addColorPalette = useSetAtom(addColorPaletteAtom);
    const removeColorPalette = useSetAtom(removeColorPaletteAtom);
    const updateColorValue = useSetAtom(updateColorValueAtom);
    const updateColorId = useSetAtom(updateColorIdAtom);

    return {
        colors,
        length,
        setLength,
        mode,
        setMode,
        gain,
        setGain,
        max,
        setMax,
        min,
        setMin,
        chroma,
        setChroma,
        addColorPalette,
        removeColorPalette,
        updateColorId,
        updateColorValue,
    };
}
