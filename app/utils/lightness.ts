import type { LightnessMode } from "../types/type";

const MAX_LIGHTNESS = 0.95;
const MIN_LIGHTNESS = 0.2;

export function getLightness(
    length: number,
    mode: LightnessMode,
    gain: number,
): { index: number; lightness: number }[] {
    switch (mode) {
        case "constant":
            return constantLightness(length);
        case "linear":
            return linearLightness(length);
        case "sigmoid":
            return sigmoidLightness(length, gain);
        case "chakra":
            return chakraLightness();
        case "chakra-unlinear":
            return chakraUnlinearLightness();
    }
}

function constantLightness(length: number) {
    return Array.from({ length }, (_, i) => ({ index: (i + 1) * 100, lightness: 0.5 }));
}

function linearLightness(length: number) {
    const step = (MAX_LIGHTNESS - MIN_LIGHTNESS) / (length - 1);
    // MAX_LIGHTNESSからMIN_LIGHTNESSまで等間隔で減少する配列を生成
    return Array.from({ length }, (_, i) => ({ index: (i + 1) * 100, lightness: MAX_LIGHTNESS - i * step }));
}

export const sigmoidLightness = (length: number, gain: number): { index: number; lightness: number }[] => {
    // シグモイド関数を定義
    const sigmoid = (x: number): number => {
        const k = 10; // x軸の範囲（0〜10）を表すスケーリングファクター
        const adjustedGain = gain * 0.5; // gainを調整してシグモイドの勾配を調整
        const rawSigmoid = 1 / (1 + Math.exp(-adjustedGain * (x - k / 2))); // 0〜1のシグモイド値
        // 逆向きにするために (1 - rawSigmoid) を使い、MIN_LIGHTNESS〜MAX_LIGHTNESS の範囲にスケーリング
        return MIN_LIGHTNESS + (MAX_LIGHTNESS - MIN_LIGHTNESS) * (1 - rawSigmoid);
    };

    // 指定したステップ数でシグモイドデータを生成
    const generateSigmoidData = (steps: number): { index: number; lightness: number }[] => {
        const start = 0;
        const end = 10;
        const stepSize = (end - start) / (steps - 1);
        return Array.from({ length: steps }, (_, i) => {
            const x = start + i * stepSize;
            return { index: (i + 1) * 100, lightness: sigmoid(x) };
        });
    };

    // 生成した配列をそのまま返却
    return generateSigmoidData(length);
};

function chakraLightness() {
    // ChakraUIの標準カラーパレットのlightness値
    // 50: 0.99（最も明るい）から 950: 0.18（最も暗い）まで
    const min = 0.18;
    const max = 0.99;
    const chakraIndices = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    // ChakraUIのlightness値を正しく線形補間で計算
    const chakraLightnessValues = Array.from(
        { length: chakraIndices.length },
        (_, i) => max - ((max - min) * i) / (chakraIndices.length - 1)
    );

    // ChakraUIの標準インデックス値（50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950）

    return chakraIndices.map((index, i) => ({ index: index, lightness: chakraLightnessValues[i] }));
}

function chakraUnlinearLightness() {
    const chakraIndices = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    const chakraLightnessValues = [0.9841, 0.9563, 0.9167, 0.8651, 0.7971, 0.7148, 0.6089, 0.4415, 0.3526, 0.268, 0.2092];
    return chakraIndices.map((index, i) => ({ index: index, lightness: chakraLightnessValues[i] }));
}