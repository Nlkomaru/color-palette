import { css } from "styled-system/css";

type ColorBoxProps = {
    color: string;
};

export function ColorBox({ color }: ColorBoxProps) {
    return (
        <div
            className={css({
                width: "3.5rem",
                aspectRatio: "1/1",
                borderRadius: "var(--chakra-radii-l2)",
                border: "0.1px solid",
                borderColor: "var(--chakra-colors-border)",
                backgroundColor: "var(--color)",
            })}
            style={
                {
                    "--color": color,
                } as React.CSSProperties
            }
        />
    );
}
