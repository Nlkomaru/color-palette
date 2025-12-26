"use client";
import { HStack, Slider } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { css } from "../../../styled-system/css";
import { chromaAtom } from "../../atoms/colorPaletteAtoms";

export const ChromaSlider = () => {
    const [chroma, setChroma] = useAtom(chromaAtom);

    // 0-0.37の値を0-370の整数に変換して扱う
    const sliderValue = [chroma * 1000];

    return (
        <Slider.Root
            className={css({ w: "10rem" })}
            size="md"
            value={sliderValue}
            onValueChange={(e) => setChroma(e.value[0] / 1000)}
            max={370} // 0.37 * 1000
            step={1} // 0.001単位
            min={0}
        >
            <HStack justify="space-between">
                <Slider.Label>Chroma</Slider.Label>
                <Slider.ValueText>{chroma.toFixed(3)}</Slider.ValueText>
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
