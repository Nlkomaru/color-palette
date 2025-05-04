import { useColorPaletteState } from "app/hooks/useColorPaletteState";
import type { LightnessMode } from "app/type/type";
import { css } from "../../../styled-system/css";
import { HStack } from "../../../styled-system/jsx";
import { ColorGeneratorSelector } from "../atoms/color-generator-selector";
import { ColorLengthSlider } from "../atoms/color-length-slider";

export const Setting = () => {
    const { mode, setMode } = useColorPaletteState();
    const { length, setLength } = useColorPaletteState();
    return (
        <HStack w="100%" gap="4" justify="space-between" className={css({ padding: "0.5rem 0 2rem 0" })}>
            <ColorGeneratorSelector
                value={mode}
                onChange={(value) => setMode(value as LightnessMode)}
                items={[
                    { value: "constant", label: "Constant" },
                    { value: "linear", label: "Linear" },
                    { value: "sigmoid", label: "Sigmoid" },
                ]}
            />
            <ColorLengthSlider length={length} onChangeLength={setLength} />
        </HStack>
    );
};
