import { Badge } from "@chakra-ui/react";
import { converter, wcagContrast } from "culori";
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
                "--shadow-color": "var(--chakra-colors-gray-subtle)",
                borderColor: "var(--chakra-colors-gray-subtle)",
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
