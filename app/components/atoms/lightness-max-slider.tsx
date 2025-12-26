"use client";
import { HStack, Slider } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { css } from "../../../styled-system/css";
import { maxAtom } from "../../atoms/colorPaletteAtoms";

export const LightnessMaxSlider = () => {
    const [max, setMax] = useAtom(maxAtom);
    return (
        <Slider.Root
            className={css({ w: "10rem" })}
            size="md"
            value={[max]}
            onValueChange={(e) => setMax(e.value[0])}
            max={1}
            step={0.01}
            min={0}
        >
            <HStack justify="space-between">
                <Slider.Label>Max</Slider.Label>
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
