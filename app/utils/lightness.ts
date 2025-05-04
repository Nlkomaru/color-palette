import type { LightnessMode } from "../type/type";

export function getLightness(length: number, mode: LightnessMode): number[] {
    switch (mode) {
        case "constant":
            return constantLightness(length);
        case "linear":
            return linearLightness(length);
        case "sigmoid":
            return sigmoidLightness(length);
    }
}

function constantLightness(length: number) {
    return Array(length).fill(0.5);
}

function linearLightness(length: number) {
    const min = 0.05;
    const max = 0.90;
    const step = (max - min) / (length - 1);
    return Array.from({ length }, (_, i) => min + i * step);
}

function sigmoidLightness(length: number) {
    return Array(length).fill(0.5);
}
