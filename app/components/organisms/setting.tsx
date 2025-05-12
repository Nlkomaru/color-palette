import { useColorPaletteState } from "app/hooks/useColorPaletteState";
import type { LightnessMode } from "../../types/type";
import { css } from "../../../styled-system/css";
import { HStack } from "../../../styled-system/jsx";
import { ColorGeneratorSelector } from "../atoms/color-generator-selector";
import { ColorLengthSlider } from "../atoms/color-length-slider";
import { LightnessGainSlider } from "../atoms/lightness-gain-slider";

export const Setting = () => {
    const { mode, setMode } = useColorPaletteState();
    const { length, setLength } = useColorPaletteState();
    const { gain, setGain } = useColorPaletteState();
    return (
        <HStack w="100%" gap="4" justify="space-between" className={css({ padding: "0.5rem 0 2rem 0" })}>
            <HStack gap="4">
                <ColorGeneratorSelector
                    value={mode}
                    onChange={(value) => setMode(value as LightnessMode)}
                    items={[
                        { value: "constant", label: "Constant" },
                        { value: "linear", label: "Linear" },
                        { value: "sigmoid", label: "Sigmoid" },
                    ]}
                />
                {mode === "sigmoid" && <LightnessGainSlider gain={gain} onChangeGain={setGain} />}
            </HStack>
            <ColorLengthSlider length={length} onChangeLength={setLength} />
        </HStack>
    );
};
