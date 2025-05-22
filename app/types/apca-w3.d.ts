declare module 'apca-w3' {
    export function APCAcontrast(
        textColor: number,
        backgroundColor: number
    ): number;

    export function sRGBtoY(
        rgba: number[]
    ): number | null | NaN | undefined;

    export function alphaBlend(
        rgba1: number[],
        rgba2: number[]
    ): number[];
} 