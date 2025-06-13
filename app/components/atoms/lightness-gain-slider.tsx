"use client";
import { HStack, Slider } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { css } from "../../../styled-system/css";
import { gainAtom } from "../../atoms/colorPaletteAtoms";

export const LightnessGainSlider = () => {
    const [gain, setGain] = useAtom(gainAtom);
    return (
        <Slider.Root
            className={css({ w: "10rem" })}
            size="md"
            defaultValue={[gain]}
            onValueChange={(e) => setGain(e.value[0])}
            max={10}
            step={0.05}
            min={0}
        >
            <HStack justify="space-between">
                <Slider.Label>Gain</Slider.Label>
                <Slider.ValueText />
            </HStack>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
            </Slider.Control>
        </Slider.Root>
    );
};
