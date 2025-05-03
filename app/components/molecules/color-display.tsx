import { Field, Input } from "@chakra-ui/react";
import { css } from "../../../styled-system/css";
import { ColorPickerInput } from "../atoms/color-picker-input";

type ColorDisplayProps = {
    color: string;
    id: string;
    onChangeColor: (color: string) => void;
    onChangeId: (id: string) => void;
};

export function ColorDisplay({ color, id, onChangeColor, onChangeId }: ColorDisplayProps) {
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
                <Field.Label>Color id</Field.Label>
                <Input placeholder="green" value={id} onChange={(e) => onChangeId(e.target.value)} />
            </Field.Root>
            <ColorPickerInput color={color} onChangeColor={onChangeColor} onChangeId={onChangeId} />
        </div>
    );
}
