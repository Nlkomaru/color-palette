import { Button } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { TrashIcon } from "lucide-react";
import { HStack, VStack } from "styled-system/jsx";
import { css } from "../../../styled-system/css";
import {
    addColorPaletteAtom,
    removeColorPaletteAtom,
    updateColorIdAtom,
    updateColorValueAtom,
} from "../../atoms/colorPaletteAtoms";
import type { ColorInfo } from "../../types/type";
import { NewColor } from "../atoms/new-color";
import { ColorContrastBox } from "../molecules/color-contrast-box";
import { ColorDisplay } from "../molecules/color-display";

export type ColorPalettePreviewProps = {
    colorValue: string;
    colorId: string;
    uniqueId: number;
    displayColors: ColorInfo[];
    lightBackgroundColor: string;
    darkBackgroundColor: string;
    isLast?: boolean;
};

/**
 * カラーパレットのプレビューを表示するコンポーネント
 * @param colorValue - 色の値
 * @param colorId - 色のID
 * @param uniqueId - ユニークID
 * @param displayColors - 表示する色の配列
 * @param lightBackgroundColor - 明るい背景色
 * @param darkBackgroundColor - 暗い背景色
 * @param isLast - 最後の要素かどうか
 */
export const ColorPalettePreview = ({
    colorValue,
    colorId,
    uniqueId,
    displayColors,
    lightBackgroundColor,
    darkBackgroundColor,
    isLast,
}: ColorPalettePreviewProps) => {
    // Jotaiのアクションを取得
    const addColorPalette = useSetAtom(addColorPaletteAtom);
    const removeColorPalette = useSetAtom(removeColorPaletteAtom);
    const updateColorValue = useSetAtom(updateColorValueAtom);
    const updateColorId = useSetAtom(updateColorIdAtom);

    // ハンドラ関数を定義
    const handleChangeColor = (color: string) => {
        updateColorValue(uniqueId, color);
    };

    const handleChangeId = (id: string) => {
        updateColorId(uniqueId, id);
    };

    const handleRemove = () => {
        removeColorPalette(uniqueId);
    };

    const handleCreate = () => {
        addColorPalette();
    };
    return (
        <HStack gap="8" alignItems="flex-start" height="9rem">
            <ColorDisplay
                colorId={colorId}
                colorValue={colorValue}
                onChangeColor={handleChangeColor}
                onChangeId={handleChangeId}
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
            <VStack gap="3" alignSelf="flex-end">
                <Button
                    variant="ghost"
                    colorPalette="red"
                    size="sm"
                    height="36px"
                    width="36px"
                    borderRadius="full"
                    onClick={handleRemove}
                    className={css({
                        transition: "all 0.2s ease-in-out",
                        _hover: {
                            transform: "scale(1.1)",
                            backgroundColor: "red.100",
                        },
                        _active: {
                            transform: "scale(0.95)",
                        },
                    })}
                >
                    <TrashIcon size={28} />
                </Button>
                <NewColor uniqueId={uniqueId} isLast={isLast ?? false} />
            </VStack>
        </HStack>
    );
};
