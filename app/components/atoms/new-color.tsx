import { Button } from "@chakra-ui/react";
import { colorsNamed, formatHex } from "culori";
import { useSetAtom } from "jotai";
import { Dice6, PlusIcon } from "lucide-react";
import { css } from "../../../styled-system/css";
import { addColorPaletteAtom, updateColorIdAtom, updateColorValueAtom } from "../../atoms/colorPaletteAtoms";

type NewColorProps = {
    isLast: boolean;
    uniqueId: number;
};

export const NewColor = ({ isLast, uniqueId }: NewColorProps) => {
    // Jotaiのアクションを取得
    const addColorPalette = useSetAtom(addColorPaletteAtom);
    const updateColorValue = useSetAtom(updateColorValueAtom);
    const updateColorId = useSetAtom(updateColorIdAtom);

    // ハンドラ関数を定義
    const handleCreate = () => {
        addColorPalette();
    };

    const handleRandomColor = () => {
        const colorNames = Object.keys(colorsNamed);
        const randomColorName = colorNames[Math.floor(Math.random() * colorNames.length)];
        const randomColorValue = formatHex(randomColorName) ?? "#000000";

        // Color IDとColor Valueの両方を更新
        updateColorId(uniqueId, randomColorName);
        updateColorValue(uniqueId, randomColorValue);
    };
    return isLast ? (
        <Button
            variant="ghost"
            colorPalette="green"
            size="sm"
            height="36px"
            width="36px"
            borderRadius="full"
            onClick={handleCreate}
            className={css({
                transition: "all 0.2s ease-in-out",
                _hover: {
                    transform: "scale(1.1)",
                    backgroundColor: "green.100",
                },
                _active: {
                    transform: "scale(0.95)",
                },
            })}
        >
            <PlusIcon size={28} />
        </Button>
    ) : (
        <Button
            variant="ghost"
            colorPalette="green"
            size="sm"
            height="36px"
            width="36px"
            borderRadius="full"
            onClick={handleRandomColor}
            className={css({
                transition: "all 0.2s ease-in-out",
                _hover: {
                    transform: "scale(1.1)",
                    backgroundColor: "green.100",
                },
                _active: {
                    transform: "scale(0.95)",
                },
            })}
        >
            <Dice6 size={28} />
        </Button>
    );
};
