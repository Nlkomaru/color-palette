import { Button, Icon } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import { css } from "../../../styled-system/css";
import { HStack } from "../../../styled-system/jsx";
import { useColorPaletteState } from "../../hooks/useColorPaletteState";
import { downloadColorTokensZip } from "../../utils/download-zip";
import { ColorGeneratorSelector } from "../atoms/color-generator-selector";
import { ColorLengthSlider } from "../atoms/color-length-slider";
import { LightnessGainSlider } from "../atoms/lightness-gain-slider";

export const Setting = () => {
    const { colors, length, mode, gain } = useColorPaletteState();

    const handleDownload = () => {
        // Map colors to the input shape expected by the util
        downloadColorTokensZip(
            colors.map(({ colorValue, colorId }) => ({ colorValue, colorId })),
            length,
            mode,
            gain,
        );
    };

    return (
        <HStack w="100%" gap="4" justify="space-between" className={css({ padding: "0.5rem 0 2rem 0" })}>
            <HStack gap="4">
                <ColorGeneratorSelector />
                {mode === "sigmoid" && <LightnessGainSlider />}
            </HStack>
            <HStack gap="4">
                <ColorLengthSlider />
                <Button variant="outline" size="sm" colorScheme="gray" onClick={handleDownload}>
                    <Icon as={FaDownload} />
                </Button>
            </HStack>
        </HStack>
    );
};
