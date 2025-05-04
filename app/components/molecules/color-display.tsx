import { Field, Input } from "@chakra-ui/react";
import { css } from "../../../styled-system/css";
import { ColorPickerInput } from "../atoms/color-picker-input";

type ColorDisplayProps = {
    colorValue: string;
    colorId: string;
    onChangeColor: (color: string) => void;
    onChangeId: (id: string) => void;
};

export function ColorDisplay({ colorValue, colorId, onChangeColor, onChangeId }: ColorDisplayProps) {
    return (
        <div
            className={css({
                width: "15rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            })}
        >
            <Field.Root>
                <Field.Label color="black">Color id</Field.Label>
                <Input placeholder="green" value={colorId} onChange={(e) => onChangeId(e.target.value)} />
            </Field.Root>
            <ColorPickerInput color={colorValue} onChangeColor={onChangeColor} />
        </div>
    );
}
