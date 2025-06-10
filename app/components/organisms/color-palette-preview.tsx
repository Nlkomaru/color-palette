import type { ColorInfo } from "../../types/type";
import { HStack, VStack } from "styled-system/jsx";
import { css } from "../../../styled-system/css";
import { ColorContrastBox } from "../molecules/color-contrast-box";
import { ColorDisplay } from "../molecules/color-display";
import { Button } from "@chakra-ui/react";
import { TrashIcon } from "lucide-react";
import { NewColor } from "../atoms/newColor";

export type ColorPalettePreviewProps = {
    colorValue: string;
    colorId: string;
    uniqueId: number;
    displayColors: ColorInfo[];
    onChangeColor: (color: string) => void;
    onChangeId: (id: string) => void;
    lightBackgroundColor: string;
    darkBackgroundColor: string;
    onRemove: () => void;
    onCreate: () => void;
    isLast?: boolean;
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
    onRemove,
    onCreate,
    isLast,
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
            <VStack gap="3" alignSelf="flex-end">
                <Button
                    variant="ghost"
                    colorPalette="red"
                    size="sm"
                    height="36px"
                    width="36px"
                    borderRadius="full"
                    onClick={() => {
                        onRemove();
                    }}
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
                <NewColor onChangeColor={onChangeColor} uniqueId={uniqueId} onCreate={onCreate} isLast={isLast ?? false} />
            </VStack>
        </HStack>
    );
};
