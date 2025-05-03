import { Badge } from "@chakra-ui/react";
import { type Rgb, converter } from "culori";
import { css } from "../../../styled-system/css";

type ContrastScoreBadgeProps = {
    targetColor: string;
    baseColor: string;
};

// 色を解析して16進数に変換
const rgb = converter("rgb");
// 事前に white と black のRGB値を計算
const whiteRgb = rgb("white");
const blackRgb = rgb("black");

export const ContrastScoreBadge = ({ targetColor, baseColor }: ContrastScoreBadgeProps) => {
    const targetColorRgb = rgb(targetColor);
    const baseColorRgb = rgb(baseColor);

    // whiteRgb と blackRgb も含めてnullチェックを行う
    if (!targetColorRgb || !baseColorRgb || !whiteRgb || !blackRgb) {
        // エラーハンドリング: 不正な色の場合、何も表示しないか、エラー表示を返す
        console.error("無効な色が指定されました:", { targetColor, baseColor });
        return null;
    }

    const contrastRatio = wcagContrast(targetColorRgb, baseColorRgb);
    // コントラスト比を小数点第1位まで丸める
    const decimalPlaces = 2;
    const contrastScore = Math.round(contrastRatio * 10 ** decimalPlaces) / 10 ** decimalPlaces;

    // ! を使わずに textColor を計算
    const textColor = wcagContrast(baseColorRgb, whiteRgb) > wcagContrast(baseColorRgb, blackRgb) ? "white" : "black";

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
                    color: textColor, // 計算済みの textColor を使用
                } as React.CSSProperties
            }
        >
            {contrastScore}:1
        </Badge>
    );
};

// 相対輝度を計算する関数
const getRelativeLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const wcagContrast = (targetColor: Rgb, baseColor: Rgb): number => {
    const l1 = getRelativeLuminance(targetColor.r, targetColor.g, targetColor.b);
    const l2 = getRelativeLuminance(baseColor.r, baseColor.g, baseColor.b);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
};
