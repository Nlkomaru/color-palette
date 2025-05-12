import { HoverCard } from "@chakra-ui/react";
import type { ColorInfo } from "../../types/type";
import { clampChroma, parse } from "culori";
import { css } from "styled-system/css";

type ColorBoxProps = {
    color: ColorInfo;
};

const oklch = parse("oklch");

export function ColorBox({ color }: ColorBoxProps) {
    const parsedColor = parse(color.color);
    if (!parsedColor) {
        return null;
    }
    const clampedColor = clampChroma(parsedColor, "oklch");
    return (
        <HoverCard.Root>
            <HoverCard.Trigger>
                <div
                    className={css({
                        width: "3.5rem",
                        aspectRatio: "1/1",
                        borderRadius: "var(--chakra-radii-l2)",
                        border: "0.1px solid",
                        borderColor: "var(--chakra-colors-gray-muted)",
                        backgroundColor: "var(--color)",
                    })}
                    style={
                        {
                            "--color": color.color,
                        } as React.CSSProperties
                    }
                />
            </HoverCard.Trigger>
            <HoverCard.Positioner>
                <HoverCard.Content>
                    <HoverCard.Arrow>
                        <HoverCard.ArrowTip />
                    </HoverCard.Arrow>
                    <p>color: {color.color}</p>
                    <p>fallback: {color.fallback}</p>
                    <p>lightness: {color.lightness}</p>
                </HoverCard.Content>
            </HoverCard.Positioner>
        </HoverCard.Root>
    );
}
