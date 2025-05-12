import type { LightnessMode } from "../types/type";

export function getLightness(length: number, mode: LightnessMode, gain: number): number[] {
    switch (mode) {
        case "constant":
            return constantLightness(length);
        case "linear":
            return linearLightness(length);
        case "sigmoid":
            return sigmoidLightness(length, gain);
    }
}

function constantLightness(length: number) {
    return Array(length).fill(0.5);
}

function linearLightness(length: number) {
    const min = 0.05;
    const max = 0.9;
    const step = (max - min) / (length - 1);
    return Array.from({ length }, (_, i) => min + i * step);
}
export const sigmoidLightness = (length: number, gain: number): number[] => {
    const sigmoid = (x: number): number => {
        const k = 10; // x軸の範囲（0〜10）に対応するスケーリングファクター
        // gainの値を調整して、sigmoid関数の勾配を調整する
        const adjustedGain = gain * 0.5; // gainの値を調整して、sigmoid関数の勾配を調整する
        const rawSigmoid = 1 / (1 + Math.exp(-adjustedGain * (x - k / 2)));

        // 値を 0.1 ~ 1 にスケーリングする
        return 0.1 + 0.9 * rawSigmoid;
    };

    const generateSigmoidData = (steps: number): { x: number; y: number }[] => {
        const start = 0;
        const end = 10;
        const stepSize = (end - start) / (steps - 1);
        return Array.from({ length: steps }, (_, i) => {
            const x = start + i * stepSize;
            const y = sigmoid(x);
            return { x, y };
        });
    };

    const data = generateSigmoidData(length);
    return data.map(({ y }) => y);
};
