import { Button } from "@chakra-ui/react";
import { Dice1, PlusIcon } from "lucide-react";
import { css } from "../../../styled-system/css";
import { colorsNamed, formatHex } from "culori";

type NewColorProps = {
    onCreate: () => void;
    isLast: boolean;
    uniqueId: number;
    onChangeColor: (color: string) => void;
};

export const NewColor = ({ onCreate, isLast, uniqueId, onChangeColor }: NewColorProps) => {
    return isLast ? (
        <Button
            variant="ghost"
            colorPalette="green"
            size="sm"
            height="36px"
            width="36px"
            borderRadius="full"
            onClick={() => {
                onCreate();
            }}
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
            onClick={() => {
                const randomColor = Object.keys(colorsNamed)[Math.floor(Math.random() * Object.keys(colorsNamed).length)];
                onChangeColor(formatHex(randomColor) ?? "#000000");
            }}
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
            <Dice1 size={28} />
        </Button>
    )
};