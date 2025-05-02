import { Field, Input } from "@chakra-ui/react";
import { css } from "../../../styled-system/css";
import { ColorPickerInput } from "../atoms/color-picker-input";

export function ColorDisplay() {
    return (
        <div
            className={css({
                width: "15rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            })}
        >
            <Field.Root>
                <Field.Label>Color id</Field.Label>
                <Input placeholder="green" />
            </Field.Root>
            <ColorPickerInput />
        </div>
    );
}
