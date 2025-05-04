import type { ColorInfo } from "app/type/type";
import { type Oklch, clampChroma, converter, parse } from "culori";
import { css } from "../../../styled-system/css";
import { VStack } from "../../../styled-system/jsx";
import { ColorBox } from "../atoms/color-box";
import { ContrastScoreBadge } from "../atoms/contrast-score-badge";
type ColorContrastBoxProps = {
    targetColor: ColorInfo;
    index: number;
    lightBackgroundColor: string;
    darkBackgroundColor: string;
};

/**
 * 背景色と前景色の組み合わせを表示し、コントラストスコアを示すバッジを表示するコンポーネント
 * @param foregroundColor - 前景色 (例: '#ffffff')
 * @param backgroundColor - 背景色 (例: '#000000')
 */
export const ColorContrastBox = ({
    targetColor,
    index,
    lightBackgroundColor,
    darkBackgroundColor,
}: ColorContrastBoxProps) => {
    const oklchConvert = converter("oklch");
    const parsedColor = parse(targetColor.color);
    if (!parsedColor) return null;
    const clampedColor = clampChroma(parsedColor, "oklch");
    if (!clampedColor) return null;
    const targetColorOklch = oklchConvert(clampedColor) as Oklch;
    const oklchText = `oklch(${targetColorOklch.l.toFixed(2)} ${targetColorOklch.c.toFixed(2)} ${targetColorOklch.h?.toFixed(2) ?? 0})`;

    return (
        <VStack key={index} alignItems="center" gap="0rem" height="100%" textAlign="center">
            <div className={css({ fontSize: "xs", color: "gray.500", textAlign: "center", width: "100%" })}>
                {(index + 1) * 100}
            </div>
            <VStack height="100%" justifyContent="space-between" className={css({ height: "100%" })}>
                {/* 背景色を表示するボックス */}
                <div className={css({ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" })}>
                    <ColorBox color={targetColor} />
                    {/* <div className={css({ fontSize: "2xs", color: "gray.500" })}>{oklchText}</div> */}
                </div>
                {/* コントラストスコアを表示するバッジ */}
                <VStack gap="0.5rem">
                    <ContrastScoreBadge targetColor={targetColor.color} baseColor={lightBackgroundColor} />
                    <ContrastScoreBadge targetColor={targetColor.color} baseColor={darkBackgroundColor} />
                </VStack>
            </VStack>
        </VStack>
    );
};
