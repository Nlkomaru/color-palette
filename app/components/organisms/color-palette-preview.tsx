import type { ColorInfo } from "../../types/type";
import { HStack } from "styled-system/jsx";
import { css } from "../../../styled-system/css";
import { ColorContrastBox } from "../molecules/color-contrast-box";
import { ColorDisplay } from "../molecules/color-display";
export type ColorPalettePreviewProps = {
    colorValue: string;
    colorId: string;
    uniqueId: number;
    displayColors: ColorInfo[];
    onChangeColor: (color: string) => void;
    onChangeId: (id: string) => void;
    lightBackgroundColor: string;
    darkBackgroundColor: string;
};

/**
 * カラーパレットのプレビューを表示するコンポーネント
 * @param colors - カラーパレットの色の配列
 * @param lightBackgroundColor - 明るい背景色
 * @param darkBackgroundColor - 暗い背景色
 */
export const ColorPalettePreview = ({
    colorValue,
    colorId,
    uniqueId,
    displayColors,
    lightBackgroundColor,
    darkBackgroundColor,
    onChangeColor,
    onChangeId,
}: ColorPalettePreviewProps) => {
    return (
        <HStack gap="8" alignItems="flex-start" height="9rem">
            <ColorDisplay
                colorId={colorId}
                colorValue={colorValue}
                onChangeColor={onChangeColor}
                onChangeId={onChangeId}
            />
            <div
                className={css({
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    height: "100%",
                    paddingTop: "0.5rem",
                })}
            >
                {displayColors.map((color, index) => {
                    return (
                        <ColorContrastBox
                            //biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={`${uniqueId}-${index}`}
                            index={index}
                            targetColor={color}
                            lightBackgroundColor={lightBackgroundColor}
                            darkBackgroundColor={darkBackgroundColor}
                        />
                    );
                })}
            </div>
        </HStack>
    );
};
