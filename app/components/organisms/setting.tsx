import { useAtom } from "jotai";
import { css } from "../../../styled-system/css";
import { HStack } from "../../../styled-system/jsx";
import { modeAtom } from "../../atoms/colorPaletteAtoms";
import { ColorGeneratorSelector } from "../atoms/color-generator-selector";
import { ColorLengthSlider } from "../atoms/color-length-slider";
import { LightnessGainSlider } from "../atoms/lightness-gain-slider";

export const Setting = () => {
    const [mode] = useAtom(modeAtom);
    return (
        <HStack w="100%" gap="4" justify="space-between" className={css({ padding: "0.5rem 0 2rem 0" })}>
            <HStack gap="4">
                <ColorGeneratorSelector />
                {mode === "sigmoid" && <LightnessGainSlider />}
            </HStack>
            <ColorLengthSlider />
        </HStack>
    );
};
