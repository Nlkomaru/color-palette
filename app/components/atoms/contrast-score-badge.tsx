import { Badge } from "@chakra-ui/react";
import { APCAcontrast, alphaBlend, sRGBtoY } from "apca-w3";
import { clampChroma, converter, parse } from "culori";
import { css } from "../../../styled-system/css";
type ContrastScoreBadgeProps = {
    targetColor: string;
    baseColor: string;
};

// 色を解析して16進数に変換
const rgb = converter("rgb");
const oklch = converter("oklch");
// 事前に white と black のRGB値を計算
const whiteRgb = rgb("white");
const blackRgb = rgb("black");

export const ContrastScoreBadge = ({ targetColor, baseColor }: ContrastScoreBadgeProps) => {
    const parsedTargetColor = parse(targetColor);
    if (!parsedTargetColor) {
        console.error("無効なターゲット色が指定されました:", targetColor);
        return null;
    }
    const targetColorOklch = oklch(parsedTargetColor);
    const clampedTargetColorOklch = clampChroma(targetColorOklch, "oklch");
    if (!clampedTargetColorOklch) {
        console.error("色の範囲調整に失敗しました:", targetColor);
        return null;
    }
    const targetColorRgb = rgb(clampedTargetColorOklch);

    const parsedBaseColor = parse(baseColor);
    if (!parsedBaseColor) {
        console.error("無効なベース色が指定されました:", baseColor);
        return null;
    }
    const baseColorOklch = oklch(parsedBaseColor);
    const clampedBaseColorOklch = clampChroma(baseColorOklch, "oklch");
    if (!clampedBaseColorOklch) {
        console.error("色の範囲調整に失敗しました:", baseColor);
        return null;
    }
    const baseColorRgb = rgb(clampedBaseColorOklch);

    // whiteRgb と blackRgb も含めてnullチェックを行う
    if (!targetColorRgb || !baseColorRgb || !whiteRgb || !blackRgb) {
        // エラーハンドリング: 不正な色の場合、何も表示しないか、エラー表示を返す
        console.error("無効な色が指定されました:", { targetColor, baseColor });
        return null;
    }

    const mergedColorRgb = alphaBlend(
        [targetColorRgb.r * 255, targetColorRgb.g * 255, targetColorRgb.b * 255, targetColorRgb.alpha ?? 1],
        [baseColorRgb.r * 255, baseColorRgb.g * 255, baseColorRgb.b * 255, baseColorRgb.alpha ?? 1],
    );

    // RGB値を0-1の範囲に正規化
    const targetY = sRGBtoY([mergedColorRgb[0], mergedColorRgb[1], mergedColorRgb[2]]) || 0;

    const baseY = sRGBtoY([baseColorRgb.r * 255, baseColorRgb.g * 255, baseColorRgb.b * 255]) ?? 0;

    // APCAのコントラストスコアを計算（text, background順）
    const contrastScore = APCAcontrast(targetY, baseY);

    // テキストの色を決定（APCAのスコアに基づいて）
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
                    color: targetColor,
                } as React.CSSProperties
            }
        >
            {contrastScore.toFixed(1)}
        </Badge>
    );
};
