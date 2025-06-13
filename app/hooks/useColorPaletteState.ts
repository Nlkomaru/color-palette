"use client";

import { useAtom, useSetAtom } from "jotai";
import {
    addColorPaletteAtom,
    colorsAtom,
    gainAtom,
    lengthAtom,
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
        addColorPalette,
        removeColorPalette,
        updateColorId,
        updateColorValue,
    };
}
