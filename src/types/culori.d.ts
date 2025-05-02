declare module "culori" {
    export function converter(mode: string): (color: string) => any;
    export function wcagContrast(color1: any, color2: any): number;
}
