import { Badge } from "@chakra-ui/react";
import { css } from "../../../styled-system/css";
import { converter } from 'culori'

type ContrastScoreBadgeProps = {
    targetColor: string;
    baseColor: string;
};

export const ContrastScoreBadge = ({ targetColor, baseColor }: ContrastScoreBadgeProps) => {
    // 色を解析して16進数に変換
    const rgb = converter("rgb")
    
    const targetColorRgb = rgb(targetColor)
    const baseColorRgb = rgb(baseColor)
    if (!targetColorRgb || !baseColorRgb) {
        return null;
    }

    const contrastRatio = wcagContrast(targetColorRgb, baseColorRgb);
    // コントラスト比を小数点第1位まで丸める
    const decimalPlaces = 2
    const contrastScore = Math.round(contrastRatio * (10 ** decimalPlaces)) / (10 ** decimalPlaces);
    
    return (
        <Badge
            variant="outline"
            className={css({
                width: "3rem",
                textAlign: "center",
                justifyContent: "center",
                bgColor: "var(--colors-baseColor)",
                color: "var(--colors-targetColor)",
            })}
            style={
                {
                    backgroundColor: baseColor,
                    color: targetColor,
                } as React.CSSProperties
            }
        >
            {contrastScore}:1
        </Badge>
    );
};

// 相対輝度を計算する関数
const getRelativeLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const wcagContrast = (targetColor: { r: number; g: number; b: number }, baseColor: { r: number; g: number; b: number }): number => {
    const l1 = getRelativeLuminance(targetColor.r, targetColor.g, targetColor.b);
    const l2 = getRelativeLuminance(baseColor.r, baseColor.g, baseColor.b);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
};
