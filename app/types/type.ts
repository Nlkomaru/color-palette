export interface ColorInfo {
    color: string; // 色の文字列 ex) oklch(0.5 0.1 270 / 1)
    fallback: string; // 色の文字列 ex) oklch(0.5 0.1 270 / 1)
    lightness: number; // 色の明度 0.0 - 1.0
    hex: string; // 色の16進数表記 ex) #00000000
}

export type LightnessMode = "constant" | "linear" | "sigmoid";
