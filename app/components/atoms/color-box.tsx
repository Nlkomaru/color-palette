import { css } from "styled-system/css";

type ColorBoxProps = {
    color: string;
};

export function ColorBox({ color }: ColorBoxProps) {
    return (
        <div
            className={css({
                width: "3rem",
                aspectRatio: "1/1",
                borderRadius: "0.5rem",
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
