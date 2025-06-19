import { colorsNamed, formatHex } from "culori";
import { atom } from "jotai";
import { atomWithLocation } from "jotai-location";
import type { LightnessMode } from "../types/type";

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

// jotai-locationを使ってURL同期付きでatomを作成
const locationAtom = atomWithLocation();

// colorsのatom（URL同期）
export const colorsAtom = atom(
    (get) => {
        const location = get(locationAtom);
        const dataParam = location.searchParams?.get("data");
        if (dataParam) {
            try {
                return JSON.parse(dataParam) as ColorPalette[];
            } catch {
                return defaultColors;
            }
        }
        return defaultColors;
    },
    (get, set, newColors: ColorPalette[]) => {
        const location = get(locationAtom);
        const newSearchParams = new URLSearchParams(location.searchParams);
        newSearchParams.set("data", JSON.stringify(newColors));
        set(locationAtom, {
            ...location,
            searchParams: newSearchParams,
        });
    },
);

// lengthのatom（URL同期）
export const lengthAtom = atom(
    (get) => {
        const location = get(locationAtom);
        const lengthParam = location.searchParams?.get("length");
        return lengthParam ? Number.parseInt(lengthParam) : 12;
    },
    (get, set, newLength: number) => {
        const location = get(locationAtom);
        const newSearchParams = new URLSearchParams(location.searchParams);
        newSearchParams.set("length", String(newLength));
        set(locationAtom, {
            ...location,
            searchParams: newSearchParams,
        });
    },
);

// modeのatom（URL同期）
export const modeAtom = atom(
    (get) => {
        const location = get(locationAtom);
        const modeParam = location.searchParams?.get("mode");
        return (modeParam as LightnessMode) || "sigmoid";
    },
    (get, set, newMode: LightnessMode) => {
        const location = get(locationAtom);
        const newSearchParams = new URLSearchParams(location.searchParams);
        newSearchParams.set("mode", newMode);
        set(locationAtom, {
            ...location,
            searchParams: newSearchParams,
        });
    },
);

// gainのatom（URL同期）
export const gainAtom = atom(
    (get) => {
        const location = get(locationAtom);
        const gainParam = location.searchParams?.get("gain");
        return gainParam ? Number.parseFloat(gainParam) : 1.25;
    },
    (get, set, newGain: number) => {
        const location = get(locationAtom);
        const newSearchParams = new URLSearchParams(location.searchParams);
        newSearchParams.set("gain", String(newGain));
        set(locationAtom, {
            ...location,
            searchParams: newSearchParams,
        });
    },
);

// 派生atom（calculated values）
export const lastUniqueIdAtom = atom((get) => {
    const colors = get(colorsAtom);
    return colors.at(-1)?.uniqueId ?? 1;
});

// アクション用のatom
export const addColorPaletteAtom = atom(null, (get, set) => {
    const colors = get(colorsAtom);
    const lastUniqueId = get(lastUniqueIdAtom);
    const newUniqueId = lastUniqueId + 1;
    const colorNames = Object.keys(colorsNamed);
    const randomColor = colorNames[Math.floor(Math.random() * colorNames.length)];
    const randomColorValue = formatHex(randomColor) ?? "#000000";
    set(colorsAtom, [...colors, { colorValue: randomColorValue, colorId: randomColor, uniqueId: newUniqueId }]);
});

export const removeColorPaletteAtom = atom(null, (get, set, uniqueId: number) => {
    const colors = get(colorsAtom);
    set(
        colorsAtom,
        colors.filter(({ uniqueId: id }) => id !== uniqueId),
    );
});

export const updateColorValueAtom = atom(null, (get, set, uniqueId: number, newColor: string) => {
    const colors = get(colorsAtom);
    set(
        colorsAtom,
        colors.map((c) => (c.uniqueId === uniqueId ? { ...c, colorValue: newColor } : c)),
    );
});

export const updateColorIdAtom = atom(null, (get, set, uniqueId: number, newId: string) => {
    const colors = get(colorsAtom);
    set(
        colorsAtom,
        colors.map((c) => (c.uniqueId === uniqueId ? { ...c, colorId: newId } : c)),
    );
});
