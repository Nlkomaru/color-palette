import { ColorPicker, parseColor } from "@chakra-ui/react";
import { atom, useAtom } from "jotai";

// カラー状態をグローバルに管理するためのatomを定義
const colorAtom = atom("#069606");

export function ColorPickerInput() {
    // jotaiのuseAtomフックを使用してカラー状態を管理
    const [color, setColor] = useAtom(colorAtom);

    return (
        <ColorPicker.Root defaultValue={parseColor(color)}>
            <ColorPicker.HiddenInput />
            <ColorPicker.Label />
            <ColorPicker.Control>
                <ColorPicker.Input value={color} onChange={(e) => setColor(e.target.value)} />
                <ColorPicker.Trigger />
            </ColorPicker.Control>
            <ColorPicker.Positioner>
                <ColorPicker.Content>
                    <ColorPicker.Area />
                    {/* <ColorPicker.EyeDropper /> */}
                    <ColorPicker.Sliders />
                    {/* <ColorPicker.SwatchGroup></ColorPicker.SwatchGroup> */}
                </ColorPicker.Content>
            </ColorPicker.Positioner>
        </ColorPicker.Root>
    );
}
