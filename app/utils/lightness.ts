import type { LightnessMode } from "../types/type";

const MAX_LIGHTNESS = 0.95;
const MIN_LIGHTNESS = 0.20;

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
    const step = (MAX_LIGHTNESS - MIN_LIGHTNESS) / (length - 1);
    // MAX_LIGHTNESSからMIN_LIGHTNESSまで等間隔で減少する配列を生成
    return Array.from({ length }, (_, i) => MAX_LIGHTNESS - i * step);
}

export const sigmoidLightness = (length: number, gain: number): number[] => {
    // シグモイド関数を定義
    const sigmoid = (x: number): number => {
        const k = 10; // x軸の範囲（0〜10）を表すスケーリングファクター
        const adjustedGain = gain * 0.5; // gainを調整してシグモイドの勾配を調整
        const rawSigmoid = 1 / (1 + Math.exp(-adjustedGain * (x - k / 2))); // 0〜1のシグモイド値
        // 逆向きにするために (1 - rawSigmoid) を使い、MIN_LIGHTNESS〜MAX_LIGHTNESS の範囲にスケーリング
        return MIN_LIGHTNESS + (MAX_LIGHTNESS - MIN_LIGHTNESS) * (1 - rawSigmoid);
    };

    // 指定したステップ数でシグモイドデータを生成
    const generateSigmoidData = (steps: number): number[] => {
        const start = 0;
        const end = 10;
        const stepSize = (end - start) / (steps - 1);
        return Array.from({ length: steps }, (_, i) => {
            const x = start + i * stepSize;
            return sigmoid(x);
        });
    };

    // 生成した配列をそのまま返却
    return generateSigmoidData(length);
};
