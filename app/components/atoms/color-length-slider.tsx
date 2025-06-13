"use client";
import { HStack, Slider } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { css } from "../../../styled-system/css";
import { lengthAtom } from "../../atoms/colorPaletteAtoms";

export const ColorLengthSlider = () => {
    const [length, setLength] = useAtom(lengthAtom);
    return (
        <Slider.Root
            className={css({ w: "10rem" })}
            size="md"
            defaultValue={[length]}
            onValueChange={(e) => setLength(e.value[0])}
            max={20}
        >
            <HStack justify="space-between">
                <Slider.Label>Length</Slider.Label>
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
