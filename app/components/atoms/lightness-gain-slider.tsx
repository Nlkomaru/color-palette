"use client";
import { HStack, Slider } from "@chakra-ui/react";
import { css } from "../../../styled-system/css";

type LightnessGainSliderProps = {
    gain: number;
    onChangeGain: (gain: number) => void;
};

export const LightnessGainSlider = ({ gain, onChangeGain }: LightnessGainSliderProps) => {
    return (
        <Slider.Root
            className={css({ w: "10rem" })}
            size="md"
            defaultValue={[gain]}
            onValueChange={(e) => onChangeGain(e.value[0])}
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
