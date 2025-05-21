declare module 'apca-w3' {
    export function APCAcontrast(
        textColor: number,
        backgroundColor: number
    ): number;

    export function sRGBtoY(
        rgb: [number, number, number]
    ): number | null | NaN | undefined;
} 