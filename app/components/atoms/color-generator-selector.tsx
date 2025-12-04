"use client";

import { Select, createListCollection } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { css } from "styled-system/css";
import { modeAtom } from "../../atoms/colorPaletteAtoms";
import type { LightnessMode } from "../../types/type";

const items = [
    { value: "constant" as LightnessMode, label: "Constant" },
    { value: "linear" as LightnessMode, label: "Linear" },
    { value: "sigmoid" as LightnessMode, label: "Sigmoid" },
    { value: "chakra" as LightnessMode, label: "Chakra" },
    { value: "chakra-unlinear" as LightnessMode, label: "Chakra Unlinear" },
    
];

export const ColorGeneratorSelector = () => {
    const [mode, setMode] = useAtom(modeAtom);
    // createListCollectionを使用してitemsをラップ
    const collection = createListCollection({ items });

    return (
        <Select.Root
            className={css({ width: "15rem" })}
            collection={collection}
            value={[mode]}
            onValueChange={(e) => setMode(e.value[0] as LightnessMode)}
        >
            <Select.HiddenSelect />
            <Select.Label color="black">Lightness Mode</Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
                <Select.Content>
                    {items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                            <Select.ItemText>{item.label}</Select.ItemText>
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
};
