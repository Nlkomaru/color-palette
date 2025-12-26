"use client";
import { HStack, Slider } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { css } from "../../../styled-system/css";
import { minAtom } from "../../atoms/colorPaletteAtoms";

export const LightnessMinSlider = () => {
    const [min, setMin] = useAtom(minAtom);
    return (
        <Slider.Root
            className={css({ w: "10rem" })}
            size="md"
            value={[min]}
            onValueChange={(e) => setMin(e.value[0])}
            max={1}
            step={0.01}
            min={0}
        >
            <HStack justify="space-between">
                <Slider.Label>Min</Slider.Label>
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
