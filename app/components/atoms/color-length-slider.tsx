"use client ";
import { HStack, Slider } from "@chakra-ui/react";
import { css } from "../../../styled-system/css";

type ColorLengthSliderProps = {
    length: number;
    onChangeLength: (length: number) => void;
};

export const ColorLengthSlider = ({ length, onChangeLength }: ColorLengthSliderProps) => {
    return (
        <Slider.Root
            className={css({ w: "12rem" })}
            size="md"
            defaultValue={[length]}
            onValueChange={(e) => onChangeLength(e.value[0])}
            max={12}
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
