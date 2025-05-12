"use client";

import { Select, createListCollection } from "@chakra-ui/react";
import type { LightnessMode } from "../../types/type";
import { css } from "styled-system/css";

type ColorGeneratorSelectorProps = {
    value: LightnessMode;
    onChange: (value: LightnessMode) => void;
    items: { value: LightnessMode; label: string }[];
};

export const ColorGeneratorSelector = ({ value, onChange, items }: ColorGeneratorSelectorProps) => {
    // createListCollectionを使用してitemsをラップ
    const collection = createListCollection({ items });

    return (
        <Select.Root
            className={css({ width: "15rem" })}
            collection={collection}
            value={[value]}
            onValueChange={(e) => onChange(e.value[0] as LightnessMode)}
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
