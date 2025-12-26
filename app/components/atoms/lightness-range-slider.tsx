"use client";
import { HStack, Slider } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { css } from "../../../styled-system/css";
import { maxAtom, minAtom } from "../../atoms/colorPaletteAtoms";

export const LightnessRangeSlider = () => {
    const [max, setMax] = useAtom(maxAtom);
    const [min, setMin] = useAtom(minAtom);

    // 0-1の値を0-100の整数に変換して扱う
    const rangeValue = [min * 100, max * 100];

    return (
        <Slider.Root
            className={css({ w: "10rem" })}
            size="md"
            value={rangeValue}
            onValueChange={(e) => {
                // 0-100の整数を0-1の値に戻す
                setMin(e.value[0] / 100);
                setMax(e.value[1] / 100);
            }}
            max={100}
            step={1}
            min={0}
            minStepsBetweenThumbs={5}
        >
            <HStack justify="space-between">
                <Slider.Label>Lightness Range</Slider.Label>
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
