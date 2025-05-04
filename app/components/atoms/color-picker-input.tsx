import { ColorPicker, parseColor } from "@chakra-ui/react";
import { converter } from "culori";
// カラー状態をグローバルに管理するためのatomを定義
// 初期値は空文字列に設定

type ColorPickerInputProps = {
    color: string;
    onChangeColor: (color: string) => void;
};

export function ColorPickerInput({ color, onChangeColor }: ColorPickerInputProps) {
    return (
        <ColorPicker.Root
            defaultValue={parseColor(color)}
            onValueChange={(e) => {
                onChangeColor(e.valueAsString);
            }}
        >
            <ColorPicker.Label color="black" htmlFor="color-picker-input">Color</ColorPicker.Label>
            <ColorPicker.Control>
                <ColorPicker.Input />
                <ColorPicker.Trigger />
            </ColorPicker.Control>
            <ColorPicker.Positioner>
                <ColorPicker.Content>
                    <ColorPicker.Area />
                    <ColorPicker.Sliders />
                </ColorPicker.Content>
            </ColorPicker.Positioner>
        </ColorPicker.Root>
    );
}
